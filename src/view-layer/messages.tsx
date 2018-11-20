import * as React from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import { MessagesModule } from 'redux/modules';
import { messagesToLines } from './utils';

type Props = {
  tick: number,
  messages: string[],
};

class Messages extends React.Component<Props> {
  public render() {
    const { messages } = this.props;
    const lines = messagesToLines(messages);

    return (
      <pre className="map">
        <div style={{ backgroundColor: 'white' }}> </div>
        {lines.map((line, index) => (
          <div key={index}>
            {line.split('').map((c: string, i) => <span key={i}>{c}</span>)}
          </div>
        ))}
      </pre>
    );
  }
}

const mapStateToProps = (state: any) => ({
  messages: MessagesModule.selectors.messages(state),
});

export default connect(mapStateToProps)(Messages as any);
