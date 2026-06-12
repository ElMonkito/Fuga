type OfferArtOptions = {
  destination: string;
  country: string;
  accent: string;
  glow: string;
  start: string;
  middle: string;
  end: string;
  label: string;
};

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => {
    switch (character) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return character;
    }
  });
}

export function makeOfferImage({
  destination,
  country,
  accent,
  glow,
  start,
  middle,
  end,
  label
}: OfferArtOptions) {
  const safeDestination = escapeXml(destination);
  const safeCountry = escapeXml(country);
  const safeLabel = escapeXml(label);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" fill="none" role="img" aria-labelledby="title desc">
      <title>${safeDestination}</title>
      <desc>${safeDestination}, ${safeCountry}. ${safeLabel}</desc>
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="48%" stop-color="${middle}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
        <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.42" />
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.08" />
        </linearGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="24" />
        </filter>
      </defs>
      <rect width="1200" height="900" rx="58" fill="url(#bg)" />
      <circle cx="980" cy="170" r="220" fill="${glow}" opacity="0.34" filter="url(#blur)" />
      <circle cx="210" cy="760" r="280" fill="#FFFFFF" opacity="0.06" />
      <path
        d="M104 658C220 570 364 548 520 582C656 612 784 696 1010 650"
        stroke="${accent}"
        stroke-opacity="0.2"
        stroke-width="34"
        stroke-linecap="round"
      />
      <rect x="64" y="64" width="1072" height="772" rx="40" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.14" />
      <rect x="96" y="102" width="176" height="40" rx="20" fill="${accent}" fill-opacity="0.18" stroke="${accent}" stroke-opacity="0.46" />
      <text x="116" y="130" fill="#FFFFFF" font-size="18" font-weight="700" letter-spacing="0.16em" font-family="Inter, Arial, sans-serif">
        FUGA ESCAPES
      </text>
      <text x="96" y="286" fill="#FFFFFF" font-size="88" font-weight="800" letter-spacing="-0.03em" font-family="Inter, Arial, sans-serif">
        ${safeDestination}
      </text>
      <text x="98" y="348" fill="#FFFFFF" fill-opacity="0.82" font-size="28" font-weight="500" font-family="Inter, Arial, sans-serif">
        ${safeCountry}
      </text>
      <rect x="98" y="396" width="326" height="66" rx="33" fill="url(#ribbon)" stroke="#FFFFFF" stroke-opacity="0.14" />
      <text x="126" y="438" fill="#FFFFFF" font-size="22" font-weight="700" font-family="Inter, Arial, sans-serif">
        ${safeLabel}
      </text>
      <rect x="98" y="556" width="368" height="16" rx="8" fill="#FFFFFF" fill-opacity="0.38" />
      <rect x="98" y="590" width="286" height="16" rx="8" fill="#FFFFFF" fill-opacity="0.24" />
      <rect x="98" y="624" width="324" height="16" rx="8" fill="#FFFFFF" fill-opacity="0.18" />
      <text x="98" y="742" fill="#FFFFFF" fill-opacity="0.8" font-size="24" font-weight="500" font-family="Inter, Arial, sans-serif">
        Vol + hotel + extras pensés pour partir vite.
      </text>
      <text x="98" y="792" fill="#FFFFFF" fill-opacity="0.64" font-size="18" font-weight="500" font-family="Inter, Arial, sans-serif">
        Réservation mobile, visuel éditorial, style premium.
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
