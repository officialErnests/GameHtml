let SpriteSheet = {
    "Player" : [[1,2.5],[0.5,2],[1,1],[0.4,0.5],[1,0],[0.4,-0.5],[1,-1],[0.5,-2],[1,-2.5]],
    "Enemy1" : [[1, -2.5],[0.5,-1],[0.5,0],[0.5,1],[1, 2.5], [0.5, Math.PI]],
    "Pause" : [[1,2],[1,0],[1,-2]],
}
let StatAligment = {
    "Description" : [true, ""],
    "Color" : [true, ""],
    "Price" : [false, ""],
    "P_Size" : [false, "Players size :"],
    "P_Delay" : [false, "Shoot reload :"],
    "P_BulletAmount" : [true, "Bullet amount :"],
    "P_TurnSpeed" : [true, "Turn speed :"],
    "P_MoveSpeed" : [true, "Movement speed :"],
    "P_Dmg" : [true, "Bullet dmg :"],
    "P_Hp" : [true, "Players health :"],
    "P_BulletSpeed" : [true, "Bullet speed :"],
    "P_BulletSize" : [true, "Bullet size :"],
    "P_Spread" : [false, "Bullet spread :"],
    "P_Range" : [true, "Bullet range :"],
    "P_Money" : [true, "Players money :"],
    "P_KnockBack" : [true, "Bullet knockback :"],
    "P_ExpGoal" : [false, "Exp goal :"],
    "E_Size" : [false, "Enemy size :"],
    "E_Delay" : [true, "Enemy attack rate :"],
    "E_TurnSpeed" : [false, "Enemy turn speed :"],
    "E_MoveSpeed" : [false, "Enemy move speed :"],
    "E_Dmg" : [false, "Enemy dmg :"],
    "E_Hp" : [false, "Enemy health :"],
    "E_Value" : [true, "Enemy value :"],
    "W_CardDrops" : [true, "Card drops :"],
}
StatAligmentKeys = Object.keys(StatAligment);
let Cards = {
    "Shotgun" : {
        "By" : "the noob", // crator name
        "Description" : "Shoots multiple rounds", // card description
        "Color" : "#aaaa00", //cards color  Def:"#a0a0a0"
        "Price" : 2, // how much the card costs Def:"1"
        "P_Size" : 5, // how bigger the player gets Def:"20" //fix this
        "P_Delay" : -0.1, // how longer the shooting coldown is Def:"0.5"
        "P_BulletAmount" : 5, // how many bullets player shoots Def:"1"
        "P_TurnSpeed"  : 0.1, // how fast player turns Def:"0.5"
        "P_MoveSpeed"  : 0.1, // how fast player moves Def:"1"
        "P_Dmg"  : -0.1, // how much player does dmg Def:"1"
        "P_Hp" : null, // how much player has hp Def:"100"
        "P_MaxHp" : null, // how much player has hp Def:"100"
        "P_BulletSpeed" : 1, // how fast is bullet Def:"1"
        "P_BulletSize"  : -0.5, // how big is bullet Def:"5"
        "P_Spread" : 0.1, // bullet spread Def:"0.5"
        "P_Range"  : -10, // how far bullets trawel Def:"200"
        "P_Money"  : null, // how much money player gets Def:"0"
        "P_KnockBack" : 1, // bullets knockback Def:"10"
        "P_ExpGoal" : null, // players exp goal Def:"Def:"1"
        "E_Size" : null, // enemy size Def:"20"
        "E_Delay" : null, // enemy delay Def:"1"
        "E_MoveSpeed" : null, // enemy move speed Def:"0.5"
        "E_Dmg" : null, // enemy dmg Def:"1"
        "E_Hp" : null,  // enemy hp Def:"2"
        "E_Value" : null, // enemy price Def:"1"
        "W_CardDrops" : null, // how many cards are shown
    },
    // "SSS" : {
    //     "By" : "the noob", // crator name
    //     "Description" : "Shoots multiple rounds", // card description
    //     "Color" : "#a0a0a0", //cards color
    //     "Price" : 1, // how much the card costs
    //     "P_Size" : null, // how bigger the player gets
    //     "P_Delay" : null, // how longer the shooting coldown is
    //     "P_BulletAmount" : 2, // how many bullets player shoots
    //     "P_TurnSpeed"  : 1, // how fast player turns
    //     "P_MoveSpeed"  : 1, // how fast player moves
    //     "P_Dmg"  : -0.2, // how much player does dmg
    //     "P_Hp" : null, // how much player has hp
    //     "P_BulletSpeed" : 2, // how fast is bullet
    //     "P_BulletSize"  : -1, // how big is bullet
    //     "P_Spread" : 0.5, // bullet spread
    //     "P_Range"  : -100, // how far bullets trawel
    //     "P_Money"  : null, // how much money player gets
    //     "P_KnockBack" : 10, // bullets knockback
    //     "P_ExpGoal" : null, // players exp goal
    //     "E_Size" : null, // enemy size
    //     "E_Delay" : -10, // enemy delay
    //     "E_TurnSpeed" : null, // enemy turn speed
    //     "E_MoveSpeed" : null, // enemy move speed
    //     "E_Dmg" : null, // enemy dmg
    //     "E_Hp" : null,  // enemy hp
    //     "E_Value" : null, // enemy price
    //     "W_CardDrops" : null, // how many cards are shown
    // },
    // "Juggernaut" : {
    //     "By" : "nooxTheHumanoid",
    //     "Description" : "Wear heavy armor",
    //     "Color" : "#a0a0a0",
    //     "Price" : 75,
    //     "P_Size" : 0.5,
    //     "P_Delay" : null,
    //     "P_BulletAmount" : null,
    //     "P_TurnSpeed" : null,
    //     "P_MoveSpeed" : -0.25,
    //     "P_Dmg" : null,
    //     "P_Hp" : 100,
    //     "P_BulletSpeed" : null,
    //     "P_BulletSize" : null,
    //     "P_Spread" : null,
    //     "P_Range" : null,
    //     "P_Money" : null,
    //     "P_KnockBack" : null,
    //     "P_ExpGoal" : null,
    //     "E_Size" : null,
    //     "E_Delay" : null, 
    //     "E_TurnSpeed" : null, 
    //     "E_MoveSpeed" : 0.25, 
    //     "E_Dmg" : null, 
    //     "E_Hp" : null, 
    //     "E_Value" : null,
    //     "W_CardDrops" : null,
    // },
    // "Slomo" : { 
    //     "By" : "nooxTheHumanoid",
    //     "Description" : "Slows down everything (except the player) in return enemies do more damage",
    //     "Color" : "#a0a0a0",
    //     "Price" : 1,
    //     "P_Size" : null,
    //     "P_Delay" : null,
    //     "P_BulletAmount" : null,
    //     "P_TurnSpeed" : null,
    //     "P_MoveSpeed" : null,
    //     "P_Dmg" : null,
    //     "P_Hp" : null,
    //     "P_BulletSpeed" : -2.5,
    //     "P_BulletSize" : null,
    //     "P_Spread" : null,
    //     "P_Range" : null,
    //     "P_Money" : null,
    //     "P_KnockBack" : null,
    //     "P_ExpGoal" : null,
    //     "E_Size" : null,
    //     "E_Delay" : null, 
    //     "E_TurnSpeed" : null, 
    //     "E_MoveSpeed" : -0.1, 
    //     "E_Dmg" : 3, 
    //     "E_Hp" : null, 
    //     "E_Value" : null,
    //     "W_CardDrops" : null,
    // },
    // "Whild Card" : { 
    //     "By" : "nooxTheHumanoid",
    //     "Description" : "drops an extra card after leveling up but enemies are slightly faster",
    //     "Color" : "#a0a0a0",
    //     "Price" : 1,
    //     "P_Size" : null,
    //     "P_Delay" : null,
    //     "P_BulletAmount" :null,
    //     "P_TurnSpeed" : null,
    //     "P_MoveSpeed" : null,
    //     "P_Dmg" : null,
    //     "P_Hp" : null,
    //     "P_BulletSpeed" : null,
    //     "P_BulletSize" : null,
    //     "P_Spread" : null,
    //     "P_Range" : null,
    //     "P_Money" : null,
    //     "P_KnockBack" : null,
    //     "P_ExpGoal" : null,
    //     "E_Size" : null,
    //     "E_Delay" : null, 
    //     "E_TurnSpeed" : null, 
    //     "E_MoveSpeed" : 0.05, 
    //     "E_Dmg" : null, 
    //     "E_Hp" : null, 
    //     "E_Value" : null,
    //     "W_CardDrops" : 1,
    // },
    // "Dagger" : { 
    //     "By" : "Big K",
    //     "Description" : "That would be your mother",
    //     "Color" : "#a0a0a0",
    //     "Price" : 1,
    //     "P_Size" : null,
    //     "P_Delay" : null,
    //     "P_BulletAmount" : 1,
    //     "P_TurnSpeed" : 1.3,
    //     "P_MoveSpeed" : 1.7,
    //     "P_Dmg" : 4,
    //     "P_Hp" : null,
    //     "P_BulletSpeed" : 2,
    //     "P_BulletSize" : -1,
    //     "P_Spread" : 0,
    //     "P_Range" : -170,
    //     "P_Money" : null,
    //     "P_KnockBack" : 3,
    //     "P_ExpGoal" : null,
    //     "E_Size" : null,
    //     "E_Delay" : null, 
    //     "E_TurnSpeed" : null, 
    //     "E_MoveSpeed" : null, 
    //     "E_Dmg" : null, 
    //     "E_Hp" : null, 
    //     "E_Value" : null,
    //     "W_CardDrops" : null,
    // },
    // "RATATATATA" : {
    //     "By" : "var nelikt",
    //     "Description" : "Exactly what the title says. Inspired by the Counter Strike Negev.",
    //     "Color" : "#4A9EF5",
    //     "Price" : 2500, // Nezinu kā balancot, skatoties kad nezinu kāda ekonomija būs šai spēlei
    //     "P_Size" : 1.5,
    //     "P_Delay" : 0,
    //     "P_BulletAmount" : 5, // Lēni kusties ar šo    
    //     "P_TurnSpeed" : 0.5, // Lēni kusties ar šo    
    //     "P_MoveSpeed" : 0.25, // Lēni kusties ar šo      
    //     "P_Dmg" : -0.1,
    //     "P_Hp" : null,
    //     "P_BulletSpeed" : 3, // Tam ir jābūt ātram
    //     "P_BulletSize" : -1,
    //     "P_Spread" : 0.4,
    //     "P_Range" : -100,
    //     "P_Money" : null,
    //     "P_KnockBack" : 0.25,
    //     "P_ExpGoal" : null,
    //     "E_Size" : null,
    //     "E_Delay" : null, 
    //     "E_TurnSpeed" : null, 
    //     "E_MoveSpeed" : null, 
    //     "E_Dmg" : null, 
    //     "E_Hp" : null, 
    //     "E_Value" : null,
    //     "W_CardDrops" : null,
    // }
};