import { useMemo } from "react";

// A layered, unique "motion flow" background: soft drifting gradient blobs,
// a subtle drifting grid, and gently rising particles. Pure CSS animation
// (no heavy canvas work) so it stays smooth across the whole app.
export default function AnimatedBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 26 }).map((_, i) => {
      const size = 2 + Math.random() * 4;
      return {
        id: i,
        left: Math.random() * 100,
        size,
        duration: 14 + Math.random() * 18,
        delay: Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.5,
      };
    });
  }, []);

  return (
    <>
      <div className="flow-bg" aria-hidden="true" />
      <div className="flow-grid" aria-hidden="true" />
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              left: `${p.left}%`,
              bottom: "-10px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>
    </>
  );
}
