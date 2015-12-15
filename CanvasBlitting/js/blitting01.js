var context,
    x = 0, 
    picIndex, // index into the photos array we want to blit  
    offset, 
    photos = new Array(),
    numPics = 14,
    picWidth = 500,
    picHeight = 750,
    testInfo = document.getElementById('testInfo');

//
// add all of our images to the photos array 
// 
for (var i = 1; i <= numPics; i++){
    
    //preload images... 
    var imageObject = new Image();
    
    imageObject.src = 'images/pic' + i + '.jpg';
    //<img src = "images/pic#.jpg">
    
    
    // add the image object to the end of our photos array 
    photos.push(imageObject);

}

//
// Now, all of our images are stored, in order, in the 
// photos array so let's get our app effect started...
//
function init(){
    context = document.getElementById('myCanvas').getContext('2d');
    
    // set up 'heartbeat' for our animation 
    setInterval(update,10); // call update() every 1 hundreth of a second
    
}

//
//update() will be called every 10milliseconds until the user 
// leaves the page -- heartbeat (ticker).
//
// we'll update properties needed to achieve a smooth animation 
// in here..
//
function update() {
    
    x += (slider.value - x) * 0.1;
    
    //
    // Determine which image we want next by dividing 
    // current x-position by the width of each image 
    // 
    picIndex = Math.floor(x / picWidth);
    
    testInfo.innerHTML = 'picIndex is now = ' + picIndex;
    
    // Get the remainder of dividing x by image width 
    offset = x % picWidth;
    
    // Draw our images onto our canvas using the context's
    // drawImage() method
//    contex.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX,destY,destWidth,destHeight);
    context.drawImage(photos[picIndex], offset, 0, picWidth - offset, picHeight,0,0,picWidth - offset, picHeight); 
    
    context.drawImage(photos[picIndex + 1], 0, 0, picWidth, picHeight, picWidth - offset, 0, picWidth, picHeight);
    
}