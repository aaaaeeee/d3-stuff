import React, { useEffect, useRef, useState } from 'react';
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleSequential, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import { axisBottom, axisLeft, interpolateRdYlBu } from 'd3';
//import { axisBottom, axisLeft } from 'd3';
interface IProps {
  data: any[];
}
const width = 650;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

const WeatherBar = (props: IProps) => {
  const ref = useRef(null);
  const [data] = useState(props.data);
  const [selection, setSelection] = useState<null | Selection<
    null,
    unknown,
    null,
    undefined
  >>(null);

  data.forEach((day) => (day.date = new Date(day.date)));

  const extentt = extent(data, (d) => d.date);

  const xScale = scaleTime()
    .domain(extentt ? extentt : [0, 0])
    .range([margin.left, width - margin.right]);

  const [low, high] = extent(data, (d) => d.high);
  const yScale = scaleLinear()
    .domain([Math.min(low, 0), high])
    .range([height - margin.bottom, margin.top]);

  const colorExtent = extent(data, (d) => d.avg).reverse();
  const colorScale = scaleSequential()
    .domain(colorExtent)
    .interpolator(interpolateRdYlBu);

  const bars = data.map((d) => {
    return {
      x: xScale(d.date),
      y: yScale(d.high),
      height: yScale(d.low) - yScale(d.high),
      fill: colorScale(d.avg),
    };
  });

  console.log('***BAR', bars);
  const yAxis = axisLeft(yScale);
  const xAxis = axisBottom(xScale);
  useEffect(() => {
    if (!selection) {
      setSelection(select(ref.current));
    } else {
      selection
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(xAxis);
      selection
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis);
      const rects = selection.selectAll('rect').data(data);
      console.log('***', rects);

      rects
        .enter()
        .append('rect')
        .attr('width', 2)
        .attr('height', (d) => yScale(d.low) - yScale(d.high))
        .attr('x', (d) => xScale(d.date)!)
        .attr('y', (d) => yScale(d.high))
        .attr('fill', (d) => colorScale(d.avg));
    }
  }, [colorScale, data, selection, xAxis, xScale, yAxis, yScale]);
  return (
    <div style={{ padding: '10px' }}>
      <svg ref={ref} width={width} height={height}>
        {/* {bars.map((d) => (
          <rect x={d.x} y={d.y} width={2} height={d.height} fill={d.fill} />
        ))} */}
      </svg>
    </div>
  );
};

export default WeatherBar;
