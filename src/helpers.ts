import { Brick } from './sprites/Brick';
import {
  BRICK_IMAGES,
  LEVEL,
  STAGE_COLS,
  STAGE_PADDING,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_PADDING,
  BRICK_ENERGY
} from './setup';

export function createBricks(): Brick[] {//метод для створення камнів
  return LEVEL.reduce((ack, element, i) => {
    const row = Math.floor((i + 1) / STAGE_COLS);//визначення рядка камнів
    const col = i % STAGE_COLS;//визначення колонки камнів

    const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);//визначення координати x для камня
    const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);//визначення координати y для камня

    if (element === 0) return ack;//якщо в масиві LEVEL буде 0, то камень не створюємо

    return [//в іншому випадку створюємо камень відповідно до цифри в масиві LEVEL
      ...ack,
      new Brick(
        BRICK_WIDTH,
        BRICK_HEIGHT,
        { x, y },
        BRICK_ENERGY[element],
        BRICK_IMAGES[element]
      )
    ];
  }, [] as Brick[]);//повертаємо результат як масив камнів
}