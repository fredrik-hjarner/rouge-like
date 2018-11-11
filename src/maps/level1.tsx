// tslint:disable
const map1 = `
                                                                             
  _____________________             _______           __________________     
  |...................|            |......|                                  
  |....................#######     |......|                                  
  |___________________|      ######.......|                                  
                                   |___.__|                                  
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
`;
// tslint:enable

class Map {
  private grid = map1.split('\n').slice(1, -2).map(row => row.split(''));

  public at(x: number, y: number): string {
    return this.grid[y][x];
  }
}

export const map = new Map();
