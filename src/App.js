import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Palette from './component/palette/palette.component';
import SingleColorPalette from './component/singleLayerColor/singleLayerColor.component'
import PaletteList from './component/paletteList/paletteList.component';

import SeedColors from './SeedColor';
import { generatePalette } from './colorHelper';

class App extends Component {

  findPalette(id) {
    return SeedColors.find(palette => palette.id === id);
  }


  render() {
    return (
      <Switch>
        <Route
          exact
          path='/'
          render={(routeProps) => <PaletteList palettes={SeedColors} {...routeProps} />} />

        <Route
          exact
          path='/palette/:id'
          render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />


        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={(routeProps) => <SingleColorPalette />} />


      </Switch>

      // <div>
      //   <Palette palette={generatePalette(SeedColors[4])} />
      // </div>

    );


  }
}

export default App;
