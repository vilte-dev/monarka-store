export default function Logo({ size = 40, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 82V22L36 46L50 32L64 46L86 22V82"
        stroke={color}
        strokeWidth="7"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
    </svg>
  )
}
