import React, { Component } from 'react';
import Palette from './component/palette/palette.component';
import SeedColors from './SeedColor';
import { generatePalette } from './colorHelper';

class App extends Component {
  render() {
    console.log(generatePalette(SeedColors[4]))
    return (



      <div>
        <Palette {...SeedColors[6]} />

      </div>
    );


  }
}

export default App;
