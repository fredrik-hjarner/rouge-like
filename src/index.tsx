import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import { StoreManager } from 'redux/store';
import { AbilityScoreModule } from 'redux/modules';
import { map } from './map';
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
        if (x === this.props.pos.x && y === this.props.pos.y) {
          grid[y][x] = '@';
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

  private keyup = (event: KeyboardEvent) => {
    const { type } = event;
    const { setPosition } = this.props;
    switch (event.code) {
      case 'Numpad4':
        type === 'keyup' && setPosition({ x: this.props.pos.x - 1 }); // tslint:disable-line
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Numpad8':
        type === 'keyup' && setPosition({ y: this.props.pos.y - 1 }); // tslint:disable-line
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Numpad6':
        type === 'keyup' && setPosition({ x: this.props.pos.x + 1 }); // tslint:disable-line
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Numpad2':
        type === 'keyup' && setPosition({ y: this.props.pos.y + 1 }); // tslint:disable-line
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
    </React.StrictMode>
  </Provider>
);

render(<Root/>, document.getElementById('react-root'));
