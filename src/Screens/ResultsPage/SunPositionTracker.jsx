import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { parseISO } from "date-fns";

const width = 130;
const height = 160;
const radius = Math.min(width, height - 20) / 2 - 10;

const daylightArcStyle = {
  fill: "orange",
};
const sunStyle = {
  fill: "yellow",
  radius: 8,
};

const svgTransform = `translate(${width / 2}, ${height / 2 - 15}) rotate(-90)`;

const isoToMinutes = (isoString) => {
  if (!isoString) {
    return 0;
  }
  const date = parseISO(isoString);
  return date.getHours() * 60 + date.getMinutes();
};

export const SunPositionTracker = ({ sunriseTime, sunsetTime, currentTime }) => {
  const svgRef = useRef();

  const sunriseMinutes = isoToMinutes(sunriseTime);
  const sunsetMinutes = isoToMinutes(sunsetTime);
  const currentMinutes = isoToMinutes(currentTime);

  if (sunriseMinutes >= sunsetMinutes || currentMinutes < 0 || currentMinutes > 24 * 60) {
    return null;
  }

  const daylightDuration = sunsetMinutes - sunriseMinutes;
  const elapsedMinutes = currentMinutes - sunriseMinutes;
  const progress = Math.max(0, Math.min(elapsedMinutes / daylightDuration, 1));

  const angle = -Math.PI / 2 + progress * Math.PI;
  const sunX = radius * Math.cos(angle);
  const sunY = radius * Math.sin(angle);

  useEffect(() => {
    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);

    svg.selectAll("*").remove();

    const group = svg.append("g").attr("transform", svgTransform);

    group
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(radius - 3.5)
          .outerRadius(radius)
          .startAngle(0)
          .endAngle(Math.PI)
      )
      .style("fill", daylightArcStyle.fill);

    group
      .append("g")
      .attr("transform", `translate(${sunX}, ${sunY})`)
      .append("circle")
      .attr("r", sunStyle.radius)
      .style("fill", sunStyle.fill);
  }, [sunX, sunY]);

  return <svg ref={svgRef}></svg>;
};
