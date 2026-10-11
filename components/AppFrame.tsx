"use client";

import { useEffect, useState } from "react";

// Apps hosted under /public are same-origin, so they can post their document height
// here. The frame then grows with the app and the page keeps a single scrollbar
// instead of one inside the frame and one outside. Until a height arrives — or if the
// app never sends one — the frame falls back to a viewport-sized box.
const MIN = 560;
const MAX = 20000;

export default function AppFrame({ src, title }: { src: string; title: string }) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      const data = event.data as { type?: string; height?: number } | null;
      if (data?.type !== "app:height" || typeof data.height !== "number") return;
      setHeight(Math.min(Math.max(Math.round(data.height), MIN), MAX));
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      src={src}
      title={title}
      scrolling={height ? "no" : undefined}
      // content-box: the reported height is the app's document height, and the frame
      // carries a 1px border that would otherwise eat into it and bring the scrollbar back
      style={height ? { height: `${height}px`, boxSizing: "content-box" } : undefined}
      className={
        "mt-6 w-full rounded-lg border border-border bg-surface" +
        (height ? "" : " h-[calc(100vh-200px)] min-h-[560px]")
      }
      allow="clipboard-write; fullscreen"
    />
  );
}
