(function() {
  var Game = React.createClass({
    getInitialState: function () {
      return {
        board: new Minesweeper.Board(10, 10),
        over: false,
        won: false
      };
    },
    updateGame: function () {

    },
    render: function () {
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
                              update={that.updateGame} />
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
    render: function () {
      var t = this.props.tile;
      var cls = 'tile';
      var text = ' ';

      if (t.explored) {
        cls += ' explored' + (t.bombed ? ' bombed' : '');
        text = t.adjacentBombCount() || ' ';
      }

      if (t.flagged) {
        cls += ' flagged';
        text = 'F';
      }

      return (
        <span className={cls}>{text}</span>
      );
    }
  });

  React.render(<Game />, document.getElementById('game'));
})();
