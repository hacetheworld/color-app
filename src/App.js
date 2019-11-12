import React from 'react';
import Palette from './Palette';
import SeedColor from './SeedColor';
import './styles/palette.css';

function App() {
  return (
    <div>
      <Palette {...SeedColor[5]} />

    </div>
  );
}

export default App;
