# Langton's Ant

https://en.wikipedia.org/wiki/Langton's_ant

Langton's Ant is a cellular automaton that moves around a two-dimensional grid of black and white cells. The ant can face one of four different directions - north, south, east or west. At each step of the simulation the ant will decide where to move - if the ant is currently on a black cell then it turns 90 degrees to the right and moves forward one cell . Similarly, if the ant is on a white cell then it turns 90 degrees to the left and moves forward one cell. Whenever the ant leaves a cell, it inverts the colour of that cell

## About

Deployed to Vercel: https://langton-s-ant.vercel.app/

**Start** button activates Antman and he moves to next tile every **2 seconds** :ant: :ant:

:heavy_exclamation_mark: The grid won't expand when Antman tries to move out of the scope.<br>
He will be sucked to quantum realm instead and teleport to other side of the grid. :grin:

- The canvas solution works per pixel.<br>
  The ant moves in 2D array grid, with x-y coordinates and invert each pixel's fillStyle.

- The Antman solution made with Vue JS.<br>
  Similar 2D array used to create grids with id names of 'x,y'
  Antman moves based on toggled classes

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
