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
let status=false;
let input=false;       //determines tif the game is still running or ended
let result;        //stores the result once the game has ended
let def=[[]];     //array to store all the possible defnsive moves
let att=[[]];     //array to store all the possible attacking moves
let id,ia;
id=ia=0;

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

function defend()
{
    for(;ia>=1;ia--)att.pop();
    for(;id>=1;id--)def.pop();
    
    Check.row('x','o');
    Check.column('x','o');
    Check.diagonanl('x','o');
    
    for(i=1;i<=ia;i++)
    def.push(att[i]);
    for(;ia>=1;ia--)
    att.pop();
}

function attack(){
    Check.row('o','x');
    Check.column('o','x');
    Check.diagonanl('o','x');

    if(ia>0)
    return 1; //returns 1 if there's a winning chance , if we can win then don't defend, attack .

    let rco,rcs;//row_count_o  row_count_empty
    let cco,ccs;//column_count_o  column_count_empty
    rco=rcs=cco=ccs=0;
    for(i=0;i<3;i++){
        for(j=0;j<3;j++)
        {
            if(arr[i][j].title=='o')rco++;
            else if(arr[i][j].title!='x')rcs++;

            if(arr[j][i]=='o')cco++;
            else if(arr[j][i]!='x')ccs++;
        }
        if(rco==1 && rcs==2)
            for(j=0;j<3;j++)
                if(arr[i][j].title!='o')
                {att.push([i,j]);ia++;}

        if(cco==1 && ccs==2)
            for(j=0;j<3;j++)
                if(arr[j][i].title!='o')
                {att.push([j,i]);ia++;}

        if(rcs==3)
            for(j=0;j<3;j++)
                {att.push([i,j]);ia++;}

        if(ccs==3)
            for(j=0;j<3;j++)
                {att.push([j,i]);ia++;}

        rco=rcs=cco=ccs=0;
    }

    for(i=0;i<3;i++)
        for(j=0;j<3;j++)
            if(arr[i][j].title!='x' && arr[i][j].title!='o')
            {att.push([i,j]);ia++;}
    return 0;
}

function giveMove()
{
    defend();
    let w=attack();

    if(status==false)
    return;

    let r,c;
    r=c=-1;
    
    /*  defend-->attack
    but if thers a winning chance then attack
    this is how to select moves */

    if(r==-1 && id!=0 && w!=1)
    {
        r=def[0][0];
        c=def[0][1];
    }
    else if (r==-1)
    {
        r=att[0][0];
        c=att[0][1];
    }

    if(isymb==1)
    {
        arr[r][c].innerHTML=symbol[isymb];
        arr[r][c].title='o';
        isymb=0;
    }
}

function gamePlay()
{

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
    ins.innerText="You are PLAYER 1 (X) ,give your move";
    input=true;
    hum.disabled=true;
    comp.disabled=true;
});

hum.addEventListener("click",()=>{
    gameMode=2;
    ins.innerText="Okay ! Let's Begin";
    input=true;
    hum.disabled=true;
    comp.disabled=true;
});

for(inbox of inboxes)
{
    inbox.addEventListener("click",()=>{
        if(input)
        {
            if(isymb==1)
            {
                inbox.innerHTML=symbol[isymb];
                inbox.title='o';
                isymb=0;
            }
            if(isymb==0)
            {
                inbox.innerHTML=symbol[isymb];
                inbox.title='x';
                isymb=1;
            }
            
            if(gameMode==1)
            {
                input=false;
            }
            else
            {
                
            }
        }
    });
}
// function test(){
//     arr[0][0].innerHTML=arr[2][2].innerHTML=symbol[isymb];
//     arr[0][0].title=arr[2][2].title='x';
//     defend();
// }

// test();