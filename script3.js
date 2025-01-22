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
    const moves = quickSort(copy);
    animate(moves);
}

function animate(moves) {
    if (moves.length == 0) {
        showBars();
        return;
    }
    const move = moves.shift();
    if (move.type === "swap") {
        const [i, j] = move.indices;
        [array[i], array[j]] = [array[j], array[i]];
    }
    playNote(440);
    showBars(move);
    setTimeout(function () {
        animate(moves);
    }, 100);
}

function quickSort(array) {
    const moves = [];

    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low;
        for (let j = low; j < high; j++) {
            // moves.push({ type: "compare", indices: [j, high] });
            if (arr[j] < pivot) {
                moves.push({ type: "swap", indices: [i, j] });
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }
        moves.push({ type: "swap", indices: [i, high] });
        [arr[i], arr[high]] = [arr[high], arr[i]];
        return i;
    }

    function quickSortHelper(arr, low, high) {
        if (low < high) {
            const pi = partition(arr, low, high);
            quickSortHelper(arr, low, pi - 1);
            quickSortHelper(arr, pi + 1, high);
        }
    }

    quickSortHelper(array, 0, array.length - 1);
    return moves;
}

function showBars(move) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type === "swap" ? "green" : "blue";
        }
        container.appendChild(bar);
    }
}