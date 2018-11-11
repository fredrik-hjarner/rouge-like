import * as React from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import { PlayerModule } from 'redux/modules';
import { Direction } from 'types';
import { GameScreen } from 'view-layer';
import 'styles/global';

type Props = {
  move: (direction: Direction) => void,
};

class GameScreenContainer extends React.Component<Props> {
  public componentDidMount() {
    window.addEventListener('keydown', this.keyup, true);
    window.addEventListener('keyup', this.keyup, true);
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.keyup, true);
    window.removeEventListener('keyup', this.keyup, true);
  }

  public render() {
    return <GameScreen/>;
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

const mapDispatchToProps = ({
  move: PlayerModule.actions.move,
});

export default connect(null, mapDispatchToProps)(GameScreenContainer as any);
