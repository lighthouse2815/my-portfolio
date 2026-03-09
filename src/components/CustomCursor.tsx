import { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(false);
  const pointer = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const setMatch = () => setEnabled(mediaQuery.matches);
    setMatch();
    mediaQuery.addEventListener("change", setMatch);
    return () => mediaQuery.removeEventListener("change", setMatch);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const move = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, input, textarea");
      const nextState = Boolean(interactive);
      if (nextState !== activeRef.current) {
        activeRef.current = nextState;
      }
    };

    const tick = () => {
      ring.current.x += (pointer.current.x - ring.current.x) * 0.18;
      ring.current.y += (pointer.current.y - ring.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) scale(${activeRef.current ? 1.25 : 1})`;
      }

      raf.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", onPointerOver);
    raf.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", onPointerOver);
      window.cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};
