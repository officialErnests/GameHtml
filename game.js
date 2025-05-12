const canvas = document.getElementById("Canvas");

if (canvas.getContext) {
    MainLoop();
} else {
    alert("Context didnt work :(");
}
async function MainLoop() {
    const ctx = canvas.getContext("2d");
    const RefreshRate = 10;

    const Player = new PlayerObj(500, 400, [[1,0],[1,-2.5],[1,2.5]], 20, "yellow", 1, RefreshRate/20, RefreshRate/10, 1, 100, 5, 10, 10, 100);
    const CircleTest = new CircleObj(400,400,100,"green");

    let Bullets = {};
    let keyboard = [false,false,false,false,false];
    let GameSpeed = 1;
    KeyboardInput(keyboard);
    while (true) {
        UpdateBg();
        Player.GetShape(ctx);
        Player.Tick(GameSpeed, RefreshRate);
        PlayerUpdate(keyboard, Player, GameSpeed, Bullets);
        await sleep(RefreshRate);
    }

    function UpdateBg() {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.rect(0, 0, 1000, 800);
        ctx.closePath();
        ctx.fillStyle = "gray";
        ctx.fill();
    }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function PlayerUpdate(keyboard, Player, GameSpeed) {
    if (keyboard[0]) {
        Player.dir += Player.TurnSpeed / 20 * GameSpeed;
    }
    if (keyboard[1]) {
        Player.x += Math.sin(Player.dir) * Player.MoveSpeed * GameSpeed;
        Player.y += Math.cos(Player.dir) * Player.MoveSpeed * GameSpeed;
    }
    if (keyboard[2]) {
        Player.dir -= Player.TurnSpeed / 20 * GameSpeed;
    }
    if (keyboard[3]) {
        Player.x -= Math.sin(Player.dir) * Player.MoveSpeed / 2 * GameSpeed;
        Player.y -= Math.cos(Player.dir) * Player.MoveSpeed / 2 * GameSpeed;
    }
    if (keyboard[4]) {
        if (Player.Shoot()){
            Bullets.push();
        }
    }
}
function KeyboardInput(keyboard) {
    document.addEventListener('keydown', function (event) {
        if (event.key == "ArrowLeft") {
            keyboard[0] = true;
        }
        else if (event.key == "ArrowUp") {
            keyboard[1] = true;
        }
        else if (event.key == "ArrowRight") {
            keyboard[2] = true;
        }
        else if (event.key == "ArrowDown") {
            keyboard[3] = true;
        }
        else if (event.key == "Shift") {
            keyboard[4] = true;
        }
    });
    document.addEventListener('keyup', function (event) {
        if (event.key == "ArrowLeft") {
            keyboard[0] = false;
        }
        else if (event.key == "ArrowUp") {
            keyboard[1] = false;
        }
        else if (event.key == "ArrowRight") {
            keyboard[2] = false;
        }
        else if (event.key == "ArrowDown") {
            keyboard[3] = false;
        }
        else if (event.key == "Shift") {
            keyboard[4] = false;
        }
    });
}
