export const ant = () => {
  let canvas = document.getElementById("grid-canvas");
  let ctx = canvas.getContext("2d");

  const makeGridArray = (cols, rows) => {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  };

  const grid = makeGridArray(canvas.width, canvas.height);

  const Ant = {
    x: 0,
    y: 0,
    direction: 1,
    turnLeft() {
      this.direction--;
      if (this.direction < 1) this.direction = 4;
    },
    turnRight() {
      this.direction++;
      if (this.direction > 4) this.direction = 1;
    },
    moveForward(dir) {
      switch (dir) {
        case 1:
          ant.y--;
          break;
        case 2:
          ant.x++;
          break;
        case 3:
          ant.y++;
          break;
        case 4:
          ant.x--;
          break;
        default:
      }

      if (ant.x > canvas.width - 1) {
        ant.x = 0;
      } else if (ant.x < 0) {
        ant.x = canvas.width - 1;
      }
      if (ant.y > canvas.height - 1) {
        ant.y = 0;
      } else if (ant.y < 0) {
        ant.y = canvas.height - 1;
      }
    },
  };

  const ant = Object.create(Ant);
  ant.x = canvas.width / 2;
  ant.y = canvas.height / 2;

  ant.direction = 4;

  const start = () => {
    const cell = grid[ant.x][ant.y];

    if (cell === 0) {
      ctx.fillStyle = "black";
      ctx.fillRect(ant.x, ant.y, 1, 1);
      ant.turnRight();
      grid[ant.x][ant.y] = 1;
    } else {
      ctx.fillStyle = "white";
      ctx.fillRect(ant.x, ant.y, 1, 1);
      ant.turnLeft();
      grid[ant.x][ant.y] = 0;
    }

    ant.moveForward(ant.direction);

    setTimeout(start, 4);
  };

  start();
};
