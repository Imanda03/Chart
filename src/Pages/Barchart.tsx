import React, { useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const data = [
  { label: "Venezuela", value: 290 },
  { label: "Saudi", value: 260 },
  { label: "Canada", value: 180 },
  { label: "Iran", value: 140 },
  { label: "Russia", value: 115 },
  { label: "UAE", value: 100 },
  { label: "US", value: 30 },
  { label: "China", value: 30 },
  { label: "India", value: -40 },
];

const CombinedChart = () => {
  const [chartType, setChartType] = useState("mscombidy2d");

  const chartData = {
    chart: {
      caption: "Countries With Most Oil Reserves [2017-18]",
      subCaption: "In MMbbl = One Million barrels",
      xAxisName: "Country",
      yAxisName: "Reserves (MMbbl)",
      numberSuffix: "K",
      theme: "fusion",
    },
    categories: [
      {
        category: data.map((item) => ({ label: item.label })),
      },
    ],
    dataset: [
      {
        seriesname: "Reserves",
        data: data.map((item) => ({
          value: item.value,
          color: item.value < 0 ? "#FF0000" : "#4d76a3",
        })),
      },
      {
        seriesname: "Line",
        renderas: "line",
        anchorRadius: "0",
        data: data.map((item) => ({ value: item.value })),
      },

      {
        seriesname: "Decarbonization Trend",
        renderas: "line",
        anchorRadius: "0",
        data: [
          { value: 290 },
          { value: 200 },
          { value: 150 },
          { value: 120 },
          { value: 100 },
          { value: 80 },
          { value: 20 },
          { value: 10 },
          { value: -50 },
        ],
      },
    ],
  };

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
            value="mscombidy2d"
            checked={chartType === "mscombidy2d"}
            onChange={() => setChartType("mscombidy2d")}
          />
          Bar Graph with Lines
        </label>
      </div>
      <ReactFC {...chartConfig} />
    </div>
  );
};

export default CombinedChart;
