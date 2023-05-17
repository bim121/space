import { Vector } from '../types';

export class Ball {//класів для м'яча
  private speed: Vector;
  private ballImage: HTMLImageElement = new Image();

  constructor(
    speed: number,
    private ballSize: number,
    private position: Vector,
    image: string
  ) {
    this.ballSize = ballSize;
    this.position = position;
    this.speed = {
      x: speed,
      y: -speed
    };
    this.ballImage.src = image;
  }//ініціалізація м'яча

  get width(): number {
    return this.ballSize;
  }//гетер для ширини

  get height(): number {
    return this.ballSize;
  }//гетер для висоти

  get pos(): Vector {
    return this.position;
  }//гетер для позиції

  get image(): HTMLImageElement {
    return this.ballImage;
  }//гетер для картинки

  changeYDirection(): void {
    this.speed.y = -this.speed.y;
  }//метод для зміни руху по y на протилежне значення, потрібний для моделювання рікошету

  changeXDirection(): void {
    this.speed.x = -this.speed.x;
  }//метод для зміни руху по x на протилежне значення, потрібний для моделювання рікошету

  moveBall(): void {
    this.pos.x += this.speed.x;//зміна положення по x
    this.pos.y += this.speed.y;//зміна положення по y
  }//метод для руху м'яча
}