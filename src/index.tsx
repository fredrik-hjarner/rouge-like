import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import { StoreManager } from 'redux/store';
import { AbilityScoreModule } from 'redux/modules';
import { map } from './maps/level2';
import { legalMove } from './legal-move';
import enemies from './enemies';
import 'styles/global';

const store = StoreManager.createStore();

type Props = {
  pos: { x: number, y: number }, // TODO: better type
  setPosition: any, // TODO: better type
};

class Routes extends React.Component<Props> {
  public componentDidMount() {
    window.addEventListener('keydown', this.keyup, true);
    window.addEventListener('keyup', this.keyup, true);
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.keyup, true);
    window.removeEventListener('keyup', this.keyup, true);
  }

  public render() {
    const grid = Array(map.height).fill(0).map(() => Array(map.width).fill('X'));

    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const enemy = enemies.at({x, y});
        if (x === this.props.pos.x && y === this.props.pos.y) {
          grid[y][x] = '@';
        } else if (enemy) {
          grid[y][x] = enemy.render();
        } else {
          grid[y][x] = map.at(x, y);
        }
      }
    }

    return (
      <>
        <pre className="map">
          {grid.map(row => (
            <div>
              {row.map((c: string) => <span>{c}</span>)}
            </div>
          ))}
        </pre>
      </>
    );
  }

  private move(pos: { x: number, y: number }) {
    if (legalMove(pos.x, pos.y)) {
      this.props.setPosition(pos);
    }
  }

  private keyup = (event: KeyboardEvent) => {
    const { type } = event;
    const { x, y } = this.props.pos;
    switch (event.code) {
      case 'Numpad4':
        type === 'keyup' && this.move({ x: x - 1, y }); // tslint:disable-line
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Numpad8':
        type === 'keyup' && this.move({ x, y: y - 1 }); // tslint:disable-line
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Numpad6':
        type === 'keyup' && this.move({ x: x + 1, y }); // tslint:disable-line
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Numpad2':
        type === 'keyup' && this.move({ x, y: y + 1 }); // tslint:disable-line
        event.preventDefault();
        event.stopPropagation();
        break;
    }
  }
}

const mapStateToProps = (state: any) => ({
  pos: AbilityScoreModule.getPosition(state),
});

const mapStateToDispatch = ({
  setPosition: AbilityScoreModule.setPosition,
});

const App = connect(mapStateToProps, mapStateToDispatch)(Routes);

const Root = () => (
  <Provider store={store}>
    <React.StrictMode>
      <App/>
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

render(<Root/>, document.getElementById('react-root'));
