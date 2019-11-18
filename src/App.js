import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Palette from './component/palette/palette.component';
import SingleColorPalette from './component/singleLayerColor/singleLayerColor.component'
import PaletteList from './component/paletteList/paletteList.component';

import SeedColors from './SeedColor';
import { generatePalette } from './colorHelper';

import NewPaletteForm from './component/newPaletteForm/newPaletteForm.component';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { palettes: SeedColors }
  }

  findPalette = (id) => {
    return this.state.palettes.find(palette => palette.id === id);
  }


  savePalette = (newPalette) => {
    this.setState({ palettes: [...this.state.palettes, newPalette] });

  }

  render() {
    return (
      <Switch>

        <Route
          exact
          path='/palette/new'
          render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} {...routeProps} />} />


        <Route
          exact
          path='/'
          render={(routeProps) => <PaletteList palettes={this.state.palettes} {...routeProps} />} />

        <Route
          exact
          path='/palette/:id'
          render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />



        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={(routeProps) => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}

              palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
            />
          )} />


      </Switch>

      // <div>
      //   <Palette palette={generatePalette(SeedColors[4])} />
      // </div>

    );


  }
}

export default App;
