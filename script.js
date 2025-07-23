const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sizePicker = document.getElementById('sizePicker');
const clearButton = document.getElementById('clearButton');
const exampleLetter = document.getElementById('exampleLetter');
const colors = document.querySelectorAll('.color');

let painting = false;
let brushColor = '#000000';

colors.forEach(color => {
  color.addEventListener('click', () => {
    brushColor = color.getAttribute('data-color');
  });
});

function startPosition(e) {
  painting = true;
  draw(e);
}

function endPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = sizePicker.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = brushColor;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseleave', endPosition);

clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function changeLetter(letter) {
  exampleLetter.textContent = letter;
}
