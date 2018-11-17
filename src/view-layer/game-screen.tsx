import * as React from 'react';
import { connect } from 'react-redux';
import * as uuid from 'uuid/v4';
import 'semantic-ui-css/semantic.min.css';

import { PlayerModule, MapModule, EnemiesModule } from 'redux/modules';
import { Pos } from 'types';
import { mapSize } from 'constants/map';
import { Matrix } from 'utils';
import mapTileToJSX from './map-tile-to-jsx';
import enemyTypeToJSX from './enemy-type-to-jsx';
import 'styles/global';

type Props = {
  map: Matrix,
  pos: Pos,
  enemies: Matrix,
};

class GameScreen extends React.Component<Props> {
  public render() {
    const { map, enemies } = this.props;
    const grid = Array(mapSize.y).fill(0).map(() => Array(mapSize.x).fill('X'));

    for (let y = 0; y < mapSize.y; y++) {
      for (let x = 0; x < mapSize.x; x++) {
        const enemy = enemies.get(x, y);
        if (x === this.props.pos.x && y === this.props.pos.y) {
          grid[y][x] = '@';
        } else if (enemy) {
          grid[y][x] = enemyTypeToJSX(enemy.type);
        } else {
          grid[y][x] = mapTileToJSX(map.get(x, y));
        }
      }
    }

    return (
      <pre className="map">
        {this.renderXCoordinates()}
        {grid.map((row, index) => (
          <div key={uuid()}>
            {row.map((c: string) => <span key={uuid()}>{c}</span>)}
            {this.renderYCoordinate(index)}
          </div>
        ))}
      </pre>
    );
  }

  private renderXCoordinates() {
    return (
      <div>
        {Array(mapSize.x).fill(0).map((_, index) => index).filter(index => index % 3 === 0)
          .map(index => <span key={index} style={{ color: 'black', backgroundColor: 'white' }}>
            {`${index}`.padStart(2, '0').padEnd(3)}
          </span>)
        }
      </div>
    );
  }

  private renderYCoordinate(index: number) {
    return (
      <span style={{ color: 'black', backgroundColor: 'white' }}>
        {`${index}`.padStart(2, '0').padEnd(3)}
      </span>
    );
  }
}

const mapStateToProps = (state: any) => ({
  enemies: EnemiesModule.selectors.enemiesAsMatrix(state),
  map: MapModule.selectors.map(state),
  pos: PlayerModule.selectors.position(state),
});

export default connect(mapStateToProps)(GameScreen as any);
