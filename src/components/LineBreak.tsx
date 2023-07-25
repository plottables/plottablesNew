const LineBreak = () => {

  let path = "M 0 " + (4 * Math.random() + 5);
  for (let i = 1; i <= 20; i++) {
    path +=
      " S " +
      (i - 0.5) +
      " " +
      (4 * Math.random() + 5) +
      " " +
      i +
      " " +
      (4 * Math.random() + 5);
  }
  return (
    <svg
      preserveAspectRatio="none"
      width="100%"
      height="25px"
      viewBox="0 0 20 15"
      display="block"
    >
      <path
        style={{
          fill: "none",
          strokeWidth: "2",
          stroke: "rgb(0%,0%,0%)",
        }}
        d={path}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default LineBreak
