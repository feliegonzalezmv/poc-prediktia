import React from "react";
import ContentLoader from "react-content-loader";

const TableLoader = (props) => {
  // Get values from props
  // const { rows, columns, coverHeight, coverWidth, padding, speed } = props;

  // Hardcoded values
  const rows = 4;
  const columns = 5;
  const coverHeight = 200;
  const coverWidth = 253;
  const padding = 5;
  const speed = 1;

  const coverHeightWithPadding = coverHeight + padding;
  const coverWidthWithPadding = coverWidth + padding;
  const initial = 35;
  const covers = Array(columns * rows).fill(1);

  return (
    <div className="margin-left-2rem">
      <ContentLoader
        speed={speed}
        width={columns * coverWidthWithPadding}
        height={rows * coverHeightWithPadding}
        primarycolor="#242b34"
        secondarycolor="#343d4c"
        {...props}
      >
        <rect
          x="0"
          y="0"
          rx="0"
          ry="0"
          width={columns * coverWidthWithPadding - padding}
          height="20"
        />

        {covers.map((g, i) => {
          let vy = Math.floor(i / columns) * coverHeightWithPadding + initial;
          let vx =
            (i * coverWidthWithPadding) % (columns * coverWidthWithPadding);
          return (
            <rect
              key={i}
              x={vx}
              y={vy}
              rx="0"
              ry="0"
              width={coverWidth}
              height={coverHeight}
            />
          );
        })}
      </ContentLoader>
    </div>
  );
};

export default TableLoader;
