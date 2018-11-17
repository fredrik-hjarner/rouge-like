import * as React from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import { PlayerModule, MapModule, EnemiesModule, GameLoopModule, ItemsModule } from 'redux/modules';
import { Pos, Item } from 'types';
import { mapSize } from 'constants/map';
import { Matrix } from 'utils';
import mapTileToJSX from './map-tile-to-jsx';
import enemyToJSX from './enemy-to-jsx';
import itemToJSX from './item-to-jsx';
import 'styles/global';

type Props = {
  map: Matrix,
  pos: Pos,
  enemies: Matrix,
  tick: number,
  isItemAtPos: Function,
};

class GameScreen extends React.Component<Props> {
  public shouldComponentUpdate(nextProps: Props) {
    const prevTick = this.props.tick;
    const nextTick = nextProps.tick;
    return prevTick !== nextTick;
  }

  public render() {
    const { map, enemies, isItemAtPos } = this.props;
    const grid = Array(mapSize.y).fill(0).map(() => Array(mapSize.x).fill('X'));

    for (let y = 0; y < mapSize.y; y++) {
      for (let x = 0; x < mapSize.x; x++) {
        const enemy = enemies.get(x, y);
        const item = isItemAtPos({ x, y });
        if (x === this.props.pos.x && y === this.props.pos.y) {
          grid[y][x] = '@';
        } else if (enemy) {
          grid[y][x] = enemyToJSX(enemy);
        } else if (item) {
          grid[y][x] = itemToJSX(item);
        } else {
          grid[y][x] = mapTileToJSX(map.get(x, y));
        }
      }
    }

    return (
      <pre className="map">
        {this.renderXCoordinates()}
        {grid.map((row, index) => (
          <div key={index}>
            {row.map((c: string, i) => <span key={i}>{c}</span>)}
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
  isItemAtPos: (pos: Pos): Item | undefined => ItemsModule.selectors.isItemAtPos(pos)(state),
  map: MapModule.selectors.map(state),
  pos: PlayerModule.selectors.position(state),
  tick: GameLoopModule.selectors.tick(state),
});

export default connect(mapStateToProps)(GameScreen as any);
