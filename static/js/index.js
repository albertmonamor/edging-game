
const RED = "#822c27";
const INFINITE = 10000000;
const GREEN = "#2e9132";
var LOCK_TASKS = false;

const warmupRound = {"task":"this is the warmup round, touch yourself and get ready to cum on the cum round!", "time": 5000};

const shortTasks = {
    "1":{"task":"don't touch", "time":5000},
    "2":{"task":"touch your titties", "time":7000},
    "3":{"task":"hands up!", "time":7000 },
    "4":{"task":"lick and suck on your fingers", "time":7000 },
    "5":{"task":"bite your lips", "time":7000 },
    "6":{"task":"think.. idk", "time":7000 },
//    "7":{"task":"don't touch",  "time":7000},
//    "8":{"task":"don't touch",  "time":7000},
//    "9":{"task":"don't touch",  "time":7000},
//    "10":{"task":"don't touch", "time":7000}
}
const longTasks= {
    "1":{"task":"touch yourself slowly", "time":10000},
    "2":{"task":"touch yourself fast!", "time":15000},
    "3":{"task":"finger yourself", "time":20000 },
    "4":{"task":"touch your body slowly, everywhere but your dick/ pussy!", "time":15000 },
    "5":{"task":"hey, you two - fuck", "time":12000 },
//    "6":{"task":"don't touch", "time":10000 },
//    "7":{"task":"don't touch",  "time":20000},
//    "8":{"task":"don't touch",  "time":13000},
//    "9":{"task":"don't touch",  "time":18000},
//    "10":{"task":"don't touch", "time":10000}
}
const cumRound = {
"1":{"task": "cum right now!","time":20000 },
"0":{"task": "sorry, you can't cum today!","time":INFINITE}
}

/**
 * 
 * @param {Number} ms 
 * @returns 
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
/**
 * 
 * @param {Number} level 
 */
function setBackgroundLevel(level){
    
    // 1: menu & options
    // 2: start game level 1
    // 3: ...

    const elem_bg = document.body.style;
    const template = "radial-gradient(circle at center,";
    switch (level){
        case 1:
            // green
            elem_bg.backgroundImage = template+"rgb(47,60,47), rgb(23, 23, 23))";
            break;
        case 2:
            // red
            elem_bg.backgroundImage = template+"rgb(100,28,34), rgb(23,23,23))";
            break;
        case 3:
            // ping
            elem_bg.backgroundImage = template+"rgb(117,35,89), rgb(23, 23, 23))";
            break;
        case 4:
            elem_bg.backgroundImage = template+"rgb(52,89,89),rgb(23, 23, 23)) "
        default:
            break;
    }
}

function getCumRound(cum){
    return cumRound[cum]; // {task:1, time:1};
}
function getDuration(duration){
    // default
    var roundCount;
    console.log(duration);
    switch(duration){
        case "short":
        // = 5 rounds
            roundCount = 5;
            break;
        case "normal":
        // = 10 rounds
            roundCount = 10;
            break;
        case 'long':
        // = 15 rounds
            roundCount = 15;
    
            break;
        case 'very long':
        // = 25 rounds
            roundCount = 25;
            break;
        default:
            break;
    
    
    }
    console.log(roundCount);
    return roundCount;
        
}


// duration : short - 5 rounds | normal - 10 rounds | long - 15 rounds | very long - 25 rounds
// difficulty: easy - short tasks and long breaks| normal - one long task, one short task | hard - tasks take longer each round, short brakes
// cum: yes | no | maybe (random)


const taskBar = document.getElementById('task');
var roundCount = 0;


/**
 *
 * @param {String} words
 * @param {Element} element
 */
async function startGame(){
    // 1: duration
    var duration = document.getElementById("duration").value;
    // 2: level of difficulty
    var difficulty = document.getElementById("difficulty").value;
    // 3: Yes / No / random by computer 
    var cum = document.getElementById("cum").value;

    // hide & set background & show the Progress bar 
    setTaskPage();
    
    // get duration 
    var roundCount = getDuration(duration);
    var canCum = getCumRound(cum);
    // start game 
    const tasks = await manageTasks2(roundCount, warmupRound, canCum);
    //setTaskScreen(canCum? cumRound[0]:cumRound[1]);


}

// 1: manageTask

// 2: setTaskScreen
// 3: setProgressBar 

async function manageTasks2(numOfRounds, warmupTask, canCum){
    // 1: first round
    let task;
    let totalRounds = numOfRounds+1;
    // start!!
    for (round=0;round<=totalRounds;round++){
        while (LOCK_TASKS){
            await sleep(20);

        }
        if(round==0){
            task = warmupTask; 
            // new color: pink
            setBackgroundLevel(4);
            setTaskScreen(task);
            await sleep(task.time);
            continue;
        }
        else if(round==totalRounds){
            console.log("hey, its cum round!!!")
            task = canCum;
            setTaskScreen(task, true);
            await sleep(task.time);
            continue;
        }
        else if(round%2 == 0){
            // SHORT task
            task = getShortTask();
            // new color: red
            setBackgroundLevel(2);

        }
        else{
            // get LONG task
            task = getLongTask();
            // new color: green
            setBackgroundLevel(1);
        }


        setTaskScreen(task);
        await sleep(task.time);
    }
}


function getShortTask(){

    return getRandomTaskObject(shortTasks);
//    setTaskScreen(task);
}


function getLongTask(){
     return getRandomTaskObject(longTasks);
//     setTaskScreen(task);

}

function getRandomTaskObject(arr){
    // Object.keys(s).length;
    
 // get random index value
    var index = Math.floor(Math.random() * Object.keys(arr).length+1);
    const task = arr[index];
    return task;
}


function setTaskPage(){
    // hide
    // 1: menu
    // 2: footer
    // 3: icon
    hideHomeScreen();

    // set bg color BLACK
    setBackgroundLevel(1);

    // change timer/ progress bar visibility!
    // TODO
}

function setTitle(msg){
    taskBar.innerHTML = msg;
}
// 
async function setProgressBar(ms, isCumRound = false){
    // pass time to animation
    LOCK_TASKS = true;
    // element of progress
    const progress = document.getElementById("status");
    // add animation
    progress.style.animation = "p-bar-animation 1s infinite";
    let time = ms/100;
    for (position=0;position<=100;position++){
        progress.value = position;
        await sleep(time);
        if(isCumRound){
            position%2==0? setBackgroundLevel(1):setBackgroundLevel(3);
        }
    }
    // clear animation
    progress.style.animation = '';
    // sleep 2 second between rounds
    await sleep(1000);
    // SUCCESS & end
    LOCK_TASKS = false;

}


function setTaskScreen(task, isCumRound = false){
    // 1: new title
    setTitle(task.task);
    // 2: reset Progress bar with new time
    setProgressBar(task.time, isCumRound);

}

function hideHomeScreen(){

    var hiddenContent = document.getElementsByClassName("wel-body")[0];
    // hide body of welcome
    hiddenContent.style.display = "none";
    // hide icon
    document.getElementById("wel-icon").style.display ="none";
    // show GAME
    document.getElementById("bodygame").style.display = "block";
    document.getElementsByTagName("footer")[0].remove();
    // set to center
    const home = document.getElementById("home-elem");
    // idk
    //home.classList.add("mrgn20c"); 

}

function willCum(){
    return Math.random() < 0.5;
    // return a true (cum) or false (don't)
    // after cum round the game is over
}












