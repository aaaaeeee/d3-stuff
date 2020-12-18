import React, { useRef, useEffect, useState } from 'react';
import { select, Selection } from 'd3-selection';
import { rejects } from 'assert';

interface IProps {
  data: any[];
}
// const data = [{ width: 200, height: 100, color: 'orange' }];
// selection
// .data(data)
// .append('rect')
// .attr('fill', (d) => d.color)
// .attr('width', (d) => d.height)
// .attr('height', (d) => d.width);

const data = [
  { units: 150, color: 'purple' },
  { units: 100, color: 'yellow' },
  { units: 50, color: 'red' },
  { units: 50, color: 'cyan' },
  { units: 70, color: 'green' },
  { units: 20, color: 'gray' },
  { units: 120, color: 'orange' },
];
/* Component */
export const WeatherBar = (props: IProps) => {
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
  //   const width = 650;
  //   const height = 400;
  //   const xMinMax = d3.extent(props.data, (d) => d.date);
  //   const xScale = xMinMax
  //     ? d3.scaleTime().domain(xMinMax).range([0, width])
  //     : [0, 0];
  //   const tempMinMax = d3.extent(props.data, (d) => d.high);
  //   const yScale = tempMinMax
  //     ? d3.scaleLinear().domain(tempMinMax).range([height, 0])
  //     : [0, 0];
  //   const BarData = props.data.map((d) => {
  //     return {
  //       x: xScale(d.date),
  //       y: yScale(d.high),
  //       height: yScale(d.low) - yScale(d.high),
  //     };
  //   });

  //   console.log('***BARRDA', BarData);
  /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
  useEffect(() => {
    if (!selection) {
      setSelection(select(ref.current));
    } else {
      const rects = selection
        .selectAll('rect')
        .data(data)
        .attr('fill', (d) => d.color)
        .attr('width', 100)
        .attr('height', (d) => d.units)
        .attr('x', (_, i) => i * 100);
      rects
        .enter()
        .append('rect')
        .attr('fill', (d) => d.color)
        .attr('width', 100)
        .attr('height', (d) => d.units)
        .attr('x', (_, i) => i * 100);
    }
  }, [selection]);

  return (
    <div>
      <svg ref={ref} width={700}>
        <rect></rect>
        <rect></rect>
        <rect></rect>
      </svg>
    </div>
  );
};

export default WeatherBar;

//   const xMinMax = d3.extent(props.data, (d) => d.date);
//   const xScale = xMinMax
//     ? d3.scaleTime().domain(xMinMax).range([0, width])
//     : [0, 0];
//   const tempMinMax = d3.extent(props.data, (d) => d.high);
//   const yScale = tempMinMax
//     ? d3.scaleLinear().domain(tempMinMax).range([height, 0])
//     : [0, 0];
//   const BarData = props.data.map((d) => {
//     return {
//       x: xScale(d.date),
//       y: yScale(d.high),
//       height: yScale(d.low) - yScale(d.high),
//     };
//   });

//   console.log('***BARRDA', BarData);
