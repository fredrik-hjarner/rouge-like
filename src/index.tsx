import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { StoreManager } from 'redux/store';
import 'semantic-ui-css/semantic.min.css';
import 'styles/global';

const store = StoreManager.createStore();

// const player = { x: 0, y: 0 };
// const mapSize = { width: 77, height: 19 };

// tslint:disable
const map = `
                                                                             
  _____________________             _______           __________________     
  |...................|            |......|                                  
  |....................#######     |......|                                  
  |___________________|      ######.......|                                  
                                   |___.__|                                  
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
`;
// tslint:enable

const rows = map.split('\n').slice(1, -2).map(row => row.split(''));

class Routes extends React.Component {
  public state = {
    x: 0,
    y: 0,
  };

  public componentDidMount() {
    window.addEventListener('keydown', this.keyup, true);
    window.addEventListener('keyup', this.keyup, true);
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.keyup, true);
    window.removeEventListener('keyup', this.keyup, true);
  }

  public render() {
    const rowsClone = rows.map(row => row.map(char => char));
    rowsClone[this.state.y][this.state.x] = '@';
    return (
      <>
        <pre className="map">
          {rowsClone.map(row => (
            <div>
              {row.map(c => <span>{c}</span>)}
            </div>
          ))}
        </pre>
      </>
    );
  }

  private keyup = (event: KeyboardEvent) => {
    const { type } = event;
    switch (event.code) {
      case 'Numpad4':
        type === 'keyup' && this.setState({ x: this.state.x - 1 }); // tslint:disable-line
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Numpad8':
        type === 'keyup' && this.setState({ y: this.state.y - 1 }); // tslint:disable-line
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Numpad6':
        type === 'keyup' && this.setState({ x: this.state.x + 1 }); // tslint:disable-line
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Numpad2':
        type === 'keyup' && this.setState({ y: this.state.y + 1 }); // tslint:disable-line
        event.preventDefault();
        event.stopPropagation();
        break;
    }
  }
}

const Root = () => (
  <Provider store={store}>
    <React.StrictMode>
      <Routes/>
    </React.StrictMode>
  </Provider>
);

render(<Root/>, document.getElementById('react-root'));
