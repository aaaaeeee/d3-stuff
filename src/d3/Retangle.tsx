import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface IProps {
  data?: any[];
}

/* Component */
export const Retangle = (props: IProps) => {
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
  const d3Container = useRef(null);

  /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
  useEffect(() => {
    if (props.data && d3Container.current) {
      const rectWidth = 50;
      const svg = d3.select(d3Container.current);
      svg
        .selectAll('rect')
        .data(props.data, (d: any) => d)
        .join('rect') //this does enter, update exit
        .attr('x', (d, i) => i * rectWidth)
        .attr('y', (d, i) => 100 - d) // this will make data from down to up
        // set height based on the bound datum
        .attr('height', (d) => d)
        // rest of attributes are constant values
        .attr('width', rectWidth)
        .attr('stroke-width', 3)
        .attr('stroke-dasharray', '5 5')
        .attr('stroke', 'plum')
        .attr('fill', 'yellow');
    }
  }, [props.data]);

  return (
    <div>
      <svg
        className="d3-component"
        width={400}
        height={200}
        ref={d3Container}
      />
    </div>
  );
};

export default Retangle;
