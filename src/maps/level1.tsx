// const mapSize = { width: 77, height: 19 };

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
  public width = 77;
  public height = 19;

  private grid = map1.split('\n').slice(1, -2).map(row => row.split(''));

  public at(x: number, y: number): string {
    return this.grid[y][x];
  }
}

export const map = new Map();
