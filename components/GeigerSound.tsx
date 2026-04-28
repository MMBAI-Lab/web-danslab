"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Geiger-counter click button. Uses Web Audio to synthesize the typical
 * "crackle" — short noise bursts at Poisson-distributed intervals around a
 * configurable mean rate. Click to start/stop.
 *
 * No external audio asset, no licensing, no extra bytes in the bundle.
 */
export default function GeigerSound({
  className = "",
  meanIntervalMs = 380,
  durationMs = 6000,
  label = "Listen",
  stopLabel = "Stop",
}: {
  className?: string;
  meanIntervalMs?: number;
  durationMs?: number;
  label?: string;
  stopLabel?: string;
}) {
  const ctxRef = useRef<AudioContext | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);
  const stopAtRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {});
        ctxRef.current = null;
      }
    };
  }, []);

  function ensureContext() {
    if (ctxRef.current && ctxRef.current.state !== "closed") return ctxRef.current;
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctx();
    ctxRef.current = ctx;
    // pre-build a 0.25s white-noise buffer; clicks slice tiny windows of it.
    const samples = Math.floor(ctx.sampleRate * 0.25);
    const buf = ctx.createBuffer(1, samples, ctx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < samples; i++) ch[i] = Math.random() * 2 - 1;
    noiseBufferRef.current = buf;
    return ctx;
  }

  function tick() {
    const ctx = ctxRef.current;
    const buf = noiseBufferRef.current;
    if (!ctx || !buf) return;
    if (ctx.currentTime * 1000 >= stopAtRef.current) {
      stopInternal();
      return;
    }

    // one Geiger click: ~3–10 ms burst of band-pass-filtered white noise,
    // with a quick attack-decay envelope so it sounds crisp.
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2200 + Math.random() * 1400; // 2.2–3.6 kHz
    bp.Q.value = 4 + Math.random() * 3;

    const gain = ctx.createGain();
    const now = ctx.currentTime;
    const dur = 0.004 + Math.random() * 0.006; // 4–10 ms
    const peak = 0.55 + Math.random() * 0.3; // some clicks are louder
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(peak, now + 0.0008);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + dur);

    src.connect(bp).connect(gain).connect(ctx.destination);
    src.start(now);
    src.stop(now + dur + 0.01);

    // schedule next click — exponential distribution → Poisson process
    const next = -Math.log(1 - Math.random()) * meanIntervalMs;
    timerRef.current = window.setTimeout(tick, Math.max(20, next));
  }

  function play() {
    const ctx = ensureContext();
    if (ctx.state === "suspended") void ctx.resume();
    stopAtRef.current = ctx.currentTime * 1000 + durationMs;
    setPlaying(true);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    tick();
  }

  function stopInternal() {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setPlaying(false);
  }

  function toggle() {
    if (playing) stopInternal();
    else play();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition hover:border-accent hover:text-accent ${className}`}
      aria-pressed={playing}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-2 w-2 rounded-full ${
          playing ? "bg-accent animate-pulse" : "bg-subtle"
        }`}
      />
      {playing ? stopLabel : label}
    </button>
  );
}
