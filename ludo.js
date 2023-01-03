let Dice = document.getElementsByClassName("diceRoll");
for (let i = 1; i < Dice.length; i++) {
  Dice[i].style.display = "none";
}

//global
const Players = [];
let rand = 0;
let ColourSet = ["r", "b", "y", "g"];
let map = new Map([
  ["r", 0],
  ["b", 1],
  ["y", 2],
  ["g", 3],
]);

let turn = 0;
let startPostionSet = [1, 14, 27, 40];
let winPositionSet = [51, 12, 25, 38];
let safePostionSet=[1,9,14,22,27,35,40,48]
let gotee;
let color;
let dice = 0;
let WinPlayers=[];
let pathConditionSet=[]
let z=1;


for (let i = 0; i <=58; i++) {
    pathConditionSet[i]="";
}
function makePlayer(color,LiveCount,startPostion,position,Turn,WinCount,count,top,left){
  this.color = color;
  this.LiveCount = LiveCount;
  this.startPostion = startPostion;
  this.position = position;
  this.Turn = Turn;
  this.WinCount = WinCount;
  this.count=count;
  this.top=top;
  this.left=left;
}



for (let i = 0; i < 4; i++) {
  Players[i] = new makePlayer( ColourSet[i], 0, startPostionSet[i], [0, 0, 0, 0], false, 0,[0,0,0,0],[0,0,0,0],[0,0,0,0]);
}
let NoPlayers = 2; //=> take user input
Players[0].Turn = true;



//Input no of player
function Play(){
  let x=document.getElementById("NoOfPlayer").value;
  NoPlayers=parseInt(x);
  if(x>1&&x<=4){
    document.getElementById("NoOfPlayer").style.display="none"
    document.getElementById("bt").style.display="none"
    return true;
  }
  else{
    console.log("hellow")
    alert("Plese Enter valid no")
     return false;
  }
}



// Hack ludo
// document.getElementById("bt").addEventListener("click",function(){
//   let x=document.getElementById("x").value;
//   console.log("val=>"+x)
//   dice=parseInt(x);
//   if (dice === 6 && Players[turn].LiveCount === 0) {
//     for (let i = 0; i < 4; i++) {
//       if(Players[turn].count[i]===0){
//         gotee=i+1;
//         break;
//         }
//     }
//     setTimeout(sixHandle, 1000);

//   }
//   else if (dice !== 6 && Players[turn].LiveCount === 0) {
//     setTimeout(Changeturn, 1000);
//   } else if (Players[turn].WinCount === 3) {
//     for (let i = 0; i < 4; i++) {
//           if(Players[turn].count[i]!==-1){
//             gotee=i+1;
//           }
//     }
//     setTimeout(automaticMove, 1000);
//   } else if (dice !== 6 && Players[turn].LiveCount === 1) {
//     for (let i = 0; i < 4; i++) {
//       if(Players[turn].count[i]>0){
//         gotee=i+1;
//         break;
//       }
//     }
//     console.log("hellow====")
//     setTimeout(automaticMove, 1000);
//   }
//   document.getElementById("x").value="";
// })





// Test Case

// Players[2].WinCount=4;
// Players[2].count=[-1,-1,-1,-1];
// Players[2].LiveCount=0;
// Players[0].LiveCount=3;
// WinPlayers[2]="y"

let diceTrow=false;
/////////////////////////////////////////////////
for (let i = 0; i < Dice.length; i++) {

  Dice[i].addEventListener("click", function (){
     if(diceTrow===true){
      return;
     }
     diceTrow=true;
      setTimeout(() => {
        Dice[i].setAttribute("src", "./images/dice" + 2 + ".png");
      }, 100);
      setTimeout(() => {
        Dice[i].setAttribute("src", "./images/dice" + 1 + ".png");
      }, 250);
      setTimeout(() => {
        Dice[i].setAttribute("src", "./images/dice" + 3 + ".png");
      }, 300);
      setTimeout(() => {
        Dice[i].setAttribute("src", "./images/dice" + 4 + ".png");
      }, 350);
      setTimeout(() => {
        Dice[i].setAttribute("src", "./images/dice" + 5 + ".png");
      }, 400);
      let n = Math.random();
      n = n * 6 + 1;
      n = Math.floor(n);
      setTimeout(() => {
        diceTrow=false;
        Dice[i].setAttribute("src", "./images/dice" + n + ".png");
        console.log(n);
      }, 450);
      dice = n;
   

    if (dice === 6 && Players[turn].LiveCount === 0) {
      for (let i = 0; i < 4; i++) {
        if(Players[turn].count[i]===0){
          gotee=i+1;
          break;
          }
      }
      setTimeout(sixHandle, 1000);
     
    }
    else if (dice !== 6 && Players[turn].LiveCount === 0) {
      setTimeout(Changeturn, 1000);
    } else if (Players[turn].WinCount === 3) {
      for (let i = 0; i < 4; i++) {
            if(Players[turn].count[i]!==-1){
              gotee=i+1;
            }
      }
      setTimeout(automaticMove, 1000);
    } else if (dice !== 6 && Players[turn].LiveCount === 1) {
      for (let i = 0; i < 4; i++) {
        if(Players[turn].count[i]!==0){
          gotee=i+1;
          break;
          }
      }
      setTimeout(automaticMove, 1000);
    }
  
  });
}

function sixHandle() {
  let a = Players[turn].LiveCount;
  Players[turn].LiveCount = a + 1;

  let b;
  b = Players[turn].startPostion;
  
    Players[turn].position[gotee - 1] = Players[turn].startPostion;
    Players[turn].count[gotee - 1]=1;
    a = gotee;
    pathConditionSet[b]=pathConditionSet[b]+Players[turn].color+a+",";
    Players[turn].top[gotee-1]=document.getElementById(Players[turn].color + a + "").getBoundingClientRect().top;
    Players[turn].left[gotee-1]=document.getElementById(Players[turn].color + a + "").getBoundingClientRect().left;
 
  document.getElementById(Players[turn].color + a + "").style.position =
  "absolute";
  let x = document.getElementById(b + "").getBoundingClientRect().left;
  let y = document.getElementById(b + "").getBoundingClientRect().top;
  document.getElementById(Players[turn].color + a + "").style.top = y + "px";
  document.getElementById(Players[turn].color + a + "").style.left = x + "px";

  dice=0;
}


function Click(val) {
  
  let arr = val.split("");
  color = map.get(arr[0]);
  gotee = parseInt(arr[1]);
  
  if (Players[turn].Turn && dice !== 0&&Players[turn].count[gotee-1]!==-1){
    // console.log(arr);
    if (Players[turn].count[gotee - 1] === 0 && dice === 6) {
      sixHandle();
    } 
    else if (Players[turn].count[gotee - 1] !== 0) {
      move();
    }
  } else if (dice === 0) {
    alert("Plese click on dice");
  } else {
    alert("plese move yours Gotee");
  }
}

function Changeturn() {
  dice = 0;
  turn++;
  if(turn!==4){
     Block();
  }
  else{
    turn=0;
    Block();
  }
 

  if (NoPlayers === 4) {
    if (turn === 4) {
      turn = 0;
    }
    switch (turn) {
      case 3:
        change(3);
        break;
      case 2:
        change(2);
        break;
      case 1:
        change(1);
        break;
      case 0:
        change(0);
        break;
      default:
    }
  } else if (NoPlayers === 3) {
    if (turn === 3) {
      turn = 0;
    }
    switch (turn) {
      case 2:
        change(2);
        break;
      case 1:
        change(1);
        break;
      case 0:
        change(0);
        break;
      default:
    }
  } else {
    if (turn === 3) {
      turn = 0;
      console.log("turn => 3")
    } 
    else if (turn === 1) {
      turn = 2;
      console.log("turn => 2")
    }
    switch (turn) {
      case 2:
        change(2);
        break;
      case 1:
        change(1);
        break;
      case 0:
        change(0);
        break;
      default:
    }
  }
}

// move

function move() {
 
     let str=pathConditionSet[Players[turn].position[gotee-1]];
     str=str.substring(0,str.length-3);
     pathConditionSet[Players[turn].position[gotee-1]]=str;
  
     Players[turn].position[gotee - 1]=Players[turn].position[gotee - 1] + dice;
     Players[turn].count[gotee-1]=Players[turn].count[gotee-1]+dice;


     if(Players[turn].count[gotee-1]>51){
      let x=safePath();
      if(x===0){
        Players[turn].position[gotee - 1] = Players[turn].position[gotee - 1] - dice;
        Players[turn].count[gotee-1]=Players[turn].count[gotee-1]-dice;

        if(Players[turn].LiveCount<=3&&Players[turn].LiveCount!==1){
          for(let i=0;i<4;i++){
           if(Players[turn].count[i]>0&&(Players[turn].count[i]+dice)<58){
               alert("Its Wrong Move");
               return;
           }
          }
        }
        else{
          dice=0;
          setTimeout(Changeturn, 1000);
          return;
        }
      }
      else if(x===1&&dice!==6){
        dice=0;
        setTimeout(Changeturn, 1000);
        return;
      }
      else{
        console.log("have Chanse =>winCondition")
        if(Players[turn].WinCount===4){
          WinPlayers.push(Players[turn].color);
          alert("Player=>"+(turn)+"Win")
          setTimeout(Changeturn, 1000);
          return;
        }
        else{
          return;
        }
      }
     }
  
  if (Players[turn].position[gotee - 1] > 52) {
    Players[turn].position[gotee - 1] = Players[turn].position[gotee - 1] - 52;
  }
  
  let a = Players[turn].position[gotee - 1];
  document.getElementById(Players[turn].color + gotee + "").style.position =
    "absolute";
  let x = document.getElementById(a + "").getBoundingClientRect().left;
  let y = document.getElementById(a + "").getBoundingClientRect().top;
   document.getElementById(Players[turn].color + gotee + "").style.top =
    y + "px";
   document.getElementById(Players[turn].color + gotee + "").style.left =
    x + "px";

    pathConditionSet[a]=pathConditionSet[a]+Players[turn].color+gotee+",";

    if(safePosition( Players[turn].position[gotee - 1])){
      console.log("hellow")
      if (dice !== 6) {
        dice = 0;
        setTimeout(Changeturn, 1000);
        return;
      }
    }

    pathConditionSet[a]=pathConditionSet[a].substring(0,pathConditionSet[a].length-1)
     let p= outCondition(pathConditionSet[a],a)
     console.log(p)
    if(p){
      dice=0;
      pathConditionSet[a]= pathConditionSet[a]+",";
      console.log("have Chanse =>outCondition")
      return;
    }
    pathConditionSet[a]= pathConditionSet[a]+",";

    if (dice !== 6) {
      dice = 0;
      setTimeout(Changeturn, 1000);
      return;
    }
    dice=0;

}


function change(key) {
  btn=document.getElementsByClassName(Players[turn].color+"b");
  if(NoPlayers===2){
    if (key === 0) {
      Dice[NoPlayers].style.display = "none";
      Players[NoPlayers].Turn = false;
      Dice[key].style.display = "block";
      Players[key].Turn = true;
      z=z+1;
      console.log("zIndex"+z)
     for (let i = 0; i < 4; i++) {
       btn[i].style.zIndex=z+"";
     }
    }
    else{
      Dice[0].style.display = "none";
      Players[0].Turn = false;
      Dice[key].style.display = "block";
      Players[key].Turn = true;
       z=z+1;
       console.log("zIndex"+z)
      for (let i = 0; i < 4; i++) {
        btn[i].style.zIndex=z+"";
      }
    }
    dice = 0;
    return;
  }

  if (key === 0) {
    Dice[NoPlayers - 1].style.display = "none";
    Players[NoPlayers - 1].Turn = false;
  } else {
    Dice[key - 1].style.display = "none";
    Players[key - 1].Turn = false;
  }
  Dice[key].style.display = "block";
  Players[key].Turn = true;
  dice = 0;
  z=z+1;
  console.log("zIndex"+z)
 for (let i = 0; i < 4; i++) {
   btn[i].style.zIndex=z+"";
 }
 
}
//Automatic Move
function automaticMove() {
        move();
}

//Safe path
function safePath() {
    let diff;
    let Number=Players[turn].count[gotee-1];

    if(Number<57){
      diff=Number-51;
     safePathMove(diff);
     return 1;
    }
    else if(Number>57){
       return 0;
    }
    else{
      Players[turn].count[gotee-1]=-1;
      Players[turn].WinCount=Players[turn].WinCount+1;
      alert("Player=>"+(turn)+" Wincount=>"+Players[turn].WinCount);
      Players[turn].LiveCount=Players[turn].LiveCount-1;
      document.getElementById(Players[turn].color+gotee+"").style.display="none";
      // WinCondtion(Players[turn].WinCount);
      return 2;
    }
}
function  Block(){
  
  console.log(Players[turn]+" wincount=>"+Players[turn].WinCount+"turn=>"+turn)
     if(Players[turn].WinCount===4){
      if (NoPlayers === 4) {
        if (turn === 4) {
          turn = 0;
        }
        switch (turn) {
          case 3:
            change(3);
            break;
          case 2:
            change(2);
            break;
          case 1:
            change(1);
            break;
          case 0:
            change(0);
            break;
          default:
        }
      } else if (NoPlayers === 3) {
        if (turn === 3) {
          turn = 0;
        }
        switch (turn) {
          case 2:
            change(2);
            break;
          case 1:
            change(1);
            break;
          case 0:
            change(0);
            break;
          default:
        }
      } else {
        if (turn === 3) {
          turn = 0;
          console.log("turn => 3")
        } 
        else if (turn === 1) {
          turn = 2;
          console.log("turn => 2")
        }
        switch (turn) {
          case 2:
            change(2);
            break;
          case 1:
            change(1);
            break;
          case 0:
            change(0);
            break;
          default:
        }
      }
         turn++;
      return ;
     }
     
 }

function safePathMove(key){
    let a=Players[turn].color;
    let x = document.getElementById(key+a+"").getBoundingClientRect().left;
    let y = document.getElementById(key+a+"").getBoundingClientRect().top;
    
    document.getElementById(Players[turn].color+gotee+"").style.top =y +"px";
    document.getElementById(Players[turn].color+gotee+"").style.left =x +"px";
}


// palyer out Condition
String.prototype.DeleteChar=function(i){
   let arr=this.split(",");
   arr.splice(i-1,i);
   return arr.join();
}


function outCondition(str,val){
  if(str.length>2&&str.includes(Players[turn].color)){
    let arr=str.split(',');
    Out(arr,val);
    console.log("Out condistion excutrd")
    return true
  }
 else{
   return false;
 }
}


function Out(arr,val){
   let i=map.get(arr[0].charAt(0)+"")
   for(let k=0;k<arr.length-1;k++){
      let j= parseInt(arr[k].charAt(1)+"");
      document.getElementById(arr[k]).style.top =Players[i].top[j-1]+ "px";
      document.getElementById(arr[k]).style.left =Players[i].left[j-1]+ "px";
      pathConditionSet[val]=pathConditionSet[val].DeleteChar(1);
      Players[i].count[j-1]=0;
      Players[i].position[j-1]=0;
      Players[i].LiveCount=Players[i].LiveCount-1;
  }
}


// Safe position
function safePosition(x){
   for (let i = 0; i < safePostionSet.length; i++) {
     if(x===safePostionSet[i]){
      return true;
     }
   }
    return false;
}