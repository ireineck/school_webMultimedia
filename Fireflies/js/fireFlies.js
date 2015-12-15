function init () {
    
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    
    // initialize variables 
    fireFlies = []; //  same as fireFlies = new Array();
    numFlies = 250;
    angleX = 0;
    angleY = 0;
    range = 1.2;
    xSpeed = 0.7;
    ySpeed = 0.1;
    fps = 15;
    
    
    //
    // Create a batch of FireFly particles and add
    // each new one to our fireFlies array 
    // 
    for (var i = 0; i < numFlies; i++){
        
        // Set some properties that will be used for our particle object 
        xVelocity = randRange(-4, 2);
        yVelocity = randRange(-4, 2);
        
        //
        //we don't want x or y velocity to be around 0
        if (xVelocity < 1 & xVelocity < -1){
        
            xVelocity = -1
        }
        
        if (yVelocity < 1 & yVelocity < -1){
            
            yVelocity = -1
        }
        
        // create a FireFly particle object 
        fireFlies.push(new FireFly(10,canvas.height - 10, 10, canvas.width - 10, xVelocity, yVelocity));
        // FireFly (top, bottom, left, right, xVel, yVel)
        
    }
    
    //
    // Get the firefly animation started using a timer and 
    // have it run repeatedly (heartbeat) until the user leaves the page
    // 
    
    window.requestAnimationFrame = window.requestAnimationFrame ||
                                    window.mozRequestAnimationFrame ||
                                    window.webkitRequestAnimationFrame ||   
                                    window.msRequestAnimationFrame; 
    
    // runo our update() to get started 
    requestAnimationFrame(update);
    
    
    
} // end init()
        
// define a FireFly particle object 
function FireFly (top, bottom, left, right, xVel, yVel){
    
    this.top = top; 
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.xVelocity = xVel;
    this.yVelocity = yVel;
    
    this.x = Math.random() * canvas.width / 2;
    this.y = Math.random() * canvas.height;
    
    this.alpha = randRange(.2, .9);  //opacity 
    
    this.color = 'rgba(153,255,51, ' + this.alpha + ')';
    
    this.radius = randRange(.2,.9);
    
    
}

function randRange (min, max) {
    
    return Math.random() * (max - min) + min; 
}


// 
// draw and animate the fireFly particle objects 
// 
function update () {
    
    // use setTimeout() to set the framerate (frames per second) 
    setTimeout (function () {
        
        
        // clear the canvas(context) so it can be refreshed 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        //Let's draw the Firefly particles from our fireFlies 
        // array onto the cavas 
        for (var i = 0; i < fireFlies.length; i++){
            
            // get the next FireFly object and store it in a variable 
            fly = fireFlies[i]; 
            
            // start drawing the current fireFly particle 
            ctx.beginPath();
            
            // set up a radial gradient 
            var gradient = ctx.createRadialGradient(fly.x, fly.y, 0 , fly.x, fly.y, fly.radius);
            
            //set up color stops for the gradient 
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(0.4, '#00ff00');
            gradient.addColorStop(0.4, fly.color);
            gradient.addColorStop(1, '#aaa');
            
            ctx.fillStyle = gradient; 
            if (Math.random() < 0.9) {
            ctx.arc(fly.x, fly.y, fly.radius, 0, 2 * Math.PI, false);
            
            ctx.fill()
            }
            
           
            // draw the circle for the fireFly 
            
            ctx.closePath();
            
            //Animate the firefly 
            //
            // apply a velocity to change our x and y positions 
            //
            fly.x += fly.xVelocity + Math.cos(angleX) * range;
            fly.x += fly.xVelocity + Math.sin(angleY) * range;
            
            // Alter the angles 
            angleX += xSpeed; 
            angleY += ySpeed;
            
            // Kindr, gentler firefly app...
            //
            // collision detection at boundaries 
            // 
            // keep the flies from leaving the canvas 
            // Any particle passing a boundary should simply 
            // bounce back in . 
            //
            
            // check bottom edge
            if(fly.y >= fly.bottom + 25  && fly.yVelocity > 0) {
                
                fly.y = fly.bottom = 5; 
                fly.yVelocity *= -1;
                
                
                
            }
            // check top edge 
            else if (fly.y <= fly.top - 25 && fly.yVelocity < 0) {
                 
                fly.y = 5 
                fly.yVelocity *= -1;
                
            }
            
            
            
             // check right edge
            if(fly.x >= fly.right + 25  && fly.xVelocity > 0) {
                
                fly.x = fly.bottom = 5; 
                fly.xVelocity *= -1;
                
                
                
            }
            // check left edge 
            else if (fly.x <= fly.left - 25 && fly.xVelocity < 0) {
                 
                fly.x = 5 
                fly.xVelocity *= -1;
                
            }
            
            
            
            
        }
        
        
        requestAnimationFrame(update);
        
    }, 1000 / fps);    
}



