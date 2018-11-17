import { from } from 'rxjs';
import { takeLast } from 'rxjs/operators';

import { messagesDimensions } from 'view-layer/consts/messages';

function* linesEmmitter(messages: string[]) {
  const messagesLeft = messages.slice();
  while (messagesLeft.length > 0) {
    const message = messagesLeft.shift();
    yield* lineEmmitter(message as string);
    if (messagesLeft.length > 0) {
      yield ''.padEnd(messagesDimensions.x); // an empty line between messages
    }
  }
}

function* lineEmmitter(message: string) {
  let leftOfMessage = message;
  while (true) {
    if (leftOfMessage.length <= messagesDimensions.x) {
      yield leftOfMessage.padEnd(messagesDimensions.x);
      return;
    }
    const line = leftOfMessage.slice(0, messagesDimensions.x);
    leftOfMessage = leftOfMessage.slice(messagesDimensions.x);
    yield line;
  }
}

export function messagesToLines(messages: string[]) {
  const lines: string[] = [];
  from(linesEmmitter(messages))
    .pipe(takeLast(messagesDimensions.y))
    .subscribe(line => lines.push(line));
  while (lines.length < messagesDimensions.y) {
    lines.push(''.padEnd(messagesDimensions.x));
  }
  return lines;
}
