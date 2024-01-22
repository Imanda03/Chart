import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface BubbleData {
  name: string;
  value: number;
}

interface BubbleChartProps {
  data: BubbleData[];
}

const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const width = 500;
    const height = 500;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const pack = d3.pack().size([width, height]).padding(5);

    const root = d3
      .hierarchy({ children: data })
      .sum((d: BubbleData) => d.value);

    const nodes = pack(root).descendants();

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => d.r)
      .attr("fill", (d, i) => color(i));

    svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .text((d: any) => d.data.name);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BubbleChart;
