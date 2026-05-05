import { useEffect, useRef } from "react";

const BAYER_8 = [
  [ 0, 32,  8, 40,  2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44,  4, 36, 14, 46,  6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [ 3, 35, 11, 43,  1, 33,  9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47,  7, 39, 13, 45,  5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

const BLOCK = 3;

interface Props {
  visible: boolean;
}

export default function DitherBackground({ visible }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeOffset = useRef(Math.random() * 30000);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Cap at 1920×1080 equivalent — 4K Windows screens at 100% scaling give
    // screen.width=3840, which is 6× more canvas pixels and kills frame rate.
    // CSS stretches the buffer to fill the viewport, so larger pixels are fine.
    canvas.width = Math.ceil(Math.min(window.screen.width, 1920) / BLOCK);
    canvas.height = Math.ceil(Math.min(window.screen.height, 1080) / BLOCK);

    ctx.fillStyle = "rgba(236, 223, 204, 0.55)";

    let frame = 0;
    const draw = (now: number) => {
      rafRef.current = requestAnimationFrame(draw);
      // only redraw every 2nd frame — animation is slow, saves perf
      if (frame++ % 3 !== 0) return;

      const t = (now + timeOffset.current) * 0.00035;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      for (let bx = 0; bx < w; bx++) {
        for (let by = 0; by < h; by++) {
          const nx = bx / w;
          const ny = by / h;

          // overlapping sine blobs — large scale for lava lamp feel
          const blob1 = Math.sin(nx * 4 + t * 0.9) * Math.sin(ny * 3 + t * 0.7);
          const blob2 = Math.sin(nx * 2.5 - t * 0.6 + 1.5) * Math.sin(ny * 3.5 - t * 0.5 + 1.0);
          const radial = Math.sin(
            Math.sqrt(
              Math.pow(nx - 0.5 - Math.sin(t * 0.4) * 0.25, 2) +
              Math.pow(ny - 0.5 + Math.cos(t * 0.35) * 0.2, 2)
            ) * 9 - t * 0.8
          );

          const v = (blob1 * 0.4 + blob2 * 0.35 + radial * 0.25) * 0.5 + 0.5; // 0..1

          // squash toward dark so blobs are sparse and dramatic
          const biased = Math.pow(Math.max(0, v - 0.42) / 0.58, 3.0);

          const threshold = BAYER_8[by % 8][bx % 8] / 64;
          if (biased > threshold) {
            ctx.fillRect(bx, by, 1, 1);
          }
        }
      }
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none w-full h-full"
      style={{ imageRendering: "pixelated", opacity: visible ? 0.4 : 0, transition: "opacity 0.6s ease", willChange: "transform" }}
    />
  );
}
