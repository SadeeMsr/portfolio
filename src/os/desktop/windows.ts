import { APPS, type AppId } from "../apps";

export type Rect = { x: number; y: number; w: number; h: number };
export type Snap = "left" | "right" | null;

export type Win = {
  id: AppId;
  rect: Rect;
  z: number;
  minimized: boolean;
  maximized: boolean;
  snap: Snap;
};

export type WMState = { windows: Win[]; z: number; area: { w: number; h: number } };

export type WMAction =
  | { type: "open"; id: AppId }
  | { type: "close"; id: AppId }
  | { type: "focus"; id: AppId }
  | { type: "minimize"; id: AppId }
  | { type: "toggleMax"; id: AppId }
  | { type: "move"; id: AppId; rect: Rect }
  | { type: "snap"; id: AppId; snap: "left" | "right" | "max" }
  | { type: "area"; w: number; h: number }
  | { type: "closeAll" };

export const MIN_W = 340;
export const MIN_H = 240;

function clampRect(r: Rect, area: WMState["area"]): Rect {
  const w = Math.max(MIN_W, Math.min(r.w, area.w));
  const h = Math.max(MIN_H, Math.min(r.h, area.h));
  return {
    w,
    h,
    x: Math.max(-w + 120, Math.min(r.x, area.w - 120)),
    y: Math.max(0, Math.min(r.y, area.h - 40)),
  };
}

export function topWindow(s: WMState): Win | undefined {
  return s.windows.filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0];
}

export function wmReducer(s: WMState, a: WMAction): WMState {
  const upd = (id: AppId, fn: (w: Win) => Win) => s.windows.map((w) => (w.id === id ? fn(w) : w));
  switch (a.type) {
    case "open": {
      const z = s.z + 1;
      if (s.windows.some((w) => w.id === a.id)) {
        return { ...s, z, windows: upd(a.id, (w) => ({ ...w, minimized: false, z })) };
      }
      const { w, h } = APPS[a.id].size;
      const n = s.windows.length;
      const rect = clampRect(
        {
          w: Math.min(w, s.area.w - 40),
          h: Math.min(h, s.area.h - 40),
          x: Math.round((s.area.w - Math.min(w, s.area.w - 40)) / 2) + ((n % 6) - 2) * 28,
          y: Math.round((s.area.h - Math.min(h, s.area.h - 40)) / 2.4) + ((n % 6) - 2) * 24,
        },
        s.area,
      );
      return { ...s, z, windows: [...s.windows, { id: a.id, rect, z, minimized: false, maximized: false, snap: null }] };
    }
    case "close":
      return { ...s, windows: s.windows.filter((w) => w.id !== a.id) };
    case "closeAll":
      return { ...s, windows: [] };
    case "focus": {
      const target = s.windows.find((w) => w.id === a.id);
      if (!target || target.z === s.z) return s;
      const z = s.z + 1;
      return { ...s, z, windows: upd(a.id, (w) => ({ ...w, z, minimized: false })) };
    }
    case "minimize":
      return { ...s, windows: upd(a.id, (w) => ({ ...w, minimized: true })) };
    case "toggleMax":
      return { ...s, z: s.z + 1, windows: upd(a.id, (w) => ({ ...w, maximized: !(w.maximized || w.snap), snap: null, z: s.z + 1 })) };
    case "snap":
      return {
        ...s,
        windows: upd(a.id, (w) =>
          a.snap === "max" ? { ...w, maximized: true, snap: null } : { ...w, maximized: false, snap: a.snap },
        ),
      };
    case "move":
      return { ...s, windows: upd(a.id, (w) => ({ ...w, rect: clampRect(a.rect, s.area), maximized: false, snap: null })) };
    case "area":
      return {
        ...s,
        area: { w: a.w, h: a.h },
        windows: s.windows.map((w) => ({ ...w, rect: clampRect(w.rect, { w: a.w, h: a.h }) })),
      };
  }
}
