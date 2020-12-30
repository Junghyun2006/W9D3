class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", "li", event => {
      const $li = $(event.target);
      this.makeMove($li)
    });
  }

  makeMove($li) {
    let pos = $li.data("pos");
    this.game.playMove(pos);
    let mark = this.game.board.grid[pos[0]][pos[1]];
    $li.text(mark);
    $li.addClass(mark)

    if (this.game.isOver()) {
      if (this.game.winner()) {
        // alert(`Player ${this.game.winner()} Wins!`)
        $(`.${mark}`).css({"background": "green"})
      } else {
        alert("It's a Draw!")
      }
    }
  }

  setupBoard() {
    const $ul = $("<ul>");

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let $li = $("<li>");
        $li.data({ "pos": [i, j] });
        
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }
}

module.exports = View;
