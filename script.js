let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let status = document.getElementById("status");

canvas.width = 420;
canvas.height = 560;

let currentFilter = "none";

navigator.mediaDevices.getUserMedia({video:true}).then(stream=>{
video.srcObject = stream;
});

function setFilter(f){
currentFilter = f;
video.style.filter = f;
canvas.style.filter = f;
}

let model;

cocoSsd.load().then(m=>{
model = m;
status.innerText = "IA pronta 🚀";
loop();
});

function detectFrame(){
model.detect(video).then(predictions=>{

ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(video,0,0,canvas.width,canvas.height);

// overlay
ctx.strokeStyle="lime";
ctx.lineWidth=2;

let scene = "Ambiente normal";

predictions.forEach(p=>{
ctx.beginPath();
ctx.rect(...p.bbox);
ctx.stroke();

ctx.fillStyle="lime";
ctx.fillText(p.class, p.bbox[0], p.bbox[1]-5);

if(p.class==="person") scene="Pessoa detectada";
if(p.class==="motorcycle") scene="Moto detectada 🏍️";
if(p.class==="car") scene="Carro detectado 🚗";
});

status.innerText = scene;

requestAnimationFrame(detectFrame);
});
}

function loop(){
detectFrame();
}

function takePhoto(){
let link=document.createElement("a");
link.download="ai-photo.png";
link.href=canvas.toDataURL();
link.click();
}
