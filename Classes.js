let WeirdMode = false;
const display = document.getElementById("Info");
const PlayerStatsHTML =  document.getElementById("PlayerStats")
const CardHolding_YES = document.getElementById("CardHolding_YES")
let LVLUp = false

class Obj {
    constructor(XPos, YPos, Shape, Size, Color) {
        this.x = XPos;
        this.y = YPos;
        this.dir = 0;
        this.Shape = [];
        this.Size = Size;
        this.Color = Color;
        this.ShapeText = Shape
        for (const n of SpriteSheet[this.ShapeText]) {
            this.Shape.push(n);
        }
    }
    GetShape(ctx) {
        // console.log(this);
        let generated_shape = new Path2D;
        for (var i = 0; i < this.Shape.length; i++) {
            let Temp2;
            if (WeirdMode) {
                Temp2 = [this.x + Math.random() * this.Shape[i][0] * this.Size * Math.sin(this.Shape[i][1] + this.dir), this.y + Math.random() * this.Shape[i][0] * this.Size * Math.cos(this.Shape[i][1] + this.dir)];
            } else {
                Temp2 = [this.x + this.Shape[i][0] * this.Size * Math.sin(this.Shape[i][1] + this.dir), this.y + this.Shape[i][0] * this.Size * Math.cos(this.Shape[i][1] + this.dir)];
            }
            if (i == 0) {
                generated_shape.moveTo(Temp2[0], Temp2[1]);
            } else {
                generated_shape.lineTo(Temp2[0], Temp2[1]);
            }
        }
        generated_shape.closePath();
        ctx.fillStyle = this.Color;
        // console.log(this.Color);
        ctx.fill(generated_shape);
    }
    UpdateShape() {
        this.Shape = [];
        for (const n of SpriteSheet[this.ShapeText]) {
            this.Shape.push(n);
        }
        // console.log(this.Shape);
    }
}
class Entinty extends Obj {
    constructor(XPos, YPos, Shape, Size, Color, TurnSpeed, MoveSpeed, Dmg, Hp) {
        super(XPos, YPos, Shape, Size, Color);
        this.TurnSpeed = TurnSpeed;
        this.MoveSpeed = MoveSpeed;
        this.Dmg = Dmg;
        this.Hp = Hp;
        this.MaxHp = Hp;
    }
    GetShape(ctx) {
        // console.log("A");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.Size, (2 * Math.PI - Math.PI * (this.Hp / this.MaxHp)) + Math.PI / 2, (Math.PI * (this.Hp / this.MaxHp)) + Math.PI / 2);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
        let generated_shape = new Path2D;
        for (var i = 0; i < this.Shape.length; i++) {
            let Temp2;
            if (WeirdMode) {
                Temp2 = [this.x + Math.random() * this.Shape[i][0] * this.Size * Math.sin(this.Shape[i][1] + this.dir), this.y + Math.random() * this.Shape[i][0] * this.Size * Math.cos(this.Shape[i][1] + this.dir)];
            } else {
                Temp2 = [this.x + this.Shape[i][0] * this.Size * Math.sin(this.Shape[i][1] + this.dir), this.y + this.Shape[i][0] * this.Size * Math.cos(this.Shape[i][1] + this.dir)];
            }
            if (i == 0) {
                generated_shape.moveTo(Temp2[0], Temp2[1]);
            } else {
                generated_shape.lineTo(Temp2[0], Temp2[1]);
            }
        }
        generated_shape.closePath();
        ctx.fillStyle = this.Color;
        ctx.fill(generated_shape);
        ctx.stroke(generated_shape);
        // console.log(this.Color);
        // ctx.fillStyle = "red";
        // ctx.fill();
    }
}
class PlayerObj extends Entinty {
    constructor(XPos, YPos, Shape, Size, Color, Delay, BulletAmount, TurnSpeed, MoveSpeed, Dmg, Hp, BulletSpeed, BulletSize, Spread, Range, Money, KnockBack, ExpGoal) {
        super(XPos, YPos, Shape, Size, Color, TurnSpeed, MoveSpeed, Dmg, Hp);
        this.Delay = Delay;
        this.MaxDelay = Delay;
        this.BulletSpeed = BulletSpeed;
        this.BulletSize = BulletSize;
        this.Spread = Spread;
        this.Range = Range;
        this.BulletAmount = BulletAmount;
        this.Money = Money;
        this.KnockBack = KnockBack;
        this.Exp = 0;
        this.ExpGoal = ExpGoal
        display.innerText = `Hp: ${this.Hp}/${this.MaxHp}\nMoney: ${this.Money}\nExp: ${this.Exp}/${this.ExpGoal}`;
    }
    Shoot() {
        if (this.Delay <= 0) {
            let temp1 = Math.floor(-this.Delay / this.MaxDelay);
            temp1 += 1;
            this.Delay = this.MaxDelay - this.Delay % this.MaxDelay;
            // console.log(temp1 * this.BulletAmount)
            return temp1 * this.BulletAmount;
        }else {
            return 0;
        }
    }
    Tick(GameSpeed, RefreshRate) {
        if (this.Delay > 0) {
            this.Delay -= RefreshRate / 1000 * GameSpeed;
            // console.log(this.Delay);
            
        }
    }
    AddStat(Money, Hp, Exp) {
        if(Money != 0){this.Money += Money;}
        if(Hp != 0){this.Hp += Hp;}
        if(Exp != 0){
            this.Exp += Exp;
        }
        display.innerText = `Hp: ${Math.floor(this.Hp*100)/100}/${Math.floor(this.MaxHp*100)/100}\nMoney: ${Math.floor(this.Money*100)/100}\nExp: ${Math.floor(this.Exp*100)/100}/${Math.floor(this.ExpGoal*100)/100}`;
    }
    UpdateStats(EnemyStats, CardDrops){
        let CombinedString = "";
        for (let n = 4; n < StatAligmentKeys.length; n++){
            if (StatAligmentKeys[n].charAt(0) == "P") {
                CombinedString += `${StatAligmentKeys[n]} = ${Math.round(Player[StatAligmentKeys[n].substring(2)]*100)/100}<br>`;
            } else if (StatAligmentKeys[n].charAt(0) == "E") {
                // console.log(StatAligmentKeys[n].substring(2),EnemyStats[StatAligmentKeys[n].substring(2)]*100,Math.round(EnemyStats[StatAligmentKeys[n].substring(2)]*100)/100);
                
                
                CombinedString += `${StatAligmentKeys[n]} = ${Math.round(EnemyStats[StatAligmentKeys[n].substring(2)]*100)/100}<br>`;
            } else if (StatAligmentKeys[n].charAt(0) == "W") {
                CombinedString += `${StatAligmentKeys[n]} = ${Math.round(CardDrops,2)}<br>`;
            } else {
                console.warn(`What is ${StatAligmentKeys[n].charAt(0)}`);                                
            }
        }
        PlayerStatsHTML.innerHTML = CombinedString;
    }
}
class EnemyObj extends Entinty {
    constructor(XPos, YPos, Shape, Size, Color, Delay, TurnSpeed, MoveSpeed, Dmg, Hp, Value) {
        super(XPos, YPos, Shape, Size, Color, TurnSpeed, MoveSpeed, Dmg, Hp);
        this.Delay = Delay;
        this.MaxDelay = Delay;
        this.TurnSpeed = TurnSpeed;
        this.MoveSpeed = MoveSpeed;
        this.Dmg = Dmg;
        this.Hp = Hp;
        this.Value = Value;
    }
    Tick(GameSpeed, RefreshRate, Player, Bullets) {
        if (this.Hp <= 0) {
            bulet.Dmg = -this.Hp
            Player.Money += this.Value
            return true;
        }
        if (this.Delay > 0) {
            this.Delay -= RefreshRate / 1000 * GameSpeed;
        }
        if (Math.abs(this.x - Player.x) < this.Size + Player.Size && Math.abs(this.y - Player.y) < this.Size + Player.Size && this.Delay <= 0) {
            this.Delay = this.MaxDelay;
            Player.AddStat(0, -this.Dmg, 0);
        }
        this.dir = Math.atan2((Player.x - this.x), (Player.y - this.y))
        this.x += Math.sin(this.dir) * this.MoveSpeed * GameSpeed;
        this.y += Math.cos(this.dir) * this.MoveSpeed * GameSpeed;
        for (const bulet of Bullets) {
            if (Math.abs(bulet.x - this.x) < bulet.Radius + this.Size){
                if (Math.abs(bulet.y - this.y) < bulet.Radius + this.Size){
                    this.Hp -= bulet.Dmg;
                    PlayRandomSfx();
                    if (this.Hp <= 0) {
                        bulet.Dmg = -this.Hp;
                        Player.AddStat(this.Value, 0, this.Value);
                        Player.Money += this.Value;
                        return true;
                    } else {
                        bulet.Dmg = 0;
                        this.x -= Math.sin(this.dir) * this.MoveSpeed * GameSpeed * bulet.KnockBack;
                        this.y -= Math.cos(this.dir) * this.MoveSpeed * GameSpeed * bulet.KnockBack;
                    }
                    break;
                }
            }
        }
    }
}
class CircleObj {
    constructor(XPos, YPos, Radius, Color) {
        this.x = XPos;
        this.y = YPos;
        this.Radius = Radius;
        this.Color = Color;
    }
    GetShape(ctx) {
        ctx.beginPath();
        let Rad = this.Radius;
        if (WeirdMode) {
            Rad *= Math.random();
        }
        ctx.arc(this.x, this.y, Rad, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = this.Color;
        ctx.fill();
        ctx.stroke();
    }
}
class BulletObj extends CircleObj {
    constructor(XPos, YPos, Radius, Color, Dir, Speed, Range, Spread, Dmg, KnockBack) {
        super(XPos, YPos, Radius, Color);
        this.Dir = Dir + Spread / 2 - Math.random() * Spread;
        this.Speed = Speed;
        this.Range = Range;
        this.Dmg = Dmg;
        this.KnockBack = KnockBack;
    }
    Tick(GameSpeed) {
        if (this.Range <= 0 | this.Dmg <= 0) {
            return true;
        }
        this.x += Math.sin(this.Dir) * this.Speed * GameSpeed;
        this.y += Math.cos(this.Dir) * this.Speed * GameSpeed;
        this.Range -= this.Speed * GameSpeed;
        return false;
    }
}
