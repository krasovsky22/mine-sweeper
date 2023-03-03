import { createContext, useContext } from 'react';
import { types, Instance } from 'mobx-state-tree';

import Tile from '@models/Tile';
import { observe } from 'mobx';

const BOARD_SIZE = 16;
const NUMBER_OF_MINES = 36;
const MINUTES_FOR_COMPLETION = 40;

let minutesLeftTimer: number;
let secondsTimer: number;

const createRandomFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const BoardStore = types
  .model('Board', {
    size: types.number,
    number_of_mines: types.number,
    tiles: types.array(Tile),
    seconds_played: types.optional(types.number, 0),
    minutes_left: types.optional(types.number, MINUTES_FOR_COMPLETION),
    is_scary: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    toggleIsScary() {
      self.is_scary = !self.is_scary;
    },
    setSecondsPlayed(secondsPlayed: number) {
      self.seconds_played = secondsPlayed;
    },
    setMinutesLeft(minutesLeft: number) {
      self.minutes_left = minutesLeft;
    },
  }))
  .actions((self) => ({
    createTimers() {
      clearInterval(minutesLeftTimer);
      clearInterval(secondsTimer);

      self.minutes_left = MINUTES_FOR_COMPLETION;
      self.seconds_played = 0;

      minutesLeftTimer = setInterval(() => {
        self.setMinutesLeft(self.minutes_left - 1);
      }, 60000);

      secondsTimer = setInterval(() => {
        self.setSecondsPlayed(self.seconds_played + 1);
      }, 1000);
    },
  }))
  .actions((self) => ({
    beforeDestroy() {
      clearInterval(minutesLeftTimer);
      clearInterval(secondsTimer);
    },

    afterCreate() {
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

      self.createTimers();
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

      self.createTimers();
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
      return (
        self.number_of_mines <= 0 || self.tiles.some((tile) => tile.isExploded)
      );
    },

    get minutesLeft() {
      return self.minutes_left <= 0 ? 0 : self.minutes_left;
    },

    get secondsPlayed() {
      return self.seconds_played;
    },

    get gameIsWon() {
      const flaggedTiles = self.tiles.filter((tile) => tile.isMine);
      return (
        flaggedTiles.every((tile) => tile.isFlagged) &&
        flaggedTiles.length === self.number_of_mines
      );
    },

    get isScary() {
      return self.is_scary;
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

observe(initialState, ({ object }) => {
  if (object.gameIsLost) {
    secondsTimer && clearTimeout(secondsTimer);
    minutesLeftTimer && clearTimeout(minutesLeftTimer);
  }
});

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
