import React, { useRef, useEffect, useState } from 'react';
import { select, Selection } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3';
const data = [
  { name: 'foo', number: 9000 },
  { name: 'bar', number: 4000 },
  { name: 'xoo', number: 2000 },
  { name: 'foxo', number: 1232 },
  { name: 'fofo', number: 5435 },
  { name: 'aodo', number: 3455 },
];

const dimensions = {
  width: 800,
  height: 500,
  chartWidth: 700,
  chartHeight: 400,
  marginLeft: 100,
};
/* Component */
export const ScalesExsample = () => {
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
  const ref = useRef(null);
  const [selection, setSelection] = useState<null | Selection<
    null,
    unknown,
    null,
    undefined
  >>(null);

  const maxValue = max(data, (d) => d.number);
  const y = scaleLinear()
    .domain([0, maxValue!])
    .range([0, dimensions.chartHeight]);
  const x = scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, dimensions.chartWidth])
    .paddingInner(0.05);

  const yAxis = axisLeft(y).ticks(3);
  const xAxis = axisBottom(x);
  useEffect(() => {
    if (!selection) {
      setSelection(select(ref.current));
    } else {
      selection
        .append('g')
        .attr(
          'transform',
          `translate(${dimensions.marginLeft},${dimensions.chartHeight})`
        )
        .call(xAxis);
      selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft},0)`)
        .call(yAxis);
      selection
        .append('g') //for transormation purpose
        .attr('transform', `translate(${dimensions.marginLeft},0)`)
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('x', (d) => x(d.name)!)
        .attr('fill', 'orange')
        .attr('height', (d) => y(d.number));
    }
  }, [selection, y, x, xAxis, yAxis]);

  return (
    <div style={{ padding: '12px' }}>
      <svg
        style={{ marginTop: '12px' }}
        ref={ref}
        width={dimensions.width}
        height={dimensions.height}
      ></svg>
    </div>
  );
};

export default ScalesExsample;
