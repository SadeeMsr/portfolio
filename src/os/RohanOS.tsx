"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Boot } from "./desktop/Boot";
import { Desktop } from "./desktop/Desktop";
import { useMediaQuery } from "./hooks";
import { RohanLogo } from "./icons";
import { Phone } from "./mobile/Phone";
import { SettingsProvider } from "./settings";

const BOOTED_KEY = "rohanos.booted";

function Splash() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#140611]">
      <RohanLogo size={72} />
    </div>
  );
}

function DesktopRoot() {
  const router = useRouter();
  const [booting, setBooting] = useState<boolean | null>(null);
  const [firstBoot, setFirstBoot] = useState(false);
  const [gen, setGen] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(BOOTED_KEY) === "1";
    } catch {
      /* private mode: just boot */
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- decide boot once on mount
    setFirstBoot(!seen);
    setBooting(!seen && !reduced);
  }, []);

  useEffect(() => {
    if (booting !== false) return;
    try {
      localStorage.setItem(BOOTED_KEY, "1");
    } catch {
      /* ignore */
    }
  }, [booting]);

  if (booting === null) return <Splash />;
  if (booting)
    return (
      <Boot
        onDone={() => setBooting(false)}
        onRecruiter={() => router.push("/resume")}
      />
    );
  return (
    <Desktop
      key={gen}
      firstBoot={firstBoot}
      onRestart={() => {
        setFirstBoot(false);
        setGen((g) => g + 1);
        setBooting(true);
      }}
    />
  );
}

export default function RohanOS() {
  const mobile = useMediaQuery("(max-width: 1023px), (pointer: coarse) and (max-height: 700px)");
  return (
    <SettingsProvider>
      {mobile === null ? <Splash /> : mobile ? <Phone /> : <DesktopRoot />}
    </SettingsProvider>
  );
}
