export function VirelloMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vGrad" x1="4" y1="6" x2="44" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path d="M6 8 L22 38 L24 38 L20 24 Z" fill="url(#vGrad)" />
      <path d="M42 8 L26 38 L24 38 L28 24 Z" fill="url(#vGrad)" />
    </svg>
  );
}

export function VirelloLogo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <VirelloMark size={size} />
      <span className="font-display font-semibold text-[1.15rem] tracking-tight text-text">
        virello
      </span>
    </div>
  );
}
