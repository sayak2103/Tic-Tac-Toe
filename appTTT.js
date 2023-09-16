//<i class="fa-solid fa-xmark fa-8x"></i>
//<i class="fa-solid fa-o fa-7x"></i>

let inboxes=document.querySelectorAll(".inbox");
let start=document.querySelector("#start");
let comp=document.querySelector("#comp");
let hum=document.querySelector("#human");
let ins=document.querySelector(".instruct");
let gameMode;
let symbol=["<i class='fa-solid fa-xmark fa-8x'></i>","<i class='fa-solid fa-o fa-7x'></i>"]// 
let isymb=0;
let countx,counto,r,c;

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

const Check={    
    row: function(f,a){
        counto=countx=0;
        for(i=0;i<3;i++)
        {
            for(j=0;j<3;j++)
                if(arr[i][j].title==f)
                    countx++;
                else if(arr[i][j].title!=a)
                    {counto++;r=i;c=j;}    
            
            if(countx==2 && counto==1)
        {att.push([r,c]);
        ia++;}
        else if(countx==3)
        {status=false;
        result=f;
        }
        countx=counto=0;
        }
    },
    
    column : function(f,a){
        counto=countx=0;
        for(i=0;i<3;i++)
        {
            for(j=0;j<3;j++)
                if(arr[j][i].title==f)
                    countx++;
                else if(arr[j][i].title!=a)
                    {counto++;r=j;c=i;}    
            
            if(countx==2 && counto==1)
        {att.push([r,c]);
        ia++;}
        else if(countx==3)
        {status=false;
        result=f;
        }
        countx=counto=0;
        }
    },

    diagonanl : function(f,a){
        counto=countx=0;
        for(i=0;i<3;i++)
            if(arr[i][i].title==f)
                countx++;
            else if(arr[i][i].title!=a)
                {counto++;r=i;c=i;}
    
        if(countx==2 && counto==1)
        {att.push([r,c]);
        ia++;
        }
        else if(countx==3)
        {status=false;
        result=f;
        }
        countx=counto=0;

        for(i=0,j=2;i<3;i++,j--)
        {
            if(arr[j][i].title==f)
                countx++;
            else if(arr[j][i].title!=a)
                {counto++;r=j;c=i;}
        }

        if(countx==2 && counto==1)
        {att.push([r,c]);
        ia++;
        }
        else if(countx==3)
        {status=false;
        result=f;
        }
        countx=counto=0;
    }
}



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

