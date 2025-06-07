const canvas = document.getElementById("Canvas");
const CustomNameHTML = document.getElementById("CustomName")
const CustomModuleHTML = document.getElementById("CustomModel")
let Player;

const BgAudio = new Audio('Audio/fusnemit.mp3');
// console.log("do monster var now");

const RandomAudio = [
    new Audio('Audio/lego-breaking.mp3'),
    new Audio('Audio/minecraft_hit_soundmp3converter.mp3'),
    new Audio('Audio/punch-gaming-sound-effect-hd_RzlG1GE.mp3'),
    new Audio('Audio/screaming-scout.mp3'),
    new Audio('Audio/undertale-damage-taken.mp3')
];

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
    
    Player = new PlayerObj(500, 400, "Player", 20, "#00ff00", 0.5, 1, RefreshRate/20, RefreshRate/20, 1, 100, RefreshRate/2, 5, 0.5, 200, 0, 10, 1);
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
    let GameTime = 0;
    let PrewCount = 0;
    let PrewCount2 = 0;
    let CardDrops = [3];
    let EnemyStats = {
        "Size" : 20,
        "Delay" : 2,
        "TurnSpeed" : 0,
        "MoveSpeed" : RefreshRate/30,
        "Dmg" : 1,
        "Hp" : 1,
        "Value" : 1,
    }
    let EnemyStatMul = {
        "Size" : 1.1,
        "Delay" : 0.95,
        "TurnSpeed" : 0,
        "MoveSpeed" : 1.05,
        "Dmg" : 1.1,
        "Hp" : 1.1,
        "Value" : 0.9,
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
    let FirstPlay = true;
    let GAME = true;
    while (GAME) {
        UpdateBg();
        // console.log(Paused);
        Count += RefreshRate / 1000 * GameSpeed;
        if (Count > PrewCount + 10) {
            var keys = Object.keys(EnemyStats);
            // console.log(EnemyStats);
            for (const x of keys){
                EnemyStats[x] *= EnemyStatMul[x];
            }
            // console.log(EnemyStats);
            // const temp2 = Math.random();
            // console.log(keys[Math.floor(keys.length * temp2)], EnemyStats[keys[Math.floor(keys.length * temp2)]]);
            
            SpawnAmount += 1;   
            EnemyStats["Value"] *= 2;
            // EnemyStats["Value"] += 0.5;
            // console.log("D");
            PrewCount = Count;
        }
        if (Count > PrewCount2 + 5) {
            // console.log(temp1);
            
            const TempRandom = Math.random();
            let XY = [0,0];
            switch(Math.floor(TempRandom * 4)) {
                case 0:
                    XY[0] = -200;
                    XY[1] = Math.random() * 800;
                    break;
                case 1:
                    XY[0] = Math.random() * 1000;
                    XY[1] = -200;
                    break;
                case 2:
                    XY[0] = 1200;
                    XY[1] = Math.random() * 800;
                    break;
                case 3:
                    XY[0] = Math.random() * 1000;
                    XY[1] = 1000;
                    break;
                default:
                    console.log(Math.floor(TempRandom * 4));
                    break;
            }
            let Enemy
            switch (Math.floor(Math.random() * 3)){
                case 0:
                    Enemy = new EnemyObj(XY[0],XY[1],"Boss1", EnemyStats["Size"]*6, "#00aa00", EnemyStats["Delay"]*10, EnemyStats["TurnSpeed"], EnemyStats["MoveSpeed"]*0.3, EnemyStats["Dmg"]*10, EnemyStats["Hp"]*10, EnemyStats["Value"]*10);
                    break;
                case 1:
                    Enemy = new EnemyObj(XY[0],XY[1],"Boss2", EnemyStats["Size"]*4, "#aa0000", EnemyStats["Delay"]*5, EnemyStats["TurnSpeed"], EnemyStats["MoveSpeed"]*0.5, EnemyStats["Dmg"]*2, EnemyStats["Hp"]*5, EnemyStats["Value"]*10);
                    break;
                case 2:
                    Enemy = new EnemyObj(XY[0],XY[1],"Boss3", EnemyStats["Size"]*8, "#0000aa", EnemyStats["Delay"]*20, EnemyStats["TurnSpeed"], EnemyStats["MoveSpeed"]*0.1, EnemyStats["Dmg"]*5, EnemyStats["Hp"]*50, EnemyStats["Value"]*10);
                    break;
            }
            Enemies.push(Enemy);
            PrewCount2 = Count;
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
                        XY[0] = -100;
                        XY[1] = Math.random() * 800;
                        break;
                    case 1:
                        XY[0] = Math.random() * 1000;
                        XY[1] = -100;
                        break;
                    case 2:
                        XY[0] = 1100;
                        XY[1] = Math.random() * 800;
                        break;
                    case 3:
                        XY[0] = Math.random() * 1000;
                        XY[1] = 900;
                        break;
                    default:
                        console.log(Math.floor(TempRandom * 4));
                        break;
                }
                let Enemy
                switch (Math.floor(Math.random() * 3)){
                    case 0:
                        Enemy = new EnemyObj(XY[0],XY[1],"Enemy1", EnemyStats["Size"], "#00aa00", EnemyStats["Delay"], EnemyStats["TurnSpeed"], EnemyStats["MoveSpeed"], EnemyStats["Dmg"], EnemyStats["Hp"], EnemyStats["Value"]);
                        break;
                    case 1:
                        Enemy = new EnemyObj(XY[0],XY[1],"Enemy2", EnemyStats["Size"]*0.8, "#aa0000", EnemyStats["Delay"]*0.5, EnemyStats["TurnSpeed"], EnemyStats["MoveSpeed"]*1.3, EnemyStats["Dmg"]*0.5, EnemyStats["Hp"]*0.5, EnemyStats["Value"]);
                        break;
                    case 2:
                        Enemy = new EnemyObj(XY[0],XY[1],"Enemy3", EnemyStats["Size"]*2, "#0000aa", EnemyStats["Delay"]*2, EnemyStats["TurnSpeed"], EnemyStats["MoveSpeed"]*0.5, EnemyStats["Dmg"]*2, EnemyStats["Hp"]*2.5, EnemyStats["Value"]);
                        break;
                }
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
        if (!Paused[0] && LVLUp){
            LVLUp = false;
            Player.ExpGoal = Player.Exp * 2;
            Player.AddStat(0, 0, -Player.Exp);
        }
        if (Player.ExpGoal <= Player.Exp && !Paused[0]) {
            Paused[0] = true;
            BuyMenuOpened[0] = true;
            MenuOpen();
            LVLUp = true;   
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
        if (!Paused[0] && FirstPlay){
            FirstPlay = false;
            BgAudio.volume = 0.5;
            BgAudio.loop = true;
            BgAudio.play();
        }
        if (Player.Hp <= 0){
            GAME = false;
        }
        if(!Paused[0]){GameTime+=RefreshRate}
        await sleep(RefreshRate);
    }
    document.getElementById("DeathScreen").classList.remove("Hidden");
    document.getElementById("DeathScreenTxt").innerText = `You survived for ${Math.round(GameTime)/1000} sec`;
    for(let x = 0; x < 1; x += 1/RefreshRate*0.005){
        
        for (i = 0; i < Enemies.length; i ++) {
            Enemies[i].Size *= Math.cos(x*Math.PI)/1.9+0.5;
            Enemies[i].Size = Math.max(Enemies[i].Size, 10);
            Enemies[i].GetShape(ctx);
        }
        for (i = 0; i < Bullets.length; i ++) {
            Bullets[i].Size *= Math.cos(x*Math.PI)/1.9+0.5;
            Bullets[i].Size = Math.max(Bullets[i].Size, 5);
            Bullets[i].GetShape(ctx);
        }
        Player.Size *= Math.abs(Math.cos(x*Math.PI)/1.9+0.5);
        Player.Size = Math.max(Player.Size, 20);
        Player.GetShape(ctx);
        await sleep(RefreshRate);
    }

    function MenuOpen() {
        Player.AddStat(0,0,0);
        const HealPay = Math.min(Math.floor((Player.MaxHp - Player.Hp) * Player.ExpGoal), Math.floor(Player.Money));
        document.getElementById("Healer").innerText = `Heal full (+${HealPay / Player.ExpGoal} hp = ${HealPay} money)`;
        canReroll = true;
        BuyMenuOpened[0] = true;
        // console.log(BuyMenuOpened[0]);
        document.getElementById("RerollCards").innerText = "Reroll";
        BuyMenu.classList.remove("Hidden");
        GenerateCards(CardDrops, ShopCardsHTML, EnemyStats, ShopCards);
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
    // console.log(CombinedStr);
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
    // console.log(CardDrops);
    
    for (i = 0; i < CardDrops[0]; i++) {
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
                const TextCol = card[0][StatAligmentKeys[n]] >= 1 && StatAligment[StatAligmentKeys[n]][0] || card[0][StatAligmentKeys[n]] < 0 && !StatAligment[StatAligmentKeys[n]][0] ? "#00ff00" : "#ff0000";
                // console.log(StatAligment[StatAligmentKeys[n]][1]);
                Card_Atributes.innerHTML += `${StatAligment[StatAligmentKeys[n]][1]}<span style="color:${TextCol};">x${card[0][StatAligmentKeys[n]]}</span><br>`; //
            }
        }
        card[1].appendChild(Card_Atributes);

        card[2].innerText = `Buy ${Math.ceil(card[0]["Price"] * Player.ExpGoal * 2)}$`;
        
        card[2].onclick = function () {
            // console.log("Clicked")
            if (Player.Money >= Math.ceil(card[0]["Price"] * Player.ExpGoal * 2)) {
                Player.AddStat(-Math.ceil(card[0]["Price"] * Player.ExpGoal * 2), 0, 0);
                card[2].onclick = null;
                card[2].innerText = "Boght";
                for (n = 4; n < StatAligmentKeys.length; n++) {
                    if (card[0][StatAligmentKeys[n]] != null) {
                        if (StatAligmentKeys[n].charAt(0) == "P") {
                            Player[StatAligmentKeys[n].substring(2)] = Math.max(Player[StatAligmentKeys[n].substring(2)] * card[0][StatAligmentKeys[n]], 0.01);
                            Player.UpdateStats(EnemyStats, CardDrops[0]);
                        } else if (StatAligmentKeys[n].charAt(0) == "E") {
                            // console.log(StatAligmentKeys[n].substring(2),EnemyStats[StatAligmentKeys[n].substring(2)],Math.max(EnemyStats[StatAligmentKeys[n].substring(2)] * card[0][StatAligmentKeys[n]], 0.01));
                            // console.log(EnemyStats);
                            
                            EnemyStats[StatAligmentKeys[n].substring(2)] = Math.max(EnemyStats[StatAligmentKeys[n].substring(2)] * card[0][StatAligmentKeys[n]], 0.01);
                            // console.log(EnemyStats);
                        } else if (StatAligmentKeys[n].charAt(0) == "W") {
                            // console.log(CardDrops[0], card[0][StatAligmentKeys[n]]);
                            CardDrops[0] = Math.max(CardDrops[0] + card[0][StatAligmentKeys[n]], 1);
                        } else {
                            console.warn(`What is ${StatAligmentKeys[n].charAt(0)}`);
                        }
                    }
                }
                Player.AddStat(0,0,0);
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
    return CardDrops[0];
}
function HealMax() {
    const HealPay = Math.min((Player.MaxHp - Player.Hp) * Player.ExpGoal, Player.Money);
    Player.Hp += HealPay / Player.ExpGoal;
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
function audioToggle() {
    if (BgAudio.volume == 0.5){
        BgAudio.volume = 0;
    } else {
        BgAudio.volume = 0.5;
    }
}
function sfxToggle() {
    if (RandomAudio[0].volume == 0.5){
        for (const audioSingle of RandomAudio) {
            audioSingle.volume = 0;
        }
    } else {
        for (const audioSingle of RandomAudio) {
            audioSingle.volume = 0.5;
        }
    }
}
function PlayRandomSfx() {
    const randomVal = Math.floor(Math.random() * RandomAudio.length)
    RandomAudio[randomVal].pause();
    RandomAudio[randomVal].currentTime = 0;
    RandomAudio[randomVal].play();
}