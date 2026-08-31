type WaveProps = {
  fill: string;
  flip?: boolean;
  overlay?: boolean;
  variant?: "waves" | "paint" | "ripple";
};

const PATHS = {
  waves:
    "M0,72 C160,120 320,24 480,72 C640,120 800,24 960,72 C1120,120 1280,32 1440,80 L1440,120 L0,120 Z",
  paint:
    "M0,58 C70,18 150,98 260,46 C380,-6 470,92 620,40 C770,-8 870,88 1020,52 C1160,22 1280,86 1440,36 L1440,120 L0,120 Z",
  ripple:
    "M0,86 C90,46 150,46 240,86 C330,126 390,126 480,86 C570,46 630,46 720,86 C810,126 870,126 960,86 C1050,46 1110,46 1200,86 C1290,126 1350,126 1440,86 L1440,120 L0,120 Z",
};

export default function Wave({
  fill,
  flip = false,
  overlay = false,
  variant = "waves",
}: WaveProps) {
  return (
    <div
      className={`wave ${overlay ? "wave-overlay" : ""} ${flip ? "wave-flip" : ""}`}
      aria-hidden
    >
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d={PATHS[variant]} fill={fill} />
      </svg>
    </div>
  );
}
