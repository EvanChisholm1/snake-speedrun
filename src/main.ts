const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;

enum direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

type coords = {
    x: number;
    y: number;
};

const WIDTH = 50;
const HEIGT = 50;

const cellSize = canvas.width / WIDTH;

const snake: coords[] = [{ x: 20, y: 20 }];

let currentDir: direction = direction.RIGHT;
let currentLength = 1;
let isGameOver = false;

window.addEventListener("keydown", e => {
    console.log(e.key);
    switch (e.key) {
        case "ArrowUp":
            currentDir = direction.UP;
            break;
        case "ArrowDown":
            currentDir = direction.DOWN;
            break;
        case "ArrowLeft":
            currentDir = direction.LEFT;
            break;
        case "ArrowRight":
            currentDir = direction.RIGHT;
            break;
    }
});

let apple: coords = {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGT),
};

function render() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const cell of snake) {
        ctx.fillStyle = "green";
        ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x * cellSize, apple.y * cellSize, cellSize, cellSize);
}

function gameLoop() {
    if (isGameOver) {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText(`Game Over! final score: ${currentLength}`, 10, 70);
        return;
    }
    render();
    const current = snake.at(-1)!;
    let next = {
        x: current.x,
        y: current.y,
    };
    switch (currentDir) {
        case direction.DOWN:
            next.y += 1;
            break;
        case direction.UP:
            next.y -= 1;
            break;
        case direction.LEFT:
            next.x -= 1;
            break;
        case direction.RIGHT:
            next.x += 1;
            break;
    }

    if (next.x > WIDTH || next.x < 0 || next.y > HEIGT || next.y < 0) {
        isGameOver = true;
    }

    for (const cell of snake) {
        if (next.x === cell.x && next.y === cell.y) {
            isGameOver = true;
        }
    }

    if (next.x === apple.x && next.y === apple.y) {
        apple = {
            x: Math.floor(Math.random() * WIDTH),
            y: Math.floor(Math.random() * HEIGT),
        };
        currentLength += 1;
    }

    console.log(currentLength);
    snake.push(next);
    while (snake.length > currentLength) {
        snake.shift();
    }
}

setInterval(gameLoop, 1000 / 20);
