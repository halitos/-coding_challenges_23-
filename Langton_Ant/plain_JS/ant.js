const canvas = document.getElementById("canvas");
const surface = canvas.getContext("2d");
surface.fillStyle = "rgba(0, 0, 0, 1)";

const AntClass = {
  x: 0,
  y: 0,
  vector: 1,
  turnLeft() {
    this.vector--;
    if (this.vector < 1) this.vector = 4;
    this.move(this.vector);
  },
  turnRight() {
    this.vector++;
    if (this.vector > 4) this.vector = 1;
    this.move(this.vector);
  },
  move(dir) {
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
  },
};

const ant = Object.create(AntClass);
ant.x = Math.round(canvas.width / 2);
ant.y = Math.round(canvas.height / 2);
ant.vector = 1;

const start = () => {
  const color = surface.getImageData(ant.x, ant.y, 1, 1);
  const red = color.data[0];
  if (red > 100) {
    surface.fillStyle = "rgba(0, 0, 0, 1)";
    surface.fillRect(ant.x, ant.y, 1, 1);
    ant.turnLeft();
  } else {
    surface.fillStyle = "rgba(255, 255, 255, 1)";
    surface.fillRect(ant.x, ant.y, 1, 1);
    ant.turnRight();
  }

  //
  window.setTimeout(start, 1);
};

window.addEventListener("load", start, false);
