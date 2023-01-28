var container = document.querySelector('#container');
var ball = document.querySelector('.ball');
var rod1 = document.querySelector('.rod1');
var rod2 = document.querySelector('.rod2');
var timer = document.querySelector('.timer h1');
var sr1 = document.querySelector('.sr1 h1');
var sr2 = document.querySelector('.sr2 h1');

// initial conditions
var ballIniLeft = ball.getBoundingClientRect().left - container.getBoundingClientRect().left - 2; //verified
var rodIni = rod1.getBoundingClientRect().left - container.getBoundingClientRect().left - 2; //verified
var ballIniTop = rod1.getBoundingClientRect().height; //verified 
var ballIniBottom = container.getBoundingClientRect().height - rod2.getBoundingClientRect().height - ball.getBoundingClientRect().height - 4;

//extreme conditions
var ballRight = container.getBoundingClientRect().width - ball.getBoundingClientRect().width -4;
var ballLeft =0; 
var ballTop = 0;
var ballBottom = container.getBoundingClientRect().height - ball.getBoundingClientRect().height -4;
var rodRight = container.getBoundingClientRect().width - rod1.getBoundingClientRect().width-4;

//local storage
window.localStorage.setItem("Rod1", 0);
window.localStorage.setItem("Rod2",0);
var rod1Score = 0;
var rod2Score = 0;

let time= 100;

var started = false;
var rodLeft = rod1.getBoundingClientRect().left - container.getBoundingClientRect().left -2;

function invoke(){
    resetGame(0,0);
    if(rod1Score==0 && rod2Score==0 && localStorage.getItem('Rod1')==0 && localStorage.getItem('Rod2')==0){
        alert("This is the first time you are playing this game. LET'S START, please click 'ENTER' ");
    }else if(rod1Score>rod2Score && rod1Score>Math.max(localStorage.getItem('Rod1'),localStorage.getItem('Rod2'))){
          localStorage.setItem('Rod1',rod1Score*10);
        alert('Rod-1 has maximum score of ' + (localStorage.getItem('Rod1')) + " PLEASE ENTER TO GET STARTED AGAIN");
    }else if(rod2Score>=rod1Score && rod2Score>Math.max(localStorage.getItem('Rod1'),localStorage.getItem('Rod2'))){
        localStorage.setItem('Rod2',rod2Score*10);
        alert('Rod-2 has maximum score of ' + (localStorage.getItem('Rod2')) + " PLEASE ENTER TO GET STARTED AGAIN");
    }
    time = 100;
    timer.innerText = time+ " sec";
    rod1Score=0;
    rod1Score=0;
    sr1.innerText = rod1Score;
    sr1.innerText = rod1Score;
}

function betweenInv(){
    alert('Time Remaining: ' + time + "sec\n" + "Current Score- Rod1:"+ (rod1Score*10) + "points \t  Rod2:" + (rod2Score*10) + " points\n" + "Please 'Enter' to proceed furthur");
}


function start(){
    let bL = ballIniLeft;
    let factorLeft, factorTop;
    let bT;
    if(rod2Score>rod1Score){
        bT = rod1.getBoundingClientRect().height;
        factorLeft = -2;
        factorTop = 2;
    }else{
        bT = container.getBoundingClientRect().height - ball.getBoundingClientRect().height - rod2.getBoundingClientRect().height -4;
        factorLeft = 2;
        factorTop = -2;
    }
    let count = 0;
    var terminate = setInterval(function(){
        count++;
        bL += factorLeft;
        bT += factorTop;
        if(bL>ballRight){
            factorLeft = -2;
            bL += factorLeft;
        }
        else if(bL<ballLeft){
            factorLeft = 2;
            bL += factorLeft;
        }
        if(count==100){
            time--;
            timer.innerText = time+ " sec";
            count=0;
        }
        
        if(rod1Collide()){
            factorTop = 2;
            bT += factorTop;
        }
        if(rod2Collide()){
            factorTop = -2;
            bT += factorTop;
        }
        if(bT<ballTop){
            rod2Score++;
            sr2.innerText = rod2Score*10;
            clearInterval(terminate);
            resetGame(rod1Score,rod2Score);
        }
        if(bT>ballBottom){
            rod1Score++;
            sr1.innerText = rod1Score*10;
            clearInterval(terminate);
            resetGame(rod1Score,rod2Score);
        }
        if(time==0){
            clearInterval(terminate);
            invoke();
        }
        ball.style.left = bL + "px";
        ball.style.top = bT + "px";
    },10);      
            
}

function rod1Collide(){
    let ballCorr = ball.getBoundingClientRect();
    let rod1Corr = rod1.getBoundingClientRect();
    if(ballCorr.left>=rod1Corr.left && ballCorr.right<=rod1Corr.right && (parseInt(ballCorr.top-rod1Corr.bottom)<=0)){
        return true;
    }else{
        return false;
    }
}
function rod2Collide(){
    let ballCorr = ball.getBoundingClientRect();
    let rod2Corr = rod2.getBoundingClientRect();
    if(ballCorr.left>=rod2Corr.left && ballCorr.right<=rod2Corr.right && (parseInt(rod2Corr.top-ballCorr.bottom)<=0)){
        return true;
    }else{
        return false;
    }
}
function resetGame(r1,r2){
    
    ///console.log(r1,r2);
        rod1.style.left = rodIni + "px";
        rod2.style.left = rodIni + "px";
        ball.style.left = ballIniLeft + "px";
        rodLeft = rodIni;
        started = false;
    if(r1 < r2){
         ball.style.top = 1.9 + "em";
    }else{    
        ball.style.bottom = 1.9 + "em";
    }
    
    betweenInv();
}



window.addEventListener('keydown',function(event){
    if(event.keyCode == 13){
        if(!started){
            // alert('Time Limit: ' + time +  'sec\n');
            // betweenInv();
            start();
            started = true;
        }
    }else if(event.keyCode == 65 || event.keyCode == 37){
        rodLeft -= 10;
        if(rodLeft <0){
            rodLeft +=10;
        }
        rod1.style.left = rodLeft + "px";
        rod2.style.left = rodLeft + "px";
    }else if(event.keyCode == 68 || event.keyCode == 39){
        rodLeft +=10;
        if(rodLeft > rodRight){
            rodLeft -=10;
        }
        rod1.style.left = rodLeft + "px";
        rod2.style.left = rodLeft + "px";
    }

});
invoke();