import { Vector } from '../types';

export class Paddle {//клас для платформи
  private paddleImage: HTMLImageElement = new Image();
  private moveLeft: boolean;
  private moveRight: boolean;

  constructor(
    private speed: number,
    private paddleWidth: number,
    private paddleHeight: number,
    private position: Vector,
    image: string
  ) {
    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.position = position;
    this.moveLeft = false;
    this.moveRight = false;
    this.paddleImage.src = image;

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }//конструктор для ініціалізування платформи

  get width(): number {
    return this.paddleWidth;
  }//гетер для width

  get height(): number {
    return this.paddleHeight;
  }//гетер для height

  get pos(): Vector {
    return this.position;
  }//гетер для pos

  get image(): HTMLImageElement {
    return this.paddleImage;
  }//гетер для image

  get isMovingLeft(): boolean {
    return this.moveLeft;
  }//гетер для чи рухається платформа вліво

  get isMovingRight(): boolean {
    return this.moveRight;//гетер для чи рухається платформа вправо
  }

  movePaddle(): void {
    if (this.moveLeft) this.pos.x -= this.speed;//якщо вліво рухається, то зменшуємо координату x
    if (this.moveRight) this.pos.x += this.speed;//якщо вправо рухається, то збільшуємо координату x
  }//метод для руху платформи

  handleKeyUp = (e: KeyboardEvent): void => {//метод для оброки переставання нажаття кнопки
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') this.moveLeft = false;//якщо кнопка стілочка вліво була на клавіатурі то перестаємо рухатися вліво
    if (e.code === 'ArrowRight' || e.key === 'ArrowRight') this.moveRight = false;//якщо кнопка стілочка вправо була на клавіатурі то перестаємо рухатися вправо
  };

  handleKeyDown = (e: KeyboardEvent): void => {//метод для оброки нажаття кнопки
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') this.moveLeft = true;//якщо кнопка стілочка вліво була на клавіатурі то рухатися вліво
    if (e.code === 'ArrowRight' || e.key === 'ArrowRight') this.moveRight = true;//якщо кнопка стілочка вправо була на клавіатурі то рухатися вправо
  };
}