import React, { useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const BarChart = () => {
  const [chartType, setChartType] = useState("column2d");

  const chartData = {
    chart: {
      caption: "Countries With Most Oil Reserves [2017-18]",
      subCaption: "In MMbbl = One Million barrels",
      xAxisName: "Country",
      yAxisName: "Reserves (MMbbl)",
      numberSuffix: "K",
      theme: "fusion",
    },
    data: [
      { label: "Venezuela", value: 290 },
      { label: "Saudi", value: 260 },
      { label: "Canada", value: 180 },
      { label: "Iran", value: 140 },
      { label: "Russia", value: 115 },
      { label: "UAE", value: 100 },
      { label: "US", value: 30 },
      { label: "China", value: 30 },
      { label: "India", value: -40 },
    ],
  };

  // Customize individual data points based on the value being negative
  chartData.data = chartData.data.map((dataPoint) => ({
    ...dataPoint,
    color: dataPoint.value < 0 ? "#FF0000" : undefined,
  }));

  const chartConfig = {
    type: chartType,
    width: 600,
    height: 400,
    dataFormat: "json",
    dataSource: chartData,
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            value="column2d"
            checked={chartType === "column2d"}
            onChange={() => setChartType("column2d")}
          />
          Bar Graph
        </label>
        <label>
          <input
            type="radio"
            value="line"
            checked={chartType === "line"}
            onChange={() => setChartType("line")}
          />
          Line Graph
        </label>
      </div>
      <ReactFC {...chartConfig} />
    </div>
  );
};

export default BarChart;
