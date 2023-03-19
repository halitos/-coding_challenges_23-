export const quantumania = () => {
  let x = 4;
  let y = 4;
  let direction = 1;
  let pos = "4,4";

  const move = () => {
    setPosition(pos);

    setTimeout(() => {
      setNextPos();
      move();
    }, 2000);
  };

  const setPosition = (pos) => {
    let tile = document.getElementById(pos);
    setImgDir(tile);
    tile?.firstElementChild.classList.toggle("d-none");
    return tile;
  };

  const setNextPos = () => {
    setDirection();
    moveForward(direction);
  };

  const setDirection = () => {
    let tile = setPosition(pos);
    tile?.classList.contains("visited") ? turnRight() : turnLeft();
    tile?.classList.toggle("visited");
  };

  const moveForward = (direction) => {
    switch (direction) {
      case 1:
        y--;
        break;
      case 2:
        x++;
        break;
      case 3:
        y++;
        break;
      case 4:
        x--;
        break;
      default:
    }

    if (x > 9) {
      x = 0;
    } else if (x < 0) {
      x = 9;
    }
    if (y > 9) {
      y = 0;
    } else if (y < 0) {
      y = 9;
    }

    pos = `${x.toString()},${y.toString()}`;
  };

  const turnLeft = () => {
    direction--;
    if (direction < 1) direction = 4;
  };

  const turnRight = () => {
    direction++;
    if (direction > 4) direction = 1;
  };

  const setImgDir = (tile) => {
    if (direction === 2) {
      tile?.firstElementChild.classList.toggle("rotate-90");
    } else if (direction === 3) {
      tile?.firstElementChild.classList.toggle("rotate-180");
    } else if (direction === 4) {
      tile?.firstElementChild.classList.toggle("rotate--90");
    } else return;
  };

  move();
};
