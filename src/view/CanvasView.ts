import { Brick } from '../sprites/Brick';
import { Paddle } from '../sprites/Paddle';
import { Ball } from '../sprites/Ball';

export class CanvasView {//клас для малювання ігрового поля
  canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private scoreDisplay: HTMLObjectElement | null;
  private start: HTMLObjectElement | null;
  private info: HTMLObjectElement | null;

  constructor(canvasName: string) {
    this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
    this.scoreDisplay = document.querySelector('#score');
    this.start = document.querySelector('#start');
    this.info = document.querySelector('#info');
  }//конструктор для ініціалізації ігрвого поля

  clear(): void {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }//метод для очиски ігрового поля

  initStartButton(startFunction: (view: CanvasView) => void): void {
    this.start?.addEventListener('click', () => startFunction(this));
  }//метод для додавання на кнопку функції

  drawScore(score: number): void {
    if (this.scoreDisplay) this.scoreDisplay.innerHTML = score.toString();
  }//метод для малювання рахунку

  drawInfo(text: string): void {
    if (this.info) this.info.innerHTML = text;
  }//метод для малювання інформації

  drawSprite(brick: Brick | Paddle | Ball): void {//метод для малювання спрайтів
    if (!brick) return;//перевірка чи об'єкт існує

    this.context?.drawImage(//якщо існує то відмалюємо його
      brick.image,
      brick.pos.x,
      brick.pos.y,
      brick.width,
      brick.height
    );
  }

  drawBricks(bricks: Brick[]): void {//малювання камнів на полі
    bricks.forEach(brick => this.drawSprite(brick));
  }
}