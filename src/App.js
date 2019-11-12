import React from 'react';
import Palette from './component/palette/palette.component';
import SeedColor from './SeedColor';

function App() {
  return (
    <div>
      <Palette {...SeedColor[2]} />

    </div>
  );
}

export default App;
