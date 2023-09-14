//<i class="fa-solid fa-xmark fa-8x"></i>
//<i class="fa-solid fa-o fa-7x"></i>

let inboxes=document.querySelectorAll(".inbox");
let start=document.querySelector("#start");
let comp=document.querySelector("#comp");
let hum=document.querySelector("#human");
let ins=document.querySelector(".instruct");
let gameMode;
let symbol=["<i class='fa-solid fa-xmark fa-8x'></i>","<i class='fa-solid fa-o fa-7x'></i>"]// 
let f=0;

let arr=[
    [inboxes[0],inboxes[1],inboxes[2]],
    [inboxes[3],inboxes[4],inboxes[5]],
    [inboxes[6],inboxes[7],inboxes[8]]
];

let i,j;
let status=false;       //determines tif the game is still running or ended
let result;        //stores the result once the game has ended
let def=[[]];     //array to store all the possible defnsive moves
let att=[[]];     //array to store all the possible attacking moves
let id,ia;
id=ia=1;

start.addEventListener("click",()=>{
    for(inbox of inboxes)
    inbox.innerHTML="";
    hum.disabled=false;
    comp.disabled=false;
    start.disabled=true;
    ins.innerText="Choose the game mode";
});

comp.addEventListener("click",()=>{
    gameMode=1;
    ins.innerText="You are PLAYER 1 ,give your move";
    hum.disabled=true;
    comp.disabled=true;
});

hum.addEventListener("click",()=>{
    gameMode=2;
    ins.innerText="Okay ! Let's Begin";
    hum.disabled=true;
    comp.disabled=true;
});

