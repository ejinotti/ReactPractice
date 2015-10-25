(function() {
  var Game = React.createClass({
    getInitialState: function () {
      return {
        board: new Minesweeper.Board(10, 10),
        over: false,
        won: false
      };
    },
    updateGame: function (pos, flagging) {
      var tile = this.state.board.grid[pos[0]][pos[1]];

      if (flagging) {
        tile.toggleFlag();
      } else {
        tile.explore();
      }

      var won = this.state.board.won();
      var over = won || this.state.board.lost();

      this.setState({over: over, won: won});
    },
    render: function () {
      if (this.state.over) {
        alert('game over: ' + (this.state.won ? 'Victory!' : 'Defeat!'));
        location.reload();
      }
      return (
        <Board board={this.state.board} update={this.updateGame} />
      );
    }
  });

  var Board = React.createClass({
    render: function () {
      var that = this;

      return (
        <div className="board">
          {
            this.props.board.grid.map(function (row, i) {
              return (
                <div key={i} className="row">
                  {
                    row.map(function (tile, j) {
                      return (
                        <Tile key={j}
                              tile={tile}
                              position={[i,j]}
                              update={that.props.update} />
                      );
                    })
                  }
                </div>
              );
            })
          }
        </div>
      );
    }
  });

  var Tile = React.createClass({
    handleClick: function (e) {
      this.props.update(this.props.position, e.altKey);
    },
    render: function () {
      var t = this.props.tile;
      var cls = 'tile';
      var text = '';

      if (t.explored) {
        cls += ' explored' + (t.bombed ? ' bombed' : '');
        text = t.adjacentBombCount() || '';
      }

      if (t.flagged) {
        cls += ' flagged';
        text = 'F';
      }

      return (
        <span className={cls} onClick={this.handleClick}>{text}</span>
      );
    }
  });

  React.render(<Game />, document.getElementById('game'));
})();
