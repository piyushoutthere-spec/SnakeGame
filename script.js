const canvas=document.createElement('canvas');
canvas.width=1100;
canvas.height=500;
canvas.style.backgroundColor="#000";
canvas.style.display="block";
canvas.style.margin="50px auto";
canvas.style.border="4px solid #d31818";
document.body.appendChild(canvas)
document.body.style.backgroundColor="#972";
const btn=document.createElement('button');
btn.textContent="Play Aguinanna";
btn.style.display="none";
btn.style.margin="30px auto";
btn.style.padding="10px 30px";
btn.style.fontSize="37px";
btn.style.cursor="pointer";
btn.style.display="block";
btn.style.display="none";
document.body.appendChild(btn);
const Sbtn=document.createElement('button');
Sbtn.textContent="Start Game ah?";
Sbtn.style.color="#111"
Sbtn.style.display="block";
Sbtn.style.margin="35px auto";
Sbtn.style.padding="10px 35px";
Sbtn.style.fontSize="37px";
Sbtn.style.cursor="pointer";
document.body.appendChild(Sbtn);
const pbtn=document.createElement('button');
pbtn.style.display="block";
pbtn.textContent="pause";
pbtn.style.position="fixed";
pbtn.style.top="20px";
pbtn.style.right="20px";
pbtn.style.padding="10px 20px";
pbtn.style.fontSize="20px";
pbtn.style.cursor="pointer";
pbtn.style.display="none";
document.body.appendChild(pbtn);
const ctx=canvas.getContext('2d');
const gridSize=20;
let s=[
    {x:200,y:200},
    {x:180,y:200},
    {x:160,y:200}
];
let score=0;
let hS=localStorage.getItem("snakeHighScore")|| 0;
let GS=100;
let ApE=0;
let CSc="green";
let iP=false;
const Sc=["green","blue","orange","brown","yellow"]
let bgI=0;
const bgC=["#000000","#1a0033","#330000","#00264d", "#331a00", "#260026","#003333","#330033","#4d0000","#000033"];
function drawSnake(){
    s.forEach(segment=> {
        ctx.fillStyle=CSc;
        ctx.strokeStyle="purple";
        ctx.fillRect(segment.x,segment.y,gridSize,gridSize);
        ctx.strokeRect(segment.x,segment.y,gridSize,gridSize)
    });
}
let X=gridSize;
let Y=0;
function clearCanvas(){
     ctx.clearRect(0,0,canvas.width,canvas.height);
}
document.addEventListener("keydown",D);
function D(event){
    if(event.key===""|| event.code==="Space"){
        iP=!iP;
        if(iP){
            pbtn.textContent="Resume";
        }
        else{
            pbtn.textContent="pause";
            main();
        }
        event.preventDefault();
        return;
    } 
    const U=Y===-gridSize;
    const W=Y===gridSize;
    const R=X===gridSize;
    const L=X===-gridSize;
    if (event.key==="ArrowLeft"&&!R){
        X=-gridSize;
        Y=0;
    }
    if(event.key=== "ArrowUp"&& !W){
        X=0;
        Y=-gridSize;
    }
    if(event.key ==="ArrowRight"&&!L){
        X=gridSize;
        Y=0;
    }
    if (event.key==="ArrowDown"&& !U){
        X=0;
        Y=gridSize;
    }
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.key)>-1){
    event.preventDefault();
    } 
}    
let APX;
let APY;
function randomCoord(min,max){
    return Math.round((Math.random()*(max-min)+min)/gridSize)*gridSize;
}
function generateApple(){
    APX=randomCoord(0,canvas.width-gridSize);
    APY=randomCoord(0,canvas.height-gridSize);
    s.forEach(function checkCollision(segment){
        if(segment.x===APX && segment.y===APY){
            generateApple();
        }
    });
}
generateApple();
function DRAWapple(){
    ctx.fillStyle="red";
    ctx.strokeStyle="darkred";
    ctx.fillRect(APX,APY,gridSize,gridSize);
    ctx.strokeRect(APX,APY,gridSize,gridSize);
}
function moveSnake(){
    const h={
        x:s[0].x+X,
        y:s[0].y+Y
    };
    s.unshift(h);
    const ateAAA=s[0].x===APX&& s[0].y===APY;
    if(ateAAA){
        score+=15;
        ApE+=1;
        bgI=(bgI+1)%bgC.length;
        canvas.style.backgroundColor=bgC[bgI];
        if (ApE%5===0){
            let colorIndex=(ApE/5)%Sc.length;
            CSc=Sc[colorIndex];
        }
        if(GS>50){
            GS-=2;
        }
        if(score>hS){
            hS=score;
            localStorage.setItem("snakeHighScore",hS);
        }
        sB.textContent="Score:"+score+"|HIGH Score:"+hS+"|Length:"+s.length;
        generateApple();
    }
    else{
        s.pop()
    }
}
function HAE(){
    for(let k=4;k<s.length;k++){
        const collided=s[k].x===s[0].x && s[k].y===s[0].y;
        if(collided){
            return true;
        }
    }
    const hLw=s[0].x<0;
    const hRw = s[0].x> canvas.width -gridSize;
    const hTw =s[0].y<0;
    const hBw=s[0].y>canvas.height-gridSize;
    return hLw ||hRw || hTw|| hBw;
}
function main(){
    if(iP){
        return;
    }
    if (HAE()){
        ctx.fillStyle="purple";
        ctx.font="34px Times New Roman";
        ctx.textAlign="center";
        ctx.fillText("Game DUDUDONN!!",canvas.width/2,canvas.height/2);
        btn.style.display="block";
        pbtn.style.display="none";
        return;
    }
    setTimeout(function onTick(){
        clearCanvas();
        DRAWapple();
        moveSnake();
        drawSnake();
        main();
    },GS);
}
const sB=document.createElement('div');
sB.textContent="$core:"+score+"|High Score:"+hS+"|Length:"+s.length;
sB.style.color="#111";
sB.style.fontFamily="Arial";
sB.style.fontSize="29px";
sB.style.textAlign="center";
sB.style.marginTop="20px";
document.body.insertBefore(sB,canvas);
btn.onclick=function(){
    btn.style.display="none";
    s=[
        {x:200,y:200},
        {x:180,y:200},
        {x:160,y:200}
    ];
    X=gridSize;
    Y=0;
    score=0;
    ApE=0;
    CSc="lime";
    GS=100;
    bgI=0;
    canvas.style.backgroundColor=bgC[0];
    sB.textContent="Score:"+score+"|HIGH Score:"+hS+"|Length:"+s.length;
    main();
};
Sbtn.onclick=function(){
    Sbtn.style.display="none";
    pbtn.style.display="block";
    generateApple();
    main();
};
pbtn.onclick=function(){
    iP=!iP;
    if (iP){
        pbtn.textContent="Resume";
    }
    else{
        pbtn.textContent="pause";
        main();
    }
};    

