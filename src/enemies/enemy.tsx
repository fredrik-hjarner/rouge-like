import { Pos } from 'types';

export type Enemy = {
  hp: number,
  pos: Pos,
  render: () => JSX.Element,
  AI: () => void,
};
