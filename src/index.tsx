import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import store from 'redux/store';
import { InitializeModule } from 'redux/modules';
import { GameScreen } from 'view-layer';
import 'styles/global';

const Root = () => (
  <Provider store={store}>
    <React.StrictMode>
      <GameScreen/>
      <div style={{ width: '400px' }}>
        <h3>Story</h3>
        <p>
          The dwarven homelands were attacked by evil forces. To save your home you traveled to the chaos dimension of
          Limbo to find the legendary <i>Axe of Doom</i>. You didn't find the axe, instead you got caught in a chaos
          storm. You were caught in one long month and the chaos energy changed and twisted your form
          beyond recognition. Now you must return and save homelands before it's too late.
        </p>
        <p>You are MechaDwarf. Half machine, half dwarf!</p>
        <h3>Features</h3>
        <p>Blood/hit effects, batteries, oil</p>
      </div>
    </React.StrictMode>
  </Provider>
);

render(<Root/> as any, document.getElementById('react-root'));

store.dispatch(InitializeModule.actions.initialize());
