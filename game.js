const canvas = document.getElementById("Canvas");

let Player;

if (canvas.getContext) {
    MainLoop(Player);
} else {
    alert("Context didnt work :(");
}
async function MainLoop() {
    const ctx = canvas.getContext("2d");
    const RefreshRate = 10;
    
    Player = new PlayerObj(500, 400, SpriteSheet["Player"], 20, "#00ff00", 0.5, 1, RefreshRate/20, RefreshRate/10, 1, 100, RefreshRate/2, 5, 1, 200, 0, 10, 1);
    const PausedSprite = new Obj(500, 400, SpriteSheet["Pause"], 20, "#ffffff");
    PausedSprite.dir = Math.PI / 2

    let Bullets = [];
    let Enemies = [];
    let keyboard = [false,false,false,false,false];
    let GameSpeed = 1;
    let SpawnRateMax = 5;
    let SpawnAmount = 1;
    let SpawnRate = 0;
    let Paused = [true, false, 0];
    const BuyMenu = document.getElementById("BuyMenu");
    let BuyMenuOpened = [false];
    KeyboardInput(keyboard, Paused, BuyMenu, BuyMenuOpened);
    let Count = 0;
    let PrewCount = 0;
    let ZombVal = 1;
    while (true) {
        UpdateBg();
        // console.log(Paused);
        Count += RefreshRate / 1000 * GameSpeed;
        if (Count > PrewCount + 60) {
            SpawnAmount *= 2;
            ZombVal *= 1.5;
            console.log("D");
            PrewCount = Count;
        }
        if (SpawnRate <= 0) {
            let temp1 = Math.floor(-SpawnRate / SpawnRateMax);
            temp1 = (temp1 + 1) * SpawnAmount;
            SpawnRate = SpawnRateMax -SpawnRate % SpawnRateMax;
            // console.log(temp1);
            for (n = 0; n < temp1; n ++) {
                const TempRandom = Math.random();
                let XY = [0,0];
                switch(Math.floor(TempRandom * 4)) {
                    case 0:
                        XY[0] = 0;
                        XY[1] = Math.random() * 800;
                        break;
                    case 1:
                        XY[0] = Math.random() * 1000;
                        XY[1] = 0;
                        break;
                    case 2:
                        XY[0] = 1000;
                        XY[1] = Math.random() * 800;
                        break;
                    case 3:
                        XY[0] = Math.random() * 1000;
                        XY[1] = 800;
                        break;
                    default:
                        console.log(Math.floor(TempRandom * 4));
                        break;
                }
                let Enemy = new EnemyObj(XY[0],XY[1],SpriteSheet["Enemy1"], 20, "Green", 1, 0, RefreshRate/20, 1, 2, ZombVal);
                Enemies.push(Enemy);
            }
        } else {
            SpawnRate -= RefreshRate / 1000 * GameSpeed;
        }

        for (i = 0; i < Enemies.length; i ++) {
            if (Enemies[i].Tick(GameSpeed, RefreshRate, Player, Bullets)) {
                Enemies.splice(i,1);
            } else {
                Enemies[i].GetShape(ctx);
            }
        }

        for (i = 0; i < Bullets.length; i ++) {
            if (Bullets[i].Tick(GameSpeed)) {
                Bullets.splice(i,1);
            } else {
                Bullets[i].GetShape(ctx);
            }
        }
        Player.GetShape(ctx);
        Player.Tick(GameSpeed, RefreshRate);
        PlayerUpdate(keyboard, Player, GameSpeed, Bullets);
        if (Player.ExpGoal <= Player.Exp && !Paused[0]) {
            Player.ExpGoal = Player.Exp + 1;
            Player.AddStat(0, 0, -Player.Exp);
            Paused[0] = true;
            BuyMenuOpened[0] = true;
            BuyMenu.classList.remove("Hidden");
        }
        if (Paused[0]) {
            if (!Paused[1]){
                Paused[2] = GameSpeed;
                GameSpeed = 0;
                Paused[1] = true;
            }
            PausedSprite.GetShape(ctx);
        } else if (!Paused[0] && Paused[1]) {
            Paused[1] = false;
            GameSpeed = Paused[2];
        }

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
document.getElementById("PlayerColor").addEventListener("input", function() {
    Player.Color = this.value;
})
function checkedEl(check){
    WeirdMode = check.checked;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function PlayerUpdate(keyboard, Player, GameSpeed, Bullets) {
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
        const BulletsShot = Player.Shoot()
        for (n = 0; n < BulletsShot; n ++) {
            const Bullet = new BulletObj(Player.x, Player.y, Player.BulletSize, "yellow", Player.dir, Player.BulletSpeed, Player.Range, Player.Spread, Player.Dmg, Player.KnockBack);
            Bullets.push(Bullet);
        }
    }
}
function KeyboardInput(keyboard, Paused, BuyMenu, BuyMenuOpened) {
    let KeyboardDebounce = [false];
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
        else if (event.key == "p") {
            if (!KeyboardDebounce[0]){
                if (Paused[0] && BuyMenuOpened[0]) {
                    BuyMenu.classList.add("Hidden");
                }
                Paused[0] = !Paused[0];
                console.log(Paused);
                KeyboardDebounce[0] = true;
            }
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
        else if (event.key == "p") {
            KeyboardDebounce[0] = false;
        }
    });
}
window.addEventListener("keydown", function(e) {
    if(["ArrowUp","ArrowDown"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);