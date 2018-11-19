import * as React from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import { GameLoopModule, MessagesModule } from 'redux/modules';
import { statusDimensions } from './consts/status';

type Props = {
  tick: number,
  messages: string[],
};

class Messages extends React.Component<Props> {
  public shouldComponentUpdate(nextProps: Props) {
    const prevTick = this.props.tick;
    const nextTick = nextProps.tick;
    return prevTick !== nextTick;
  }

  public render() {
    const hpString = `hp: ${10}`.padEnd(statusDimensions.x);
    const xpString = `xp: ${0}`.padEnd(statusDimensions.x);
    const levelString = `level: ${1}`.padEnd(statusDimensions.x);
    return (
      <pre className="map">
        <div>
          {''.padEnd(statusDimensions.x).split('').map(char => <span>{char}</span>)}
        </div>
        <div>
          {Array.from(hpString).map(char => <span>{char}</span>)}
        </div>
        <div>
          {Array.from(xpString).map(char => <span>{char}</span>)}
        </div>
        <div>
          {Array.from(levelString).map(char => <span>{char}</span>)}
        </div>
      </pre>
    );
  }
}

const mapStateToProps = (state: any) => ({
  messages: MessagesModule.selectors.messages(state),
  tick: GameLoopModule.selectors.tick(state),
});

export default connect(mapStateToProps)(Messages as any);
