import { CanvasView } from './view/CanvasView';
import { Ball } from './sprites/Ball';
import { Brick } from './sprites/Brick';
import { Paddle } from './sprites/Paddle';
import PADDLE_IMAGE from './images/paddle.png';
import BALL_IMAGE from './images/ball.png';
import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY
} from './setup';
import { createBricks } from './helpers';
import { Collision } from './Collision';


let gameOver = false;//зміна яка буде зберігати інформацію про кінець гри
let score = 0;//зміна яка буде зберігати інформацію про рахунок в грі

function setGameOver(view: CanvasView) {//функція для кінця гри
  gameOver = false;//ставимо що гра була закінчена
}

function setGameWin(view: CanvasView) {
  view.drawInfo('Game Won!');//вивидимо інформацію, що гра була виграна
  gameOver = false;//ставимо що гра була закінчена
}

function gameLoop(//функція для цикла гри
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle,
  ball: Ball,
  collision: Collision
) {
  console.log('draw!');
  view.clear();//очищення ігрового поля
  view.drawBricks(bricks);//малювання камнів на полі
  view.drawSprite(paddle);//малювання платформи на полі
  view.drawSprite(ball);//малювання м'яча на полі

  ball.moveBall();//починаємо рух м'яча

  if (
    (paddle.isMovingLeft && paddle.pos.x > 0) ||//перевірка чи може зараз платформа рухатися вліво і чи не вийшла за межі
    (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)//перевірка чи може зараз платформа рухатися вправо і чи не вийшла за межі
  ) {
    paddle.movePaddle();//якщо можна рхуватися хоча в одну сторону і гравець прагне йти в ту сторону, то дозволяємо рух платформи
  }

  collision.checkBallCollision(ball, paddle, view);//перевірка колізій м'яча, платформи, та поля
  const collidingBrick = collision.isCollidingBricks(ball, bricks);//перевірка зіткнення м'яча і камнів

  if (collidingBrick) {//якщо зіткнення з камнем було, то
    score += 1//додаємо до рахунку +1
    view.drawScore(score);//оновлюємо рахунок
  }

  if (ball.pos.y > view.canvas.height) gameOver = true;//якщо м'яч улетів за поле, то ставимо кінець гри
  if (bricks.length === 0) return setGameWin(view);//якщо камнів на полі не залишилося то визначаємо перемогу в грі
  if (gameOver) return setGameOver(view);//якщо зміна gameOver true, то ми виконуємо завершення гри

  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));//малювання анімацій камнів, платформи, м'яча і колізій
}

function startGame(view: CanvasView) {
  score = 0;//ініціалізуємо зміну рахунку
  view.drawInfo('');//малювання інформації
  view.drawScore(0);//малювання рахунку
  const collision = new Collision();//ініціалізація колізії
  const bricks = createBricks();//створення камнів
  const ball = new Ball(
    BALL_SPEED,
    BALL_SIZE,
    { x: BALL_STARTX, y: BALL_STARTY },
    BALL_IMAGE
  );//створення нового м'яча на полі
  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    {
      x: PADDLE_STARTX,
      y: view.canvas.height - PADDLE_HEIGHT - 5
    },
    PADDLE_IMAGE
  );//створення нової платформи на полі

  gameLoop(view, bricks, paddle, ball, collision);//виконання функції ігрового цикла
}

const view = new CanvasView('#playField');//Створення ігрового поля
view.initStartButton(startGame);//ініціалізація  кнопки початку гри і прив'язка функції до цієї кнопки