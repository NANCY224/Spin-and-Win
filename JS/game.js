//Hello World of Phaser = Basic game = Single scene in Spin & Win Game
//How to create the basic skeleton for the game -> Game Loop
let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}

spinning=false; //To disable the spin 

let config = {
    type : Phaser.CANVAS,
    width : 840,
    height : 700,
    
    scene : {
        preload : preload,
        create : create,
        update : update,                
    }
    
    
};

let game = new Phaser.Game(config);  //Phaser is a framework

function preload()
{
    console.log("Preload");
    
    this.load.image('background','../Spin & win game/Assets/back.jpg'); //load object, load some images
    this.load.image('wheel','../Spin & win game/Assets/wheel.png');
    this.load.image('pin','../Spin & win game/Assets/pin.png');
    this.load.image('stand','../Spin & win game/Assets/stand.png');
    
    this.load.audio('Intentions', "./assets/audio/Intentions.mp3");
  
    
}

function create()
{
    console.log("Create");
    
    let W = game.config.width;
    let H = game.config.height;
    
    let background = this.add.sprite(0,0,'background'); 
    background.setPosition(W/2,H/2);
    background.setScale(0.18);
    
    //lets create the stand
    let stand = this.add.sprite(W/2,H/2+310,"stand");     
    stand.setScale(0.25);
    
    //let create a wheel
    this.wheel = this.add.sprite(W/2,H/2,"wheel");    //To bring wheel infront of stand either use wheel.depth = 1 or first write code for stand. 
    this.wheel.setScale(0.30);
    
    //lets create a pin
    let pin = this.add.sprite(W/2,H/2-300,"pin");
    pin.setScale(0.35);
    
    //event listener for mouse click
    this.input.on("pointerdown",spinwheel,this);
    
    music = this.sound.add('Intentions');
    
    //lets create a text object
    font_style = {
        
        font : "bold 30px Arial",
        align : "center",
        color : "darkblue",
    }
    
   this.game_text = this.add.text(10,10,"Welcome to Spin & Win                        Created by NANCY",font_style); 
    
}

//Game Loop
function update()
{
    console.log("Inside Update");   //This function will be called repeatedly till the game is not over
   // this.wheel.angle +=1; This is used for continuous movement of wheel
       
    
}

function spinwheel()
{
 if(spinning==false)
 {
    console.log("You clicked the mouse");
    console.log("Start spinning");
     spinning=true;
    music.play();
     
    let rounds = Phaser.Math.Between(2,4);
    let degrees = Phaser.Math.Between(0,11)*30;    // wheel is divided into 12 parts so 360/12 = 30 
    
    let total_angle = rounds*360 + degrees;    // Adding degree so that pin points in the middle i.e to multiple of 30 degree
    console.log(total_angle);
    
     let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
     
    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,           // Random rotation of wheel
        ease: "Cubic.easeOut",
        duration: 9000,
        callbackScope:this,
        onComplete:function()
        {
            spinning=false;
            music.stop();
            this.game_text.setText(" You won " + prizes_config.prize_names[idx]);
        },
        
        
    });
 }
       
    
}