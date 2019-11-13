import React, { Component } from 'react';
import Palette from './component/palette/palette.component';
import SeedColors from './SeedColor';
import { generatePalette } from './colorHelper';

class App extends Component {
  render() {
    return (

      <div>
        <Palette palette={generatePalette(SeedColors[4])} />
      </div>

    );


  }
}

export default App;
