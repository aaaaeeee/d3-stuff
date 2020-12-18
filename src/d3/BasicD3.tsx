import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface IProps {
  data?: any[];
}

/* Component */
export const BasicD3 = (props: IProps) => {
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
  const d3Container = useRef(null);

  /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
  useEffect(
    () => {
      if (props.data && d3Container.current) {
        const svg = d3.select(d3Container.current);

        svg
          .selectAll('text')
          .data(props.data, (d: any) => d)
          .join('text')
          .attr('x', (d, i) => i * 25)
          .attr('y', 40)
          .style('font-size', 24)
          .text((d: number) => d);
      }
    },

    /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
    [props.data]
  );

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

export default BasicD3;
