import React, { useRef, useEffect, useState } from 'react';
import { select, Selection } from 'd3-selection';

/* Component */
export const TransitionExsample = () => {
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

  useEffect(() => {
    if (!selection) {
      setSelection(select(ref.current));
    } else {
      selection
        .append('rect')
        .attr('width', 100)
        .attr('height', 100)
        .attr('fill', 'orange')
        .transition()
        .duration(2000)
        .attr('fill', 'blue')
        .attr('height', 200)
        .attr('width', 200);
    }
  }, [selection]);
  return (
    <div style={{ padding: '12px' }}>
      <svg style={{ marginTop: '12px' }} ref={ref}></svg>
    </div>
  );
};

export default TransitionExsample;
