function createCircle()
{
    return{
        x : random(width),
        y : height / 2,
        dx : random(5) - 2,
        dy : random(2) - 1,
        radius : random(100),
        updatePos()
        {
            this.x += this.dx;
            this.y += this.dy;
            // this.dx += random(2) - 1;
            // this.dy += random(2) - 1;
        },
        overlaps(circle2)
        {
            let distance = Math.sqrt(Math.pow(this.x - circle2.x, 2) + Math.pow(this.y - circle2.y, 2));
            if(distance < this.radius + circle2.radius)
            {
                // Circles overlap
                let color = map(distance, 0, 200, 0, 255);
                stroke(0, 0, color, 25);
                fill(0, 0, color, 25);
                line(this.x, this.y, circle2.x, circle2.y);
            }
        }
    }
    
}

let circles = []
const simSize = 100
let running = true;

function setup()
{
    background(255);
    createCanvas(window.innerWidth, window.innerHeight);
    for(let i = 0; i < simSize; i++){
        circles.push(createCircle());
    }
    frameRate(60);
}

function keyPressed()
{
    if(keyCode === ENTER)
    {
        if(running == true)
        {
            running = false;
            noLoop();
        }
        else
        {
            running = true;
            loop();
        }
    }
}

function draw()
{
    // All possible combinations of collisions to check
    for(let i = 0; i < circles.length - 1; i++){
        for(let j = i + 1; j < circles.length; j++){
            let circ1 = circles[i];
            let circ2 = circles[j];
            circ1.overlaps(circ2);
        }
    }

    // All possible combinations of collisions to check
    for(let i = 0; i < circles.length; i++){
        let circle = circles[i];
        circle.updatePos();
    }
}