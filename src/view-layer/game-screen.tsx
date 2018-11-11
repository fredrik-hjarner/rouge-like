import * as React from 'react';
import { connect } from 'react-redux';
import { padEnd, padStart } from 'lodash';
import 'semantic-ui-css/semantic.min.css';

import { PlayerModule } from 'redux/modules';
import { Pos, Direction } from 'types';
import { map } from 'maps/level2';
import enemies from 'enemies';
import mapTileToJSX from 'view-layer/map-tile-to-jsx';
import 'styles/global';

type Props = {
  pos: Pos,
  move: (direction: Direction) => void,
};

class GameScreen extends React.Component<Props> {
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
          grid[y][x] = mapTileToJSX(map.at(x, y));
        }
      }
    }

    return (
      <pre className="map">
        {this.renderXCoordinates()}
        {grid.map((row, index) => (
          <div>
            {row.map((c: string) => <span>{c}</span>)}
            {this.renderYCoordinate(index)}
          </div>
        ))}
      </pre>
    );
  }

  private renderXCoordinates() {
    return (
      <div>
        {Array(map.width).fill(0).map((_, index) => index).filter(index => index % 3 === 0)
          .map(index => <span style={{ color: 'black', backgroundColor: 'white' }}>
            {padEnd(padStart(`${index}`, 2, '0'), 3)}
          </span>)
        }
      </div>
    );
  }

  private renderYCoordinate(index: number) {
    return (
      <span style={{ color: 'black', backgroundColor: 'white' }}>
        {padEnd(padStart(`${index}`, 2, '0'), 3)}
      </span>
    );
  }

  private keyup = (event: KeyboardEvent) => {
    const { type } = event;
    switch (event.code) {
      case 'Numpad4':
        type === 'keyup' && this.props.move('WEST'); // tslint:disable-line
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Numpad8':
        type === 'keyup' && this.props.move('NORTH'); // tslint:disable-line
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Numpad6':
        type === 'keyup' && this.props.move('EAST'); // tslint:disable-line
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Numpad2':
        type === 'keyup' && this.props.move('SOUTH'); // tslint:disable-line
        event.preventDefault();
        event.stopPropagation();
        break;
    }
  }
}

const mapStateToProps = (state: any) => ({
  pos: PlayerModule.selectors.position(state),
});

const mapDispatchToProps = ({
  move: PlayerModule.actions.move,
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen as any);
