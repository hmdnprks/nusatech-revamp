type Props = {
  className?: string;
  /** Colour of the right-hand stroke; the brand navy by default, white on dark surfaces. */
  tone?: "brand" | "light";
};

export function LogoMark({ className, tone = "brand" }: Props) {
  return (
    <svg viewBox="40 90 420 320" className={className} aria-hidden="true">
      <polygon
        fill="#3DB8FF"
        points="104,96 136,96 276,177 276,235 161,169 161,403 104,403 104,252 45,218 45,161 104,195"
      />
      <polygon
        fill={tone === "light" ? "#FFFFFF" : "#145A85"}
        points="340,96 397,96 397,246 455,280 455,337 397,304 397,403 364,403 223,323 223,265 340,331"
      />
    </svg>
  );
}
