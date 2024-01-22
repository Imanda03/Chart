import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface BarGraphProps {
  data: number[];
  width?: number;
  height?: number;
  barColor?: string;
}

interface ZoomableSVGProps {
  children: React.ReactNode;
  width: number;
  height: number;
}

const ZoomableSVG: React.FC<ZoomableSVGProps> = ({
  children,
  width,
  height,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [k, setK] = useState<number>(1);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  useEffect(() => {
    const zoom: any = d3.zoom().on("zoom", (event) => {
      const { x, y, k } = event.transform;
      setK(k);
      setX(x);
      setY(y);
    });

    if (svgRef.current) {
      d3.select(svgRef.current).call(zoom);
    }
  }, []);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <g transform={`translate(${x},${y})scale(${k})`}>{children}</g>
    </svg>
  );
};

const BarGraph: React.FC<BarGraphProps> = ({
  data,
  width = 640,
  height = 400,
  barColor = "steelblue",
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);

      const x = d3
        .scaleBand()
        .domain(d3.range(data.length).map(String))
        .range([0, width])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([d3.min(data) || 0, d3.max(data) || 1]) // Updated domain to consider both positive and negative values
        .range([height, 0]);

      svg
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (_, i) => x(String(i)) || 0)
        .attr("y", (d) => (d >= 0 ? y(d) : y(0))) // Adjusted y-coordinate based on positive and negative values
        .attr("width", x.bandwidth())
        .attr("height", (d) => Math.abs(height - y(d)))
        .attr("fill", barColor);
    }
  }, [data, width, height, barColor]);

  return (
    <ZoomableSVG width={window.innerWidth} height={window.innerHeight}>
      <svg ref={svgRef} width={width} height={height}>
        {/* Axes, labels, or any additional elements can be added here */}
      </svg>
    </ZoomableSVG>
  );
};

export default BarGraph;
