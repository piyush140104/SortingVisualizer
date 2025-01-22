const n = 40;
const array = [];
let audioCtx = null;

start();

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

function start() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showBars();
}

function play() {
    const copy = [...array];
    const moves = mergeSort(copy);
    animate(moves);
}

function animate(moves) {
    if (moves.length == 0) {
        showBars();
        return;
    }
    const move = moves.shift();
    const { left, right, merged } = move;
    for (let i = 0; i < left.length; i++) {
        array[i + move.start] = left[i];
    }
    for (let i = 0; i < right.length; i++) {
        array[i + move.start + left.length] = right[i];
    }
    for (let i = 0; i < merged.length; i++) {
        array[i + move.start] = merged[i];
    }
    playNote(440);
    showBars(move);
    setTimeout(function () {
        animate(moves);
    }, 100);
}

function mergeSort(array) {
    const moves = [];
    if (array.length <= 1) return array;

    function mergeSortHelper(arr, start = 0) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = mergeSortHelper(arr.slice(0, mid), start);
        const right = mergeSortHelper(arr.slice(mid), start + mid);

        const merged = [];
        let i = 0, j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                merged.push(left[i]);
                i++;
            } else {
                merged.push(right[j]);
                j++;
            }
        }
        while (i < left.length) {
            merged.push(left[i]);
            i++;
        }
        while (j < right.length) {
            merged.push(right[j]);
            j++;
        }

        moves.push({ left, right, merged, start });

        return merged;
    }

    mergeSortHelper(array);
    return moves;
}

function showBars(move) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        if (move && move.start <= i && i < move.start + move.merged.length) {
            bar.style.backgroundColor = "red";
        }
        container.appendChild(bar);
    }
}