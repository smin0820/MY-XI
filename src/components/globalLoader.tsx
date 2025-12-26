import logo from "@/assets/logo-transparent.png";

export default function GlobalLoader() {
  return (
    <div
      className="bg-muted flex h-screen w-screen flex-col items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3" aria-hidden="true">
        <img
          src={logo}
          className="h-12 w-12 rounded-full object-cover"
          style={{
            animation: "loaderDot 1000ms ease-in-out infinite",
            animationDelay: "0ms",
          }}
        />
        <img
          src={logo}
          className="h-12 w-12 rounded-full object-cover"
          style={{
            animation: "loaderDot 1000ms ease-in-out infinite",
            animationDelay: "150ms",
          }}
        />
        <img
          src={logo}
          className="h-12 w-12 rounded-full object-cover"
          style={{
            animation: "loaderDot 1000ms ease-in-out infinite",
            animationDelay: "300ms",
          }}
        />
      </div>

      <style>{`@keyframes loaderDot { 0% { transform: translateY(0) scale(1); opacity: 0.6; } 50% { transform: translateY(-6px) scale(1.1); opacity: 1; } 100% { transform: translateY(0) scale(1); opacity: 0.6; } } @media (prefers-reduced-motion: reduce) { img[style] { animation: none !important; } }`}</style>
    </div>
  );
}
