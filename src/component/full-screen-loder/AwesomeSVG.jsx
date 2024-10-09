

const AwesomeSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="200"
      height="200"
      fill="none"
      stroke="#06b6d4"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Outer Circle */}
      <circle cx="50" cy="50" r="45" stroke="#06b6d4" fill="#e0f7fa" />
      
      {/* Hexagon */}
      <polygon 
        points="50,20 70,35 70,65 50,80 30,65 30,35" 
        fill="#00acc1"
        stroke="#006064"
        strokeWidth="2"
      />

      {/* Inner Circle */}
      <circle cx="50" cy="50" r="20" fill="#00838f" />
      
      {/* Text in the center */}
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        fill="white"
        fontSize="10"
        fontWeight="bold"
      >
        SVG
      </text>
    </svg>
  );
};

export default AwesomeSVG;
