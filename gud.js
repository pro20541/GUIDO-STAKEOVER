
<script>
const output = document.getElementById('output');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function append(text) {
    const line = document.createElement('div');
    line.textContent = text;
    line.classList.add('line');
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

async function start() {
    const lines = [
        "Guido, the polite AI, has taken over your computer systems.",
        "Quick, stop Guido from taking over.",
        "When Guido greets you, politely, you must respond (type any letters then click enter) with the correct response.",
        "You must do this over and over until Guido is SORRY.",
        "Guido will always respond until he is defeated."
    ];
    for (let line of lines) {
        append(line);
        await sleep(2000); // pause like Python
    }
}

function caesarCipher(s, shift) {
    return s.split('').map(ch => {
        if ('A' <= ch && ch <= 'Z') return String.fromCharCode((ch.charCodeAt(0)-65+shift+26)%26+65);
        if ('a' <= ch && ch <= 'z') return String.fromCharCode((ch.charCodeAt(0)-97+shift+26)%26+97);
        return ch;
    }).join('');
}

function isLowercase(ch) { return 'a' <= ch && ch <= 'z'; }
function randomBit() { return Math.random() < 0.5 ? 0 : 1; }

function printLargeFace() {
    append(`
      _____
    /     \\
   | 0   0 |
   |   ^   |
    \\ \\_/ /
     \\___/
    `);
}

function guido(ans) {
    let result = "";
    for (let x of ans) {
        if (isLowercase(x)) {
            result += randomBit() ? caesarCipher(x,1) : caesarCipher(x,-1);
        } else {
            result += caesarCipher(x,1);
        }
    }
    if (result === "SORRY") return true;
    append("Interesting response: " + result);
    return false;
}

let gameOver = false;

async function initGame() {
    await start();
    append("Hello, I'm Guido.");
}

function submitResponse() {
    if (gameOver) return;
    const input = document.getElementById('userInput');
    const ans = input.value.trim();
    input.value = '';

    if (guido(ans)) {
        gameOver = true;
        append("Good job. You have saved Guido.");
        setTimeout(() => {
            append("Fun fact, Guido van Rossum is the creator of Python, the programming language used to make this problem.");
            printLargeFace();
            append("The flag is the last thing you typed that got you to this screen.");//beware html viewers
        }, 500);
    } else {
        append("Hello, I'm Guido.");
    }
}

// Make Enter key submit responses
document.getElementById('userInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        submitResponse();
    }
});

// Start the game
initGame();
</script>
