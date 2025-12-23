type PitchVerticalProps = {
  className?: string;
};

export default function PitchVertical({ className }: PitchVerticalProps) {
  return (
    <div className={className}>
      {/* 컨테이너는 부모에서 w/h를 잡아주면, 아래 SVG가 꽉 채움 */}
      <svg
        viewBox="0 0 100 160"
        preserveAspectRatio="none"
        className="h-full w-full rounded-2xl"
        aria-label="football pitch background (vertical)"
        role="img"
      >
        {/* 잔디 배경 */}
        <defs>
          {/* 잔디 그라디언트 (약간 더 초록) */}
          <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6FBF8A" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#4F8A64" stopOpacity="0.9" />
          </linearGradient>

          {/* 라인 스타일 */}
          <style>{`
            .line { fill: none; stroke: rgba(255,255,255,0.9); stroke-width: 1.2; }
            .thin { stroke-width: 0.9; }
            .spot { fill: rgba(255,255,255,0.9); }
          `}</style>
        </defs>

        <rect x="0" y="0" width="100" height="160" fill="url(#grass)" rx="10" />

        {/* 외곽선 */}
        <rect x="4" y="4" width="92" height="152" className="line" rx="8" />

        {/* 하프라인 */}
        <line x1="4" y1="80" x2="96" y2="80" className="line thin" />

        {/* 센터서클 */}
        <circle cx="50" cy="80" r="12" className="line thin" />
        <circle cx="50" cy="80" r="1.2" className="spot" />

        {/* 상단 페널티 박스 */}
        <rect x="22" y="4" width="56" height="26" className="line thin" />
        <rect x="34" y="4" width="32" height="10" className="line thin" />
        <circle cx="50" cy="22" r="1.0" className="spot" />

        {/* 하단 페널티 박스 */}
        <rect x="22" y="130" width="56" height="26" className="line thin" />
        <rect x="34" y="146" width="32" height="10" className="line thin" />
        <circle cx="50" cy="138" r="1.0" className="spot" />

        {/* 페널티 아크(원호) */}
        {/* 위쪽 */}
        <path
          d="M 62 30
             A 12 8 0 0 1 38 30"
          className="line thin"
        />
        {/* 아래쪽 */}
        <path
          d="M 38 130
             A 12 8 0 0 1 62 130"
          className="line thin"
        />
      </svg>
    </div>
  );
}
