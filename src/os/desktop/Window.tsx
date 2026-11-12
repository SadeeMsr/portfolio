"use client";

import { useRef, type Dispatch, type PointerEvent as RPointerEvent, type RefObject } from "react";
import { APPS } from "../apps";
import { IconClose, IconMax, IconMin, IconRestore } from "../icons";
import { MIN_H, MIN_W, type Rect, type WMAction, type Win } from "./windows";

type Props = {
  win: Win;
  focused: boolean;
  area: { w: number; h: number };
  areaRef: RefObject<HTMLDivElement | null>;
  dispatch: Dispatch<WMAction>;
  onSnapPreview: (s: "left" | "right" | "max" | null) => void;
};

export function effectiveRect(win: Win, area: { w: number; h: number }): Rect {
  if (win.maximized) return { x: 0, y: 0, w: area.w, h: area.h };
  if (win.snap === "left") return { x: 0, y: 0, w: Math.round(area.w / 2), h: area.h };
  if (win.snap === "right") return { x: Math.round(area.w / 2), y: 0, w: area.w - Math.round(area.w / 2), h: area.h };
  return win.rect;
}

export function Window({ win, focused, area, areaRef, dispatch, onSnapPreview }: Props) {
  const app = APPS[win.id];
  const el = useRef<HTMLDivElement>(null);
  const tiled = win.maximized || !!win.snap;
  const rect = effectiveRect(win, area);

  const startDrag = (e: RPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest("button")) return;
    dispatch({ type: "focus", id: win.id });
    const node = el.current;
    const areaEl = areaRef.current;
    if (!node || !areaEl) return;
    const areaBox = areaEl.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    let base = { ...rect };
    let restored = !tiled;
    let moved = false;
    let snapZone: "left" | "right" | "max" | null = null;
    let current = base;

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (!moved && Math.abs(dx) + Math.abs(dy) < 4) return;
      moved = true;
      if (!restored) {
        // un-tile: restore saved size, keep the grab point proportional
        const ratio = (startX - areaBox.left - rect.x) / rect.w;
        base = { ...win.rect, x: startX - areaBox.left - win.rect.w * ratio, y: 0 };
        restored = true;
        node.style.width = `${base.w}px`;
        node.style.height = `${base.h}px`;
      }
      current = { ...base, x: base.x + dx, y: Math.max(0, base.y + dy) };
      node.style.left = `${current.x}px`;
      node.style.top = `${current.y}px`;
      const px = ev.clientX - areaBox.left;
      const py = ev.clientY - areaBox.top;
      const zone = py < 6 ? "max" : px < 8 ? "left" : px > areaBox.width - 8 ? "right" : null;
      if (zone !== snapZone) {
        snapZone = zone;
        onSnapPreview(zone);
      }
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      onSnapPreview(null);
      if (!moved) return;
      if (snapZone) dispatch({ type: "snap", id: win.id, snap: snapZone });
      else dispatch({ type: "move", id: win.id, rect: current });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const startResize = (e: RPointerEvent, edge: "r" | "b" | "rb" | "l" | "lb") => {
    e.stopPropagation();
    if (tiled) return;
    dispatch({ type: "focus", id: win.id });
    const node = el.current;
    if (!node) return;
    const sx = e.clientX;
    const sy = e.clientY;
    const r0 = { ...win.rect };
    let cur = r0;
    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - sx;
      const dy = ev.clientY - sy;
      cur = { ...r0 };
      if (edge.includes("r")) cur.w = Math.max(MIN_W, r0.w + dx);
      if (edge.includes("l")) {
        cur.w = Math.max(MIN_W, r0.w - dx);
        cur.x = r0.x + (r0.w - cur.w);
      }
      if (edge.includes("b")) cur.h = Math.max(MIN_H, r0.h + dy);
      Object.assign(node.style, { left: `${cur.x}px`, width: `${cur.w}px`, height: `${cur.h}px` });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      dispatch({ type: "move", id: win.id, rect: cur });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const { Component } = app;
  const dark = app.darkChrome;

  return (
    <div
      ref={el}
      role="dialog"
      aria-label={app.title}
      onPointerDownCapture={() => !focused && dispatch({ type: "focus", id: win.id })}
      className={`anim-window absolute flex flex-col overflow-hidden bg-surface text-fg shadow-window ${
        tiled ? "rounded-none" : "rounded-xl"
      } ${win.minimized ? "pointer-events-none invisible scale-90 opacity-0" : ""} transition-[opacity,scale] duration-150`}
      style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h, zIndex: win.z }}
    >
      <div
        onPointerDown={startDrag}
        onDoubleClick={(e) => !(e.target as HTMLElement).closest("button") && dispatch({ type: "toggleMax", id: win.id })}
        className={`relative flex h-11 shrink-0 cursor-default items-center px-2 select-none ${
          dark ? "bg-[#2b2b2b] text-white" : "bg-headerbar"
        } ${focused ? "" : "opacity-[0.92]"} border-b ${dark ? "border-black/40" : "border-line"}`}
      >
        <div className="pointer-events-none absolute inset-x-28 truncate text-center text-sm font-semibold">{app.title}</div>
        <div className="ml-auto flex items-center gap-2">
          {[
            { label: "Minimize", icon: <IconMin className="h-3.5 w-3.5" />, act: () => dispatch({ type: "minimize", id: win.id }) },
            {
              label: tiled ? "Restore" : "Maximize",
              icon: tiled ? <IconRestore className="h-3.5 w-3.5" /> : <IconMax className="h-3.5 w-3.5" />,
              act: () => dispatch({ type: "toggleMax", id: win.id }),
            },
            { label: "Close", icon: <IconClose className="h-3.5 w-3.5" />, act: () => dispatch({ type: "close", id: win.id }), close: true },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              aria-label={b.label}
              title={b.label}
              onClick={b.act}
              className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                b.close
                  ? focused
                    ? "bg-accent text-accent-fg hover:brightness-110"
                    : dark
                      ? "bg-white/10 hover:bg-accent"
                      : "bg-fg/10 hover:bg-accent hover:text-accent-fg"
                  : dark
                    ? "bg-white/10 hover:bg-white/20"
                    : "bg-fg/10 hover:bg-fg/20"
              }`}
            >
              {b.icon}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-0 flex-1">
        <Component />
      </div>
      {!tiled && (
        <>
          <div onPointerDown={(e) => startResize(e, "r")} className="absolute top-0 right-0 h-full w-1.5 cursor-ew-resize" />
          <div onPointerDown={(e) => startResize(e, "l")} className="absolute top-0 left-0 h-full w-1.5 cursor-ew-resize" />
          <div onPointerDown={(e) => startResize(e, "b")} className="absolute bottom-0 left-0 h-1.5 w-full cursor-ns-resize" />
          <div onPointerDown={(e) => startResize(e, "rb")} className="absolute right-0 bottom-0 h-4 w-4 cursor-nwse-resize" />
          <div onPointerDown={(e) => startResize(e, "lb")} className="absolute bottom-0 left-0 h-4 w-4 cursor-nesw-resize" />
        </>
      )}
    </div>
  );
}
