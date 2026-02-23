interface CurrencyExchangeLogoProps {
  size?: number;
}

export function CurrencyExchangeLogo({
  size = 48,
}: CurrencyExchangeLogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#2563EB"/>
          <stop offset="100%" stop-color="#0F172A"/>
        </linearGradient>
      </defs>

      <rect x="4" y="4" width="40" height="40" rx="14" fill="url(#grad)"/>

      <path d="M16 24a8 8 0 0 1 14-5"
            stroke="white"
            stroke-width="3"
            fill="none"
            stroke-linecap="round"/>

      <path d="M32 24a8 8 0 0 1-14 5"
            stroke="white"
            stroke-width="3"
            fill="none"
            stroke-linecap="round"/>

      <path d="M28 17L30 19L26 19Z" fill="white"/>
      <path d="M20 31L18 29L22 29Z" fill="white"/>
    </svg>
  );
}
