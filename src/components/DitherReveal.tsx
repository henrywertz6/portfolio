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
const DURATION = 450;
const FILL = "#f5f0e8";

interface Props {
  isExiting: boolean;
  onExitComplete: () => void;
}

export default function DitherReveal({ isExiting, onExitComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const thresholdRef = useRef(0);
  const ox = useRef(Math.floor(Math.random() * 8));
  const oy = useRef(Math.floor(Math.random() * 8));

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = Math.ceil(window.screen.width / BLOCK);
    canvas.height = Math.ceil(window.screen.height / BLOCK);

    const render = (t: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = FILL;
      for (let bx = 0; bx < w; bx++) {
        for (let by = 0; by < h; by++) {
          if (BAYER_8[(by + oy.current) % 8][(bx + ox.current) % 8] / 64 < t) {
            ctx.fillRect(bx, by, 1, 1);
          }
        }
      }
    };

    let startTime: number | null = null;
    const enter = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / DURATION, 1);
      thresholdRef.current = progress;
      render(progress);
      if (progress < 1) rafRef.current = requestAnimationFrame(enter);
    };
    rafRef.current = requestAnimationFrame(enter);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isExiting) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    cancelAnimationFrame(rafRef.current);

    const startThreshold = thresholdRef.current;
    let startTime: number | null = null;

    const exit = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / DURATION, 1);
      const t = startThreshold * (1 - progress);
      thresholdRef.current = t;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = FILL;
      for (let bx = 0; bx < w; bx++) {
        for (let by = 0; by < h; by++) {
          if (BAYER_8[(by + oy.current) % 8][(bx + ox.current) % 8] / 64 < t) {
            ctx.fillRect(bx, by, 1, 1);
          }
        }
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(exit);
      } else {
        onExitComplete();
      }
    };

    rafRef.current = requestAnimationFrame(exit);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isExiting]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[2] w-full h-full"
      style={{ imageRendering: "pixelated", willChange: "transform" }}
    />
  );
}
