import { Brick } from './sprites/Brick';
import { Paddle } from './sprites/Paddle';
import { Ball } from './sprites/Ball';
import { CanvasView } from './view/CanvasView';

export class Collision {//клас для колізій
  isCollidingBrick(ball: Ball, brick: Brick): boolean {
    if (
      ball.pos.x < brick.pos.x + brick.width &&
      ball.pos.x + ball.width > brick.pos.x &&//перевірка зіткнення м'яча по x
      ball.pos.y < brick.pos.y + brick.height &&
      ball.pos.y + ball.height > brick.pos.y//перевірка зіткнення м'яча по y
    ) {
      return true;//повернення true якщо зіткнення було
    }
    return false;//повернення false якщо зіткнення було
  }

  isCollidingBricks(ball: Ball, bricks: Brick[]): boolean {//перевірка зіткнення з камнями
    let colliding = false;//створюємо зміну для збереження інформації про зіткення, по замовчуванню ініціалізуємо зміну як false

    bricks.forEach((brick, i) => {//проходимося по масиву камнів, для кожного виконуємо  базове ініціалізування
      if (this.isCollidingBrick(ball, brick)) {//перевірка чи камень зіткнувся з м'ячем
        ball.changeYDirection();//моделюємо рікошет від камня

        if (brick.energy === 1) {//якщо енергія рівна одиницю то видаляємо камень
          bricks.splice(i, 1);
        } else {
          brick.energy -= 1;//якщо ні, то просто видаляємо від енергії камня 1
        }
        colliding = true;//визначаємо, що зіткнення відбулося
      }
    });
    return colliding;//повертаємо інформацію про зіткнення
  }

  checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
    if (
      ball.pos.x + ball.width > paddle.pos.x &&
      ball.pos.x < paddle.pos.x + paddle.width &&
      ball.pos.y + ball.height === paddle.pos.y//перевірка чи м'яч зіткнувся з платформою
    ) {
      ball.changeYDirection();//якщо так, то моделюємо рікошет
    }
    if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0) {//перевірка чи м'яч зіткнувся зі стінками бококовими
      ball.changeXDirection();//якщо так, то моделюємо рікошет
    }
    if (ball.pos.y < 0) {//перевірка чи м'яч зіткнувся з верехньою стінкою
      ball.changeYDirection();//якщо так, то моделюємо рікошет
    }
  }
}