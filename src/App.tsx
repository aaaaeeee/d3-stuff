import React from 'react';
import WeatherBar from './d3/WeatherBar';
import { weatherData } from './d3/data/weatherData';

import ScalesExsample from './d3/ScalesExsample';
import TransitionExsample from './d3/TransitionExsample';
import UpdateExsample from './d3/UpdateExsample';

function App() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <WeatherBar data={weatherData} />
        <UpdateExsample />
        <TransitionExsample />
        <ScalesExsample />
      </div>
    </div>
  );
}

export default App;
