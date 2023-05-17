// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"view/CanvasView.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasView = void 0;

var CanvasView =
/** @class */
function () {
  function CanvasView(canvasName) {
    this.canvas = document.querySelector(canvasName);
    this.context = this.canvas.getContext('2d');
    this.scoreDisplay = document.querySelector('#score');
    this.start = document.querySelector('#start');
    this.info = document.querySelector('#info');
  } //конструктор для ініціалізації ігрвого поля


  CanvasView.prototype.clear = function () {
    var _a;

    (_a = this.context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }; //метод для очиски ігрового поля


  CanvasView.prototype.initStartButton = function (startFunction) {
    var _this = this;

    var _a;

    (_a = this.start) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
      return startFunction(_this);
    });
  }; //метод для додавання на кнопку функції


  CanvasView.prototype.drawScore = function (score) {
    if (this.scoreDisplay) this.scoreDisplay.innerHTML = score.toString();
  }; //метод для малювання рахунку


  CanvasView.prototype.drawInfo = function (text) {
    if (this.info) this.info.innerHTML = text;
  }; //метод для малювання інформації


  CanvasView.prototype.drawSprite = function (brick) {
    var _a;

    if (!brick) return; //перевірка чи об'єкт існує

    (_a = this.context) === null || _a === void 0 ? void 0 : _a.drawImage( //якщо існує то відмалюємо його
    brick.image, brick.pos.x, brick.pos.y, brick.width, brick.height);
  };

  CanvasView.prototype.drawBricks = function (bricks) {
    var _this = this;

    bricks.forEach(function (brick) {
      return _this.drawSprite(brick);
    });
  };

  return CanvasView;
}();

exports.CanvasView = CanvasView;
},{}],"sprites/Ball.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = void 0;

var Ball =
/** @class */
function () {
  function Ball(speed, ballSize, position, image) {
    this.ballSize = ballSize;
    this.position = position;
    this.ballImage = new Image();
    this.ballSize = ballSize;
    this.position = position;
    this.speed = {
      x: speed,
      y: -speed
    };
    this.ballImage.src = image;
  } //ініціалізація м'яча


  Object.defineProperty(Ball.prototype, "width", {
    get: function get() {
      return this.ballSize;
    } //гетер для ширини
    ,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "height", {
    get: function get() {
      return this.ballSize;
    } //гетер для висоти
    ,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "pos", {
    get: function get() {
      return this.position;
    } //гетер для позиції
    ,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "image", {
    get: function get() {
      return this.ballImage;
    } //гетер для картинки
    ,
    enumerable: false,
    configurable: true
  });

  Ball.prototype.changeYDirection = function () {
    this.speed.y = -this.speed.y;
  }; //метод для зміни руху по y на протилежне значення, потрібний для моделювання рікошету


  Ball.prototype.changeXDirection = function () {
    this.speed.x = -this.speed.x;
  }; //метод для зміни руху по x на протилежне значення, потрібний для моделювання рікошету


  Ball.prototype.moveBall = function () {
    this.pos.x += this.speed.x; //зміна положення по x

    this.pos.y += this.speed.y; //зміна положення по y
  }; //метод для руху м'яча


  return Ball;
}();

exports.Ball = Ball;
},{}],"sprites/Paddle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paddle = void 0;

var Paddle =
/** @class */
function () {
  function Paddle(speed, paddleWidth, paddleHeight, position, image) {
    var _this = this;

    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.position = position;
    this.paddleImage = new Image();

    this.handleKeyUp = function (e) {
      if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') _this.moveLeft = false; //якщо кнопка стілочка вліво була на клавіатурі то перестаємо рухатися вліво

      if (e.code === 'ArrowRight' || e.key === 'ArrowRight') _this.moveRight = false; //якщо кнопка стілочка вправо була на клавіатурі то перестаємо рухатися вправо
    };

    this.handleKeyDown = function (e) {
      if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') _this.moveLeft = true; //якщо кнопка стілочка вліво була на клавіатурі то рухатися вліво

      if (e.code === 'ArrowRight' || e.key === 'ArrowRight') _this.moveRight = true; //якщо кнопка стілочка вправо була на клавіатурі то рухатися вправо
    };

    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.position = position;
    this.moveLeft = false;
    this.moveRight = false;
    this.paddleImage.src = image;
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  } //конструктор для ініціалізування платформи


  Object.defineProperty(Paddle.prototype, "width", {
    get: function get() {
      return this.paddleWidth;
    } //гетер для width
    ,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "height", {
    get: function get() {
      return this.paddleHeight;
    } //гетер для height
    ,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "pos", {
    get: function get() {
      return this.position;
    } //гетер для pos
    ,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "image", {
    get: function get() {
      return this.paddleImage;
    } //гетер для image
    ,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "isMovingLeft", {
    get: function get() {
      return this.moveLeft;
    } //гетер для чи рухається платформа вліво
    ,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "isMovingRight", {
    get: function get() {
      return this.moveRight; //гетер для чи рухається платформа вправо
    },
    enumerable: false,
    configurable: true
  });

  Paddle.prototype.movePaddle = function () {
    if (this.moveLeft) this.pos.x -= this.speed; //якщо вліво рухається, то зменшуємо координату x

    if (this.moveRight) this.pos.x += this.speed; //якщо вправо рухається, то збільшуємо координату x
  }; //метод для руху платформи


  return Paddle;
}();

exports.Paddle = Paddle;
},{}],"images/paddle.png":[function(require,module,exports) {
module.exports = "/paddle.f48d929a.png";
},{}],"images/ball.png":[function(require,module,exports) {
module.exports = "/ball.96931fde.png";
},{}],"images/brick-red.png":[function(require,module,exports) {
module.exports = "/brick-red.c1be1822.png";
},{}],"images/brick-blue.png":[function(require,module,exports) {
module.exports = "/brick-blue.695b92f9.png";
},{}],"images/brick-green.png":[function(require,module,exports) {
module.exports = "/brick-green.e573ebf2.png";
},{}],"images/brick-yellow.png":[function(require,module,exports) {
module.exports = "/brick-yellow.eff6b86b.png";
},{}],"images/brick-purple.png":[function(require,module,exports) {
module.exports = "/brick-purple.088683b7.png";
},{}],"setup.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LEVEL = exports.BRICK_ENERGY = exports.BRICK_IMAGES = exports.BALL_STARTY = exports.BALL_STARTX = exports.BALL_SIZE = exports.BALL_SPEED = exports.PADDLE_SPEED = exports.PADDLE_STARTX = exports.PADDLE_HEIGHT = exports.PADDLE_WIDTH = exports.BRICK_HEIGHT = exports.BRICK_WIDTH = exports.BRICK_PADDING = exports.STAGE_COLS = exports.STAGE_ROWS = exports.STAGE_PADDING = void 0;

var _brickRed = _interopRequireDefault(require("./images/brick-red.png"));

var _brickBlue = _interopRequireDefault(require("./images/brick-blue.png"));

var _brickGreen = _interopRequireDefault(require("./images/brick-green.png"));

var _brickYellow = _interopRequireDefault(require("./images/brick-yellow.png"));

var _brickPurple = _interopRequireDefault(require("./images/brick-purple.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('#playField');
var STAGE_PADDING = 10;
exports.STAGE_PADDING = STAGE_PADDING;
var STAGE_ROWS = 20;
exports.STAGE_ROWS = STAGE_ROWS;
var STAGE_COLS = 10;
exports.STAGE_COLS = STAGE_COLS;
var BRICK_PADDING = 5;
exports.BRICK_PADDING = BRICK_PADDING;
var BRICK_WIDTH = canvas ? Math.floor((canvas.width - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING : 100;
exports.BRICK_WIDTH = BRICK_WIDTH;
var BRICK_HEIGHT = canvas ? Math.floor((canvas.height - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING : 30;
exports.BRICK_HEIGHT = BRICK_HEIGHT;
var PADDLE_WIDTH = 150;
exports.PADDLE_WIDTH = PADDLE_WIDTH;
var PADDLE_HEIGHT = 25;
exports.PADDLE_HEIGHT = PADDLE_HEIGHT;
var PADDLE_STARTX = 450;
exports.PADDLE_STARTX = PADDLE_STARTX;
var PADDLE_SPEED = 10;
exports.PADDLE_SPEED = PADDLE_SPEED;
var BALL_SPEED = 5;
exports.BALL_SPEED = BALL_SPEED;
var BALL_SIZE = 20;
exports.BALL_SIZE = BALL_SIZE;
var BALL_STARTX = 500;
exports.BALL_STARTX = BALL_STARTX;
var BALL_STARTY = 400;
exports.BALL_STARTY = BALL_STARTY;
var BRICK_IMAGES = {
  1: _brickRed.default,
  2: _brickGreen.default,
  3: _brickYellow.default,
  4: _brickBlue.default,
  5: _brickPurple.default
}; //експортуємо константну словаря, який буде описувати яка цифра описує певне зображення камня

exports.BRICK_IMAGES = BRICK_IMAGES;
var BRICK_ENERGY = {
  1: 1,
  2: 1,
  3: 2,
  4: 2,
  5: 3
}; //експортуємо константну словаря, який буде описувати кількість ударів для кожного камня, які треба зробити, щоб знищити камень

exports.BRICK_ENERGY = BRICK_ENERGY;
var LEVEL = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 5, 5, 0, 0, 5, 5, 0, 0]; //експортуємо константну масива, який буде описувати положення камнів на полі

exports.LEVEL = LEVEL;
},{"./images/brick-red.png":"images/brick-red.png","./images/brick-blue.png":"images/brick-blue.png","./images/brick-green.png":"images/brick-green.png","./images/brick-yellow.png":"images/brick-yellow.png","./images/brick-purple.png":"images/brick-purple.png"}],"sprites/Brick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Brick = void 0;

var Brick =
/** @class */
function () {
  function Brick(brickWidth, brickHeight, position, brickEnergy, image) {
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.position = position;
    this.brickEnergy = brickEnergy;
    this.brickImage = new Image();
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.position = position;
    this.brickEnergy = brickEnergy;
    this.brickImage.src = image;
  } //конструктор для ініцілазії камнів


  Object.defineProperty(Brick.prototype, "width", {
    get: function get() {
      return this.brickWidth;
    } //геттер для ширини
    ,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "height", {
    get: function get() {
      return this.brickHeight;
    } //гетер для висоти
    ,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "pos", {
    get: function get() {
      return this.position;
    } //гетер для позиції
    ,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "image", {
    get: function get() {
      return this.brickImage;
    } //гетер для картинки
    ,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "energy", {
    get: function get() {
      return this.brickEnergy;
    } //гетер для енергії
    ,
    set: function set(energy) {
      this.brickEnergy = energy;
    } //сеттр для енергії
    ,
    enumerable: false,
    configurable: true
  });
  return Brick;
}();

exports.Brick = Brick;
},{}],"helpers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBricks = createBricks;

var _Brick = require("./sprites/Brick");

var _setup = require("./setup");

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

function createBricks() {
  return _setup.LEVEL.reduce(function (ack, element, i) {
    var row = Math.floor((i + 1) / _setup.STAGE_COLS); //визначення рядка камнів

    var col = i % _setup.STAGE_COLS; //визначення колонки камнів

    var x = _setup.STAGE_PADDING + col * (_setup.BRICK_WIDTH + _setup.BRICK_PADDING); //визначення координати x для камня

    var y = _setup.STAGE_PADDING + row * (_setup.BRICK_HEIGHT + _setup.BRICK_PADDING); //визначення координати y для камня

    if (element === 0) return ack; //якщо в масиві LEVEL буде 0, то камень не створюємо

    return __spreadArrays(ack, [new _Brick.Brick(_setup.BRICK_WIDTH, _setup.BRICK_HEIGHT, {
      x: x,
      y: y
    }, _setup.BRICK_ENERGY[element], _setup.BRICK_IMAGES[element])]);
  }, []); //повертаємо результат як масив камнів
}
},{"./sprites/Brick":"sprites/Brick.ts","./setup":"setup.ts"}],"Collision.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collision = void 0;

var Collision =
/** @class */
function () {
  function Collision() {}

  Collision.prototype.isCollidingBrick = function (ball, brick) {
    if (ball.pos.x < brick.pos.x + brick.width && ball.pos.x + ball.width > brick.pos.x && //перевірка зіткнення м'яча по x
    ball.pos.y < brick.pos.y + brick.height && ball.pos.y + ball.height > brick.pos.y //перевірка зіткнення м'яча по y
    ) {
        return true; //повернення true якщо зіткнення було
      }

    return false; //повернення false якщо зіткнення було
  };

  Collision.prototype.isCollidingBricks = function (ball, bricks) {
    var _this = this;

    var colliding = false; //створюємо зміну для збереження інформації про зіткення, по замовчуванню ініціалізуємо зміну як false

    bricks.forEach(function (brick, i) {
      if (_this.isCollidingBrick(ball, brick)) {
        //перевірка чи камень зіткнувся з м'ячем
        ball.changeYDirection(); //моделюємо рікошет від камня

        if (brick.energy === 1) {
          //якщо енергія рівна одиницю то видаляємо камень
          bricks.splice(i, 1);
        } else {
          brick.energy -= 1; //якщо ні, то просто видаляємо від енергії камня 1
        }

        colliding = true; //визначаємо, що зіткнення відбулося
      }
    });
    return colliding; //повертаємо інформацію про зіткнення
  };

  Collision.prototype.checkBallCollision = function (ball, paddle, view) {
    if (ball.pos.x + ball.width > paddle.pos.x && ball.pos.x < paddle.pos.x + paddle.width && ball.pos.y + ball.height === paddle.pos.y //перевірка чи м'яч зіткнувся з платформою
    ) {
        ball.changeYDirection(); //якщо так, то моделюємо рікошет
      }

    if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0) {
      //перевірка чи м'яч зіткнувся зі стінками бококовими
      ball.changeXDirection(); //якщо так, то моделюємо рікошет
    }

    if (ball.pos.y < 0) {
      //перевірка чи м'яч зіткнувся з верехньою стінкою
      ball.changeYDirection(); //якщо так, то моделюємо рікошет
    }
  };

  return Collision;
}();

exports.Collision = Collision;
},{}],"index.ts":[function(require,module,exports) {
"use strict";

var _CanvasView = require("./view/CanvasView");

var _Ball = require("./sprites/Ball");

var _Paddle = require("./sprites/Paddle");

var _paddle = _interopRequireDefault(require("./images/paddle.png"));

var _ball = _interopRequireDefault(require("./images/ball.png"));

var _setup = require("./setup");

var _helpers = require("./helpers");

var _Collision = require("./Collision");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameOver = false; //зміна яка буде зберігати інформацію про кінець гри

var score = 0; //зміна яка буде зберігати інформацію про рахунок в грі

function setGameOver(view) {
  gameOver = false; //ставимо що гра була закінчена
}

function setGameWin(view) {
  view.drawInfo('Game Won!'); //вивидимо інформацію, що гра була виграна

  gameOver = false; //ставимо що гра була закінчена
}

function gameLoop( //функція для цикла гри
view, bricks, paddle, ball, collision) {
  console.log('draw!');
  view.clear(); //очищення ігрового поля

  view.drawBricks(bricks); //малювання камнів на полі

  view.drawSprite(paddle); //малювання платформи на полі

  view.drawSprite(ball); //малювання м'яча на полі

  ball.moveBall(); //починаємо рух м'яча

  if (paddle.isMovingLeft && paddle.pos.x > 0 || //перевірка чи може зараз платформа рухатися вліво і чи не вийшла за межі
  paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width //перевірка чи може зараз платформа рухатися вправо і чи не вийшла за межі
  ) {
      paddle.movePaddle(); //якщо можна рхуватися хоча в одну сторону і гравець прагне йти в ту сторону, то дозволяємо рух платформи
    }

  collision.checkBallCollision(ball, paddle, view); //перевірка колізій м'яча, платформи, та поля

  var collidingBrick = collision.isCollidingBricks(ball, bricks); //перевірка зіткнення м'яча і камнів

  if (collidingBrick) {
    //якщо зіткнення з камнем було, то
    score += 1; //додаємо до рахунку +1

    view.drawScore(score); //оновлюємо рахунок
  }

  if (ball.pos.y > view.canvas.height) gameOver = true; //якщо м'яч улетів за поле, то ставимо кінець гри

  if (bricks.length === 0) return setGameWin(view); //якщо камнів на полі не залишилося то визначаємо перемогу в грі

  if (gameOver) return setGameOver(view); //якщо зміна gameOver true, то ми виконуємо завершення гри

  requestAnimationFrame(function () {
    return gameLoop(view, bricks, paddle, ball, collision);
  }); //малювання анімацій камнів, платформи, м'яча і колізій
}

function startGame(view) {
  score = 0; //ініціалізуємо зміну рахунку

  view.drawInfo(''); //малювання інформації

  view.drawScore(0); //малювання рахунку

  var collision = new _Collision.Collision(); //ініціалізація колізії

  var bricks = (0, _helpers.createBricks)(); //створення камнів

  var ball = new _Ball.Ball(_setup.BALL_SPEED, _setup.BALL_SIZE, {
    x: _setup.BALL_STARTX,
    y: _setup.BALL_STARTY
  }, _ball.default); //створення нового м'яча на полі

  var paddle = new _Paddle.Paddle(_setup.PADDLE_SPEED, _setup.PADDLE_WIDTH, _setup.PADDLE_HEIGHT, {
    x: _setup.PADDLE_STARTX,
    y: view.canvas.height - _setup.PADDLE_HEIGHT - 5
  }, _paddle.default); //створення нової платформи на полі

  gameLoop(view, bricks, paddle, ball, collision); //виконання функції ігрового цикла
}

var view = new _CanvasView.CanvasView('#playField'); //Створення ігрового поля

view.initStartButton(startGame); //ініціалізація  кнопки початку гри і прив'язка функції до цієї кнопки
},{"./view/CanvasView":"view/CanvasView.ts","./sprites/Ball":"sprites/Ball.ts","./sprites/Paddle":"sprites/Paddle.ts","./images/paddle.png":"images/paddle.png","./images/ball.png":"images/ball.png","./setup":"setup.ts","./helpers":"helpers.ts","./Collision":"Collision.ts"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54958" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map