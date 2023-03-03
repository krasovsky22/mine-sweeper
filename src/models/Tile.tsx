import { BoardInstance } from '@stores/Board';
import {
  getParent,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree';

const Tile = types
  .model({
    id: types.identifier,
    isMine: types.optional(types.boolean, false),

    isOpened: types.optional(types.boolean, false),
    isFlagged: types.optional(types.boolean, false),
  })

  .views((self) => ({
    get leftTopCell(): TileType | null {
      const [rowId, colId] = self.id.split('-');
      const boardStore = getParent<BoardInstance>(self, 2);

      return boardStore.findTile(+rowId - 1, +colId - 1);
    },

    get leftCell(): TileType | null {
      const [rowId, colId] = self.id.split('-');
      const boardStore = getParent<BoardInstance>(self, 2);

      return boardStore.findTile(+rowId, +colId - 1);
    },

    get leftBottomCell(): TileType | null {
      const [rowId, colId] = self.id.split('-');
      const boardStore = getParent<BoardInstance>(self, 2);

      return boardStore.findTile(+rowId + 1, +colId - 1);
    },

    get topCell(): TileType | null {
      const [rowId, colId] = self.id.split('-');
      const boardStore = getParent<BoardInstance>(self, 2);

      return boardStore.findTile(+rowId - 1, +colId);
    },

    get bottomCell(): TileType | null {
      const [rowId, colId] = self.id.split('-');
      const boardStore = getParent<BoardInstance>(self, 2);

      return boardStore.findTile(+rowId + 1, +colId);
    },

    get rightTopCell(): TileType | null {
      const [rowId, colId] = self.id.split('-');
      const boardStore = getParent<BoardInstance>(self, 2);

      return boardStore.findTile(+rowId - 1, +colId + 1);
    },

    get rightCell(): TileType | null {
      const [rowId, colId] = self.id.split('-');
      const boardStore = getParent<BoardInstance>(self, 2);

      return boardStore.findTile(+rowId, +colId + 1);
    },

    get rightBottomCell(): TileType | null {
      const [rowId, colId] = self.id.split('-');
      const boardStore = getParent<BoardInstance>(self, 2);

      return boardStore.findTile(+rowId + 1, +colId + 1);
    },
  }))
  .views((self) => ({
    get isExploded() {
      return self.isOpened && self.isMine;
    },

    get isOpenedSuccessfully() {
      return self.isOpened && !self.isMine;
    },

    get neighborMinesCount() {
      if (self.isMine) {
        return -1;
      }

      let count = 0;

      if (self.leftTopCell?.isMine) {
        count++;
      }

      if (self.leftCell?.isMine) {
        count++;
      }

      if (self.leftBottomCell?.isMine) {
        count++;
      }

      if (self.topCell?.isMine) {
        count++;
      }

      if (self.bottomCell?.isMine) {
        count++;
      }

      if (self.rightTopCell?.isMine) {
        count++;
      }

      if (self.rightCell?.isMine) {
        count++;
      }

      if (self.rightBottomCell?.isMine) {
        count++;
      }

      return count;
    },
  }))
  .actions((self) => ({
    reset(isMine = false) {
      self.isOpened = false;
      self.isMine = isMine;
      self.isFlagged = false;
    },
    toggleIsFlagged() {
      self.isFlagged = !self.isFlagged;
    },
    openTile() {
      if (self.isOpened) {
        return;
      }
      self.isOpened = true;

      if (self.neighborMinesCount === 0) {
        if (self.leftTopCell?.neighborMinesCount === 0) {
          self.leftTopCell.openTile();
        }

        if (self.leftCell?.neighborMinesCount === 0) {
          self.leftCell.openTile();
        }

        if (self.leftBottomCell?.neighborMinesCount === 0) {
          self.leftBottomCell.openTile();
        }

        if (self.topCell?.neighborMinesCount === 0) {
          self.topCell.openTile();
        }

        if (self.bottomCell?.neighborMinesCount === 0) {
          self.bottomCell.openTile();
        }

        if (self.rightTopCell?.neighborMinesCount === 0) {
          self.rightTopCell.openTile();
        }

        if (self.rightCell?.neighborMinesCount === 0) {
          self.rightCell.openTile();
        }

        if (self.rightBottomCell?.neighborMinesCount === 0) {
          self.rightBottomCell.openTile();
        }
      }
    },
  }));

export default Tile;

export interface TileType extends Instance<typeof Tile> {}
export interface TileTypeSnapshotIn extends SnapshotIn<typeof Tile> {}
export interface TileTypeSnapshotOut extends SnapshotOut<typeof Tile> {}
