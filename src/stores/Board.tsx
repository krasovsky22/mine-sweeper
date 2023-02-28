import { createContext, useContext } from 'react';
import { types, Instance, destroy } from 'mobx-state-tree';

import Tile from '@models/Tile';

const BOARD_SIZE = 16;
const NUMBER_OF_MINES = 36;

const createRandomFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const BoardStore = types
  .model('Board', {
    size: types.number,
    number_of_mines: types.number,
    tiles: types.array(Tile),
  })
  .actions((self) => ({
    initialize() {
      // will initialize rows and tiles for each row
      const randomMinesIndexes: number[] = Array.from(
        {
          length: self.number_of_mines,
        },
        () => createRandomFromInterval(0, self.size * self.size)
      );

      let index = 0;
      Array.from({ length: self.size }, (v, i) => i).forEach((k) => {
        Array.from({ length: self.size }, (v, i) => i).forEach((j) => {
          self.tiles.push({
            id: `${k}-${j}`,
            isMine: randomMinesIndexes.includes(index),
          });
          index += 1;
        });
      });
    },
  }))
  .actions((self) => ({
    resetGame() {
      const randomMinesIndexes: number[] = Array.from(
        {
          length: self.number_of_mines,
        },
        () => createRandomFromInterval(0, self.size * self.size)
      );

      self.tiles.forEach((tile, index) => {
        tile.reset(randomMinesIndexes.includes(index));
      });
    },
  }))
  .views((self) => ({
    findTile(rowId: number, colId: number) {
      if (rowId < 0 || colId < 0) {
        return null;
      }

      if (rowId >= self.size || colId >= self.size) {
        return null;
      }

      return self.tiles.find((tile) => tile.id === `${rowId}-${colId}`) ?? null;
    },

    get gameIsLost() {
      return self.tiles.some((tile) => tile.isExploded);
    },

    get gameIsWon() {
      return (
        self.tiles
          // game is won when every closed tile is a mine
          .filter((tile) => !tile.isOpened)
          .every((tile) => tile.isMine)
      );
    },
  }))
  .views((self) => ({
    get actionsDisabled() {
      return self.gameIsWon || self.gameIsLost;
    },
  }));

let initialState = BoardStore.create({
  size: BOARD_SIZE,
  number_of_mines: NUMBER_OF_MINES,
});

initialState.initialize();

export const boardStore = initialState;
export type BoardInstance = Instance<typeof BoardStore>;
const BoardStoreContext = createContext<null | BoardInstance>(null);

export const Provider = BoardStoreContext.Provider;

export function useMst() {
  const store = useContext(BoardStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
