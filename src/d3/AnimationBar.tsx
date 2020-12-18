import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import { svg } from 'd3';
interface IProps {
  data?: any[];
}

/* Component */
export const AnimationBar = (props: IProps) => {
  const rectWidth = 50;
  const svgHeight = 100;
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
  const d3Container = useRef(null);

  /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
  // useEffect(() => {
  //   if (props.data && d3Container.current) {
  //     const rectWidth = 50;
  //     const svg = d3.select(d3Container.current);
  //     svg
  //       .selectAll('rect')
  //       .data(props.data, (d: any) => d)
  //       .join('rect') //this does enter, update exit
  //       .attr('x', (d, i) => i * rectWidth)
  //       .attr('y', (d, i) => 100 - d) // this will make data from down to up
  //       // set height based on the bound datum
  //       .attr('height', (d) => d)
  //       // rest of attributes are constant values
  //       .attr('width', rectWidth)
  //       .attr('stroke-width', 3)
  //       .attr('stroke-dasharray', '5 5')
  //       .attr('stroke', 'plum')
  //       .attr('fill', 'cyan');
  //   }
  // }, [props.data]);

  const updateBars = () => {
    const t = d3.select('svg').transition().duration(1000);
    const data = _.times(_.random(3, 8), (i) => _.random(0, 100));
    console.log('***data', data);
    d3.select('svg')
      .selectAll('rect')
      .data(data, (d: any) => d)
      .join(
        (enter) => {
          return enter
            .append('rect')
            .attr('height', 0)
            .attr('y', svgHeight)
            .attr('x', (d, i) => i * rectWidth);
        },
        (update) => update,
        (exit) => exit.transition(t).attr('height', 0).attr('y', svgHeight)
      )
      .attr('width', rectWidth)
      .transition(t)
      .attr('x', (d, i) => i * rectWidth)
      .attr('height', (d) => d)
      .attr('y', (d) => svgHeight - d)
      .attr('stroke-width', 3)
      .attr('stroke', 'plum')
      .attr('fill', 'cyan');
  };

  return (
    <div>
      <button onClick={updateBars}>random</button>
      <div>
        <svg className="d3-component" width={400} height={200} />
      </div>
    </div>
  );
};

export default AnimationBar;
