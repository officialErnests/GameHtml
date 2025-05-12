const canvas = document.getElementById("Canvas");
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
class Obj {
    constructor (XPos, YPos, Shape, Size, Color){
        this.x = XPos;
        this.y = YPos;
        this.dir = 0;
        this.Shape = [[]];
        this.Size = Size;
        this.Color = Color;
        for (const n of Shape){
            this.Shape.push(n);
        }
    }
    GetShape(ctx){
        // console.log("A");
        let generated_shape = new Path2D;
        for (var i = 0; i < this.Shape.length; i++) {
            if (i == 0) {
                generated_shape.moveTo(this.x + this.Shape[i][0] * this.Size * Math.sin(this.Shape[i][1] + this.dir), this.y + this.Shape[i][0] * this.Size * Math.cos(this.Shape[i][1] + this.dir));
            } else {
                generated_shape.lineTo(this.x + this.Shape[i][0] * this.Size * Math.sin(this.Shape[i][1] + this.dir), this.y + this.Shape[i][0] * this.Size * Math.cos(this.Shape[i][1] + this.dir));
            }
        }
        generated_shape.closePath();
        ctx.fillStyle = this.Color;
        // console.log(this.Color);
        ctx.fill(generated_shape);
    }
}
if (canvas.getContext) {
    MainLoop();
} else {
    alert("Context didnt work :(");
}
async function MainLoop() {
    const ctx = canvas.getContext("2d");
    let CanvasRect = ctx.rect (0,0,1000,800);
    const Player = new Obj(500, 400, [[1,0],[1,-2.5],[1,2.5]], 20, "yellow");
    let x = 0;
    let keyboard = [false,false,false,false,false];
    let PlayeSpeed = 2;
    let TurnSpeed = 1;
    let GameSpeed = 1;
    let ShootDelay = 1;
    let ShootDelayStart = ShootDelay;
    KeyboardInput(keyboard);
    while (true) {
        ctx.fillStyle = "gray";
        ctx.fill(CanvasRect);
        Player.GetShape(ctx);
        PlayerUpdate(keyboard, Player, TurnSpeed, PlayeSpeed, GameSpeed, ShootDelay, ShootDelayStart);
        await sleep(10);
    }
}

function PlayerUpdate(keyboard, Player, TurnSpeed, PlayeSpeed, GameSpeed, ShootDelay, ShootDelayStart) {
    if (keyboard[0]) {
        Player.dir += TurnSpeed / 20 * GameSpeed;
    }
    if (keyboard[1]) {
        Player.x += Math.sin(Player.dir) * PlayeSpeed * GameSpeed;
        Player.y += Math.cos(Player.dir) * PlayeSpeed * GameSpeed;
    }
    if (keyboard[2]) {
        Player.dir -= TurnSpeed / 20 * GameSpeed;
    }
    if (keyboard[3]) {
        Player.x -= Math.sin(Player.dir) * PlayeSpeed / 2 * GameSpeed;
        Player.y -= Math.cos(Player.dir) * PlayeSpeed / 2 * GameSpeed;
    }
    if (ShootDelay <= 0) {
        if (keyboard[4]) {
            ShootDelay = ShootDelayStart;
            console.log("Shoot");
        }
    } else {
        ShootDelay -= 0.1 * GameSpeed;
        console.log(ShootDelay);
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
