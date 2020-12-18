import React, { useRef, useEffect, useState } from 'react';
import { select, Selection } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import 'd3-transition';
import randomstring from 'randomstring';
//import { easeElastic } from 'd3';
const initialData = [
  { name: 'foo', units: 23 },
  { name: 'bar', units: 44 },
  { name: 'xoo', units: 26 },
  { name: 'foxo', units: 77 },
  { name: 'fofo', units: 54 },
  { name: 'aodo', units: 45 },
];
const dimensions = {
  width: 900,
  height: 600,
  chartWidth: 700,
  chartHeight: 400,
  marginLeft: 100,
};
/* Component */
export const UpdateExsample = () => {
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
  const [data, setData] = useState(initialData);

  let y = scaleLinear()
    .domain([0, max(data, (d) => d.units)!])
    .range([dimensions.height, 0]);

  let x = scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, dimensions.width])
    .paddingInner(0.05);

  useEffect(() => {
    if (!selection) {
      setSelection(select(ref.current));
    } else {
      const rects = selection.selectAll('rect').data(data);
      rects
        .exit()
        .attr('fill', 'orange')
        .transition()
        .duration(300)
        .attr('width', x.bandwidth)
        .attr('height', 0)
        .attr('y', dimensions.height)
        .attr('fill', 'blue')
        .remove();
      rects
        .transition()
        .duration(300)
        .delay(100)
        .attr('width', x.bandwidth)
        .attr('height', (d) => dimensions.height - y(d.units))
        .attr('x', (d) => x(d.name)!)
        .attr('y', (d) => y(d.units))
        .attr('fill', 'orange');

      rects
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('x', (d) => x(d.name)!)
        .attr('fill', 'blue')
        .attr('height', 0)
        .attr('y', dimensions.height)
        .transition()
        .duration(300)
        .delay((_, i) => i * 20)
        .attr('height', (d) => dimensions.height - y(d.units))
        .attr('y', (d) => y(d.units))
        .attr('fill', 'orange');
    }
  }, [data, selection, x, y]);

  const addRandom = () => {
    const dataToBeAdded = {
      name: randomstring.generate(10),
      units: Math.floor(Math.random() * 80 + 20),
    };
    setData([...data, dataToBeAdded]);
  };

  const removeLast = () => {
    if (data.length === 0) {
      return;
    }
    const slicedData = data.slice(0, data.length - 1);
    setData(slicedData);
  };
  return (
    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column' }}>
      <div>
        <svg
          style={{ marginTop: '12px' }}
          ref={ref}
          width={dimensions.width}
          height={dimensions.height}
        ></svg>
      </div>
      <div>
        <button onClick={addRandom}>Add Random</button>
        <button onClick={removeLast}>RemoveLast</button>
      </div>
    </div>
  );
};

export default UpdateExsample;
