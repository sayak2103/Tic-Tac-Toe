//<i class="fa-solid fa-xmark fa-8x"></i>
//<i class="fa-solid fa-o fa-7x"></i>

let inboxes=document.querySelectorAll(".inbox");
let start=document.querySelector("#start");
let comp=document.querySelector("#comp");
let hum=document.querySelector("#human");
let ins=document.querySelector(".instruct");
let gameMode='d';
let symbol=["<i class='fa-solid fa-xmark fa-8x'></i>","<i class='fa-solid fa-o fa-7x'></i>"]// 
let isymb=0;
let countx,counto,r,c;

let arr=[
    [inboxes[0],inboxes[1],inboxes[2]],
    [inboxes[3],inboxes[4],inboxes[5]],
    [inboxes[6],inboxes[7],inboxes[8]]
];

let i,j;
let status=0;
let input=false;       //determines tif the game is still running or ended
let result;        //stores the result once the game has ended
let def=[[]];     //array to store all the possible defnsive moves
let att=[[]];     //array to store all the possible attacking moves
let id,ia;
let count=0;
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
        {status=0;
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
            {status=0;
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
        {status=0;
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
        {status=0;
        result=f;
        }
        countx=counto=0;
    }
}

function defend()
{
    Check.row('x','o');
    Check.column('x','o');
    Check.diagonanl('x','o');
    
    while(att.length>1)
    {def.push(att.pop());
    id++;}

    console.log("in defend att len ",att.length);
    console.log("in defend def len ",def.length);
}

function attack(){

    Check.row('o','x');
    Check.column('o','x');
    Check.diagonanl('o','x');

    if(att.length>1)
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
                {att.push([j,i]);
                    ia++;}
        rco=rcs=cco=ccs=0;
    }
    for(i=0;i<3;i++)
    {
        if(arr[i][i].title=='o')rco++;
        else if(arr[i][i].title!='x')rcs++;
    }
    if(rcs==2 && rco==1)
        for(i=0;i<3;i++)
            if(arr[i][i].title!='x')
                att.push([i,i]);

    rco=rcs=0;
    for(i=0;i<3;i++)
    {
        if(arr[i][2-i].title=='o')rco++;
        else if(arr[i][2-i].title!='x')rcs++;
    }
    if(rcs==2 && rco==1)
        for(i=0;i<3;i++)
        if(arr[i][2-i].title!='x')
            att.push([i,2-i]);

    rco=rcs=0;

    if(att.length>1)
    return 2;

    for(i=0;i<3;i++)
        for(j=0;j<3;j++)
            if(arr[i][j].title!='o' && arr[i][j].title!='x')
                att.push([i,j]);
    return 3;
}

function giveMove()
{
    while(def.length>1)
        def.pop();
    while(att.length>1)
        att.pop();
    
    defend();
    let w=attack();

    console.log("after attack att len",att.length);
    console.log(att);
    console.log();
    if(status==0)
    return;

    let r,c;
    r=c=-1;
    
    /*  defend-->attack
    but if thers a winning chance then attack
    this is how to select moves */

    if(w==1)
    {
        r=att[1][0];
        c=att[1][1];
    }
    else if (def.length>1)
    {
        r=def[1][0];
        c=def[1][1];
    }
    else if(w==2)
    {
        r=att[1][0];
        c=att[1][1];
    }
    else{
        i=(Math.random()*(att.length-1))+1;
        i=Math.floor(i);
        r=att[i][0];
        c=att[i][1];
    }

        arr[r][c].innerHTML=symbol[1];
        arr[r][c].title='o';
        isymb=0;
        if(w==1)
        {
            status=0;
            result='o';
            ending();
        }
        else
        input=true;
}

function ending()
{
    input=false;
    if(gameMode==1)
    {
        if(result=='x')
        ins.innerHTML="Congratulations, You've won ";
        else if(result=='o')
        ins.innerHTML="You've lost, Better Luck next time...";
        else
        ins.innerHTML="The game ends in a draw, nice game...";
    }
    else if(gameMode==2)
    {
        if(result=='x')
        ins.innerHTML="Congratulations, PLAYER 1 won...";
        else if(result=='o')
        ins.innerHTML="Congratulations, PLAYER 2 won...";
        else
        ins.innerHTML="The game ends in a draw, nice game...";
    }
}

function gameplay(num)
{
    count++;
        if(input)
        {
            if(isymb==1)
            {
                inboxes[num].innerHTML=symbol[isymb];
                inboxes[num].title='o';
                isymb=0;
            }
            else if(isymb==0)
            {
                inboxes[num].innerHTML=symbol[isymb];
                inboxes[num].title='x';
                isymb=1;
            }
            
            if(gameMode==1)
            {   
                if(count==9)
                    status=0;
                
                ins.innerText="The Machine is thinking ........"
                input=false;
                
                    count++;
                    giveMove();
                    if(status==1)
                    ins.innerText="it's your turn, give your move."
                    else
                    ending();
                
            }
            else
            {
                if(isymb==1)
                {
                    if(count==9)
                        status=0;
                    Check.row('x','o');
                    Check.column('x','o');
                    Check.diagonanl('x','o');
                    if(status==1)
                        ins.innerText="PLAYER 2 it's your turn";
                    else
                        ending();
                }
                else if(isymb==0)
                {
                    Check.row('o','x');
                    Check.column('o','x');
                    Check.diagonanl('o','x');
                    if(status==1)
                        ins.innerText="PLAYER 1 it's your turn";
                    else
                        ending();
                }
            }
        }
}

start.addEventListener("click",()=>{
    for(inbox of inboxes)
    inbox.innerHTML="";
    hum.disabled=false;
    comp.disabled=false;
    start.disabled=true;
    count=0;
    ins.innerText="Choose the game mode";
});

comp.addEventListener("click",()=>{
    gameMode=1;
    ins.innerText="You are PLAYER 1 (X) ,give your move";
    input=true;
    hum.disabled=true;
    comp.disabled=true;
    status=1;
});

hum.addEventListener("click",()=>{
    gameMode=2;
    ins.innerText="Okay ! Let's Begin";
    input=true;
    hum.disabled=true;
    comp.disabled=true;
    status=1;
});

inboxes[0].addEventListener("click",()=>
{
    gameplay(0);
});
inboxes[1].addEventListener("click",()=>
{
    gameplay(1);
});
inboxes[2].addEventListener("click",()=>
{
    gameplay(2);
});
inboxes[3].addEventListener("click",()=>
{
    gameplay(3);
});
inboxes[4].addEventListener("click",()=>
{
    gameplay(4);
});
inboxes[5].addEventListener("click",()=>
{
    gameplay(5);
});
inboxes[6].addEventListener("click",()=>
{
    gameplay(6);
});
inboxes[7].addEventListener("click",()=>
{
    gameplay(7);
});
inboxes[8].addEventListener("click",()=>
{
    gameplay(8);
});