const canvas = document.getElementById("Canvas");
const CustomNameHTML = document.getElementById("CustomName")
const CustomModuleHTML = document.getElementById("CustomModel")
let Player;

let Enemies = [];
var AllOfTheCards = [];
const PausedSprite = new Obj(500, 400, "Pause", 20, "#ffffff");
if (canvas.getContext) {
    MainLoop(Enemies);
} else {
    alert("Context didnt work :(");
}
async function MainLoop() {
    const ctx = canvas.getContext("2d");
    const RefreshRate = 10;
    
    Player = new PlayerObj(500, 400, "Player", 20, "#00ff00", 0.5, 1, RefreshRate/20, RefreshRate/10, 1, 100, RefreshRate/2, 5, 0.5, 200, 0, 10, 1);
    PausedSprite.dir = Math.PI / 2
    
    let Bullets = [];
    let keyboard = [false,false,false,false,false];
    let GameSpeed = 1;
    let SpawnRateMax = 3;
    let SpawnAmount = 1;
    let SpawnRate = 0;
    let Paused = [true, false, 0];
    const BuyMenu = document.getElementById("BuyMenu");
    let BuyMenuOpened = [false];
    KeyboardInput(keyboard, Paused, BuyMenuOpened);
    let Count = 0;
    let PrewCount = 0;
    let CardDrops = 3;
    let EnemyStats = {
        "Size" : 20,
        "Delay" : 1,
        "TurnSpeed" : 0,
        "MoveSpeed" : RefreshRate/20,
        "Dmg" : 1,
        "Hp" : 2,
        "Value" : 1,
    }
    Player.UpdateStats(EnemyStats, CardDrops);
    const ShopCardsHTML = document.getElementById("CardClass");
    let ShopCards = [];
    let canReroll = false;
    document.getElementById("RerollCards").addEventListener("click", function(){
        if (!canReroll) return;
        canReroll = false;
        deleteCards(AllOfTheCards);
        document.getElementById("RerollCards").innerText = "Used";
        GenerateCards(CardDrops, ShopCardsHTML, EnemyStats, ShopCards)
    })
    SetUpSkinHtmlElement();
    while (true) {
        UpdateBg();
        // console.log(Paused);
        Count += RefreshRate / 1000 * GameSpeed;
        if (Count > PrewCount + 5) {
            var keys = Object.keys(EnemyStats);
            EnemyStats[keys[Math.floor(keys.length * Math.random())]] += (3 - Math.random() * 3) * EnemyStats[keys[Math.floor(keys.length * Math.random())]];
            SpawnAmount += 1;
            EnemyStats["Value"] += 1;
            // EnemyStats["Value"] += 0.5;
            // console.log("D");
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
                let Enemy = new EnemyObj(XY[0],XY[1],"Enemy1", EnemyStats["Size"], "Green", EnemyStats["Delay"], EnemyStats["TurnSpeed"], EnemyStats["MoveSpeed"], EnemyStats["Dmg"], EnemyStats["Hp"], EnemyStats["Value"]);
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
            MenuOpen();
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

    function MenuOpen() {
        canReroll = true;
        BuyMenuOpened[0] = true;
        // console.log(BuyMenuOpened[0]);
        document.getElementById("RerollCards").innerText = "Reroll";
        BuyMenu.classList.remove("Hidden");
        CardDrops = GenerateCards(CardDrops, ShopCardsHTML, EnemyStats, ShopCards);
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
function updateRight(){
    let CombinedStr = "[";
    for (const arrayN of SpriteSheet[CustomNameHTML.value]){
        CombinedStr += `[${arrayN.toString()}],`;
    }
    CombinedStr = CombinedStr.slice(0,-1);
    CombinedStr += "]";
    console.log(CombinedStr);
    CustomModuleHTML.value = CombinedStr;
}
function SetUpSkinHtmlElement(){
    for (const x of Object.keys(SpriteSheet)){
        const opinonHTML = document.createElement("option");
        opinonHTML.value = x;
        opinonHTML.innerText = x;
        CustomNameHTML.appendChild(opinonHTML);
    }
    updateRight();
}
function GenerateCards(CardDrops, ShopCardsHTML, EnemyStats, ShopCards) {
    for (i = 0; i < CardDrops; i++) {
        const keys = Object.keys(Cards);
        const random = keys[Math.floor(keys.length * Math.random())];
        // console.log(Cards, Cards[random], random);
        let card = [Cards[random], document.createElement("div"), document.createElement("button")];
        AllOfTheCards.push(card);
        card[1].classList.add("Card");
        card[1].style.backgroundColor = card[0]["Color"] ? card[0]["Color"] : "#555555";
        ShopCardsHTML.appendChild(card[1]);

        const Card_Name = document.createElement("h1");
        Card_Name.innerText = random;
        card[1].appendChild(Card_Name);

        const Card_Description = document.createElement("p");
        Card_Description.innerText = card[0]["Description"];
        card[1].appendChild(Card_Description);

        const Card_Atributes = document.createElement("p");
        for (n = 4; n < StatAligmentKeys.length; n++) {
            if (card[0][StatAligmentKeys[n]] != null) {
                const TextCol = card[0][StatAligmentKeys[n]] > 0 && StatAligment[StatAligmentKeys[n]][0] || card[0][StatAligmentKeys[n]] < 0 && !StatAligment[StatAligmentKeys[n]][0] ? "#00ff00" : "#ff0000";
                // console.log(StatAligment[StatAligmentKeys[n]][1]);
                Card_Atributes.innerHTML += `${StatAligment[StatAligmentKeys[n]][1]}<span style="color:${TextCol};">${card[0][StatAligmentKeys[n]]}</span><br>`; //
            }
        }
        card[1].appendChild(Card_Atributes);

        card[2].innerText = `Buy ${Math.ceil(card[0]["Price"] * Player.ExpGoal / 10)}$`;
        card[2].onclick = function () {
            // console.log("Clicked")
            if (Player.Money >= Math.ceil(card[0]["Price"] * Player.ExpGoal / 10)) {
                Player.AddStat(-Math.ceil(card[0]["Price"] * Player.ExpGoal / 10), 0, 0);
                card[2].onclick = null;
                card[2].innerText = "Boght";
                for (n = 4; n < StatAligmentKeys.length; n++) {
                    if (card[0][StatAligmentKeys[n]] != null) {
                        if (StatAligmentKeys[n].charAt(0) == "P") {
                            Player[StatAligmentKeys[n].substring(2)] += Math.min(card[0][StatAligmentKeys[n]], 1);
                            Player.UpdateStats(EnemyStats, CardDrops);
                        } else if (StatAligmentKeys[n].charAt(0) == "E") {
                            EnemyStats[StatAligmentKeys[n].substring(2)] += Math.min(card[0][StatAligmentKeys[n]], 1);
                        } else if (StatAligmentKeys[n].charAt(0) == "W") {
                            CardDrops += Math.min(card[0][StatAligmentKeys[n]], 1);
                        } else {
                            console.warn(`What is ${StatAligmentKeys[n].charAt(0)}`);
                        }
                    }
                }
                const CardTemp1 = document.createElement("div");
                CardTemp1.style.backgroundColor = card[0]["Color"] ? card[0]["Color"] : "#555555";
                const Card_Name = document.createElement("h1");
                Card_Name.innerText = random;
                CardTemp1.appendChild(Card_Name);
                const Card_Description = document.createElement("p");
                Card_Description.innerText = card[0]["Description"];
                CardTemp1.appendChild(Card_Description);
                const Card_Atributes = document.createElement("p");
                for (n = 4; n < StatAligmentKeys.length; n++) {
                    if (card[0][StatAligmentKeys[n]] != null) {
                        const TextCol = card[0][StatAligmentKeys[n]] > 0 && StatAligment[StatAligmentKeys[n]][0] || card[0][StatAligmentKeys[n]] < 0 && !StatAligment[StatAligmentKeys[n]][0] ? "#00ff00" : "#ff0000";
                        // console.log(StatAligment[StatAligmentKeys[n]][1]);
                        Card_Atributes.innerHTML += `${StatAligment[StatAligmentKeys[n]][1]}<span style="color:${TextCol};">${card[0][StatAligmentKeys[n]]}</span><br>`; //
                    }
                }
                CardTemp1.appendChild(Card_Atributes);
                const priceTemp = document.createElement("p");
                priceTemp.innerText = `Price: ${Math.ceil(card[0]["Price"] * Player.ExpGoal / 10)}$`;
                CardTemp1.appendChild(priceTemp);
                const credit = document.createElement("h2");
                credit.innerText = `By: ${card[0]["By"]}`;
                CardTemp1.appendChild(credit);
                CardHolding_YES.appendChild(CardTemp1);
            }
        };
        card[1].appendChild(card[2]);
        const credit = document.createElement("h2");
        credit.innerText = `By: ${card[0]["By"]}`;
        card[1].appendChild(credit);
        ShopCards.push(card);
    }
    return CardDrops;
}
function HealMax() {
    const HealPay = Math.min(Player.MaxHp - Player.Hp, Player.Money);
    Player.Hp += HealPay;
    Player.AddStat(-HealPay, 0, 0);
    // console.log(HealPay);
}
function ShopClose(BuyMenuOpened){
    BuyMenu.classList.add("Hidden");
    BuyMenuOpened[0] = false;
    // console.log(AllOfTheCards)
    deleteCards(AllOfTheCards);
    AllOfTheCards.length = 0;
}
function deleteCards() {
    for (const x of AllOfTheCards) {
        // console.log(x[1]);
        x[1].remove();
    }
}
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
function stringToArray(string){
    string = string.replace(/\s/g,'');
    string = string.slice(1,string.length)
    let arrayTemp = string.split('[');
    arrayTemp.shift();
    let EndArray = [];
    for (let i of arrayTemp){
        i = i.slice(0,-2);
        i = i.split(',');
        i[0] = Number(i[0]);
        i[1] = Number(i[1]);
        EndArray.push(i);
    }
    // console.log(EndArray);
    
    return EndArray;
}
function CustomModule(){
    SpriteSheet[document.getElementById("CustomName").value] = stringToArray(CustomModuleHTML.value);
    Player.UpdateShape();
    for (const enemys of Enemies) {
        enemys.UpdateShape()
    }
    PausedSprite.UpdateShape();
}
function KeyboardInput(keyboard, Paused, BuyMenuOpened) {
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
                // console.log(Paused[0] && BuyMenuOpened[0]);
                if (Paused[0] && BuyMenuOpened[0]) {
                    ShopClose(BuyMenuOpened);
                }
                Paused[0] = !Paused[0];
                // console.log(Paused); 
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