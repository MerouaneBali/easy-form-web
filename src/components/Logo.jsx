function Logo() {
  return (
    <svg
      className="logo"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="32" fill="#3751FF" />
      <rect
        x="43"
        y="46"
        width="12"
        height="6"
        rx="3"
        transform="rotate(-180 43 46)"
        fill="#E5E5E5"
      />
      <rect
        x="27"
        y="46"
        width="6"
        height="6"
        rx="3"
        transform="rotate(-180 27 46)"
        fill="#E5E5E5"
      />
      <rect
        x="37.3999"
        y="34.8"
        width="16.8"
        height="5.59999"
        rx="2.79999"
        transform="rotate(-180 37.3999 34.8)"
        fill="#E5E5E5"
      />
      <rect
        x="43"
        y="23.6001"
        width="22.4"
        height="5.59999"
        rx="2.79999"
        transform="rotate(-180 43 23.6001)"
        fill="#E5E5E5"
      />
    </svg>
  );
}

export default Logo;
