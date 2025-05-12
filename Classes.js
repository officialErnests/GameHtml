class Obj {
    constructor(XPos, YPos, Shape, Size, Color) {
        this.x = XPos;
        this.y = YPos;
        this.dir = 0;
        this.Shape = [[]];
        this.Size = Size;
        this.Color = Color;
        for (const n of Shape) {
            this.Shape.push(n);
        }
    }
    GetShape(ctx) {
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
class PlayerObj extends Obj {
    constructor(XPos, YPos, Shape, Size, Color, Delay, TurnSpeed, MoveSpeed, Dmg, Hp, BulletSpeed, BulletSize, Spread, Range) {
        super(XPos, YPos, Shape, Size, Color);
        this.Delay = Delay;
        this.MaxDelay = Delay;
        this.TurnSpeed = TurnSpeed;
        this.MoveSpeed = MoveSpeed;
        this.Dmg = Dmg;
        this.Hp = Hp;
        this.BulletSpeed = BulletSpeed;
        this.BulletSize = BulletSize;
        this.Spread = Spread;
        this.Range = Range;
    }
    Shoot() {
        if (this.Delay <= 0) {
            this.Delay = this.MaxDelay;
            return true;
        }else {
            return false;
        }
    }
    Tick(GameSpeed, RefreshRate) {
        if (this.Delay > 0) {
            this.Delay -= RefreshRate / 1000 * GameSpeed;
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
        const Circle = ctx.arc(this.x, this.y, this.Radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = this.Color;
        ctx.fill();

    }
}
class Bullet extends CircleObj {
    constructor(XPos, YPos, Radius, Color, Dir, Speed, Range) {
        super(XPos, YPos, Radius, Color);
        this.Dir = Dir;
        this.Speed = Speed;
        this.Range = Range;
    }
    Tick(GameSpeed, RefreshRate) {
        if (this.Range <= 0) {
            return true;
        } else {
            this.x += Math.sin(this.Dir) * this.Speed;
            this.y += Math.cos(this.Dir) * this.Speed;
            return false;
        }
    }
}
