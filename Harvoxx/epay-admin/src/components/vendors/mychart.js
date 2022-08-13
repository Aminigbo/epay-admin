import React from "react";

import {Chart} from "react-charts";

function MyChart() {
  const data = React.useMemo(
    () => [
      [
        [1, 10],
        [2, 20],
        [3, 5],
        [4, 30],
        [5, 28],
        [6, 40],
      ],
      // [
      //   [1, 10],
      //   [2, 10],
      //   [3, 10],
      // ],
      // [
      //   [1, 10],
      //   [2, 10],
      //   [3, 10],
      // ],
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      {primary: true, position: "bottom", type: "time"},
      {position: "left", type: "linear", stacked: true},
    ],
    []
  );

  const series = React.useMemo(
    () => ({
      type: "area",
    }),
    []
  );

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Chart data={data} series={series} axes={axes} tooltip />
    </div>
  );
}

export default MyChart;
