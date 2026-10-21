let curl = 0;
let originX;
let originY;
let noiseX;
let noiseY;

function setup() {
    createCanvas(800, 500);
    noiseX = random(1000)
    noiseY = random(1000)
}

function draw() {
    background(35, 45, 85);
    drawCreature();
}

function drawCreature() {
    drawSpace()
    originX = constrain(map(noise(noiseX), 0.2, 0.8, 320, width - 130), 320, width - 130);
    originY = constrain(map(noise(noiseY), 0.2, 0.8, 130, height - 130), 130, height - 130);
    if (!mouseIsPressed) {
        noiseX += 0.005;
        noiseY += 0.005;
    }
    push();
    translate(originX, originY);
    curl = lerp(curl, mouseIsPressed ? 1 : 0, 0.08);

    let bodyR = 110 + sin(frameCount * 0.05) * 5;

    drawTail(-bodyR * 0.8, 20, 16);

    drawBody(bodyR);

    drawEye(-38, -20, 50);
    drawEye(38, -20, 50);
    let whiskerLen = 80 * (1 - curl);
    for (let i = -1; i <= 1; i++) {
        drawWhisker(20, 25, i * 0.3, whiskerLen);
        drawWhisker(-20, 25, PI - i * 0.3, whiskerLen);
    }

    pop();
}
function drawSpace() {
    push();

    random(7);
    noStroke();
    for (let i = 0; i < 150; i++) {
        let x = random(width);
        let y = random(height);
        let size = random(1, 3.5);
        fill();
        circle(x, y, size);
    }
    pop();

    drawPlanet(110, 90, 70, color(240, 150, 80), 0.3);
    drawPlanet(720, 410, 40, color(200, 120, 220), -0.5);
}


function drawPlanet(x, y, size, c, tilt) {
    push();
    translate(x, y);
    rotate(tilt);
    noStroke();
    fill(c);
    circle(0, 0, size);
    noFill();
    stroke(255, 230, 180, 180);
    strokeWeight(3);
    ellipse(0, 0, size * 1.9, size * 0.5);
    pop();
}
function drawBody(r) {
    push();
    noStroke();
    fill(20);
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
        let ripple = r + sin(a * 5 + frameCount * 0.05) * 6;
        vertex(cos(a) * ripple, sin(a) * ripple);
    }
    endShape(CLOSE);
    pop();
}

function drawTail(x, y, segments) {
    push();
    translate(x, y);
    rotate(PI);
    stroke(20);
    strokeCap(ROUND);
    for (let i = 0; i < segments; i++) {
        rotate(sin(frameCount * 0.05 - i * 0.4) * 0.2 + curl * 0.3);
        strokeWeight(map(i, 0, segments - 1, 22, 8));
        line(0, 0, 14, 0);
        translate(14, 0);
    }
    pop();
}


function drawEye(x, y, size) {
    push();
    translate(x, y);
    scale(1, 1 - curl * 0.5);

    noStroke();
    fill(lerpColor(color(250, 210, 60), color(230, 30, 30), curl));
    circle(0, 0, size);
    let lookX = map(mouseX, 0, width, -size * 0.15, size * 0.15);
    fill(20);
    ellipse(lookX, 0, size * 0.18, size * 0.75);
    pop();
}

function drawWhisker(x, y, angle, len) {
    push();
    translate(x, y);
    rotate(angle);
    stroke(240);
    strokeWeight(2);
    line(0, 0, len, 0);
    pop();
}


