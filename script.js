const n=40;
// 10 elemments
const array=[];

start();

// function playNote(freq)
// {
//     if (audioCtx == null) {
//         audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//     }    
//         const dur=0.1;
//         const osc=audioCtx.createOscillator();
//         osc.frequency.value=freq;
//         osc.start();
//         osc.stop(audioCtx.currentTime+dur);
//         osc.connect(audioCtx.destination);
//         const node=audioCtx.createGain();
//         node.gain.value=0.1;
//         osc.connect(node);
//         node.connect(audio.Ctx.destination);
// }
let audioCtx = null;

function playNote(freq) {
    if (audioCtx == null) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    const node = audioCtx.createGain();

    osc.frequency.value = freq;
    osc.connect(node);
    node.connect(audioCtx.destination);
    
    node.gain.value = 0.1;
    
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
}


function start(){
    for(let i=0;i<n;i++)
    {
        array[i]=Math.random();
            // this array has random values from 0 to 9
    }
    showBars();
}

// function play()
// {
//     const copy=[...array];
//     const swaps=bubbleSort(copy);
//     animate(swaps);
// }
function play()
{
    const copy=[...array];
    const moves=bubbleSort(copy);
    animate(moves);
}

function animate(moves) {
    if (moves.length == 0) {
        // we call showBars so that we can't see the red background at last
        // you see red background when the sorting is running
        // when the sorting is complete
        showBars();
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;
    if (move.type == "swap") {
        [array[i], array[j]] = [array[j], array[i]];
    }
    playNote(440);
    // sound for two bars
    playNote(440);
    showBars(move);
    setTimeout(function() {
        animate(moves);
    }, 100);
}


// function animate(swaps)
// {
//     if(swaps.length==0)
//     {
//         // we call showbars so that we can't see the red bakcground at last
//         // u see red bakcground when the sorting is running
//         // when the sorting is complete
//         showBars();
//         return;    
//     }
//     const[i,j]=swaps.shift();
//     [array[i],array[j]]=[array[j],array[i]];
//     showBars([i,j]);
//     setTimeout(function(){
//         animate(swaps);
//     },30);
// }

// now sorting algorithgm
// function bubbleSort(array)
// {
//     const swaps=[];
//     do{
//         var swapped=false;
//         for(let i=1;i<array.length;i++)
//         {
//             if(array[i-1]>array[i])
//                 {
//                     swapped=true;
//                     swaps.push([i-1,i]);
//                     [array[i-1],array[i]]=[array[i],array[i-1]];
//                 }
//         }   
//     }while(swapped);
//     return swaps;
// }
function bubbleSort(array)
{
    const moves=[];
    do{
        var swapped=false;
        for(let i=1;i<array.length;i++)
        {
            // before comparison
            // moves.push({indices:[i-1,i],type:"comp"});
            if(array[i-1]>array[i])
                {
                    swapped=true;
                    // after comparison
                    moves.push({indices:[i-1,i],type:"swap"});
                    [array[i-1],array[i]]=[array[i],array[i-1]];
                }
        }   
    }while(swapped);
    return moves;
}
// console.log(array) is used to see your array in console


// function showBars(indices)
// {
//     //first empty the container otherwise more elements are appended and bars number increase
//     container.innerHTML="";
//     for(let i=0;i<array.length;i++)
//     {
//         // we create bars using this
//         const bar=document.createElement("div");
//         // height of bars is equal to the value of array*100 and concatenate percentage
//         bar.style.height=array[i]*100+"%";
//         // instead of writing bar width and backgorund here we create a use a class name bar and put styles in css
//         // and us the class in js
//         bar.classList.add("bar");
//         if(indices && indices.includes(i))
//         {
//             bar.style.background="red";
//         }
//         // adding bars to the container using append child function
//         container.appendChild(bar);
//     }
// }


function showBars(move)
{
    //first empty the container otherwise more elements are appended and bars number increase
    container.innerHTML="";
    for(let i=0;i<array.length;i++)
    {
        // we create bars using this
        const bar=document.createElement("div");
        // height of bars is equal to the value of array*100 and concatenate percentage
        bar.style.height=array[i]*100+"%";
        // instead of writing bar width and backgorund here we create a use a class name bar and put styles in css
        // and us the class in js
        bar.classList.add("bar");
        if(move && move.indices.includes(i))
        {
            bar.style.backgroundColor = move.type == "swap" ? "red" : "blue";
        }
        // adding bars to the container using append child function
        container.appendChild(bar);
    }
}