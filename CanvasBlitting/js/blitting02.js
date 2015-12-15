var context,
    x = 0, 
    destX = 0,
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
    context = (blitCanvas = document.getElementById('myCanvas')).getContext('2d');
    
    // add a 'mousedown' event to the cnavas
    blitCanvas.addEventListener('mousedown', function(e){
        
      if (e.offsetX){
          
          offsetX = e.offsetX;
          offsetY = e.offsetY;
          
          
      }
      else{
           offsetX = e.layerX;
           offsetY = e.layerY;
        }
        //check if the user has moused down over one of our thumbnails
        // by checking the y-position of the mouse
         //
        //offsetX and offsetY properties are relative to the parent container
        // whereas pageX and pageY are relative to the edges of the document 
        //(mouse related properties)
        if(offsetY >= 0 && offsetY < 54){
            
            //calculate the x-position of the mouse to determine 
            // which thumbail they have chosen 
            x = Math.floor(offsetX / 35.7) * 500;
            
        }
//        else if (e.pageY < 52) {
//            
//            x = Math.floor(e.pageX / 35.7) * 500;
//            
//            
//        }
//        
    
    },false);
    
    makeThumbs (); // create our thumbails 
    
    // set up 'heartbeat' for our animation 
    setInterval(update,1); // call update() every 1 hundreth of a second
    
}

function makeThumbs(){
    
    // step through the phots array and create a thumbnail for each image
    for(var i = 0; i < photos.length; i++) {
        context.drawImage(photos[i], 0, 0, picWidth, picHeight, i * 35.7, 0, 33.7, 52);
    
    }
    
    
}





//
//update() will be called every 10milliseconds until the user 
// leaves the page -- heartbeat (ticker).
//
// we'll update properties needed to achieve a smooth animation 
// in here..
//
function update() {

    destX += (x - destX) * 0.1; 
    
    //
    // Determine which image we want next by dividing 
    // current x-position by the width of each image 
    // 
    picIndex = Math.floor(destX / picWidth);
    
    testInfo.innerHTML = 'picIndex is now = ' + picIndex;
    
    // Get the remainder of dividing x by image width 
    offset = destX % picWidth;
    
//    context.clearRect(0, 0, blitCanvas.width, blitCanvas.height);
    
    // Draw our images onto our canvas using the context's
    // drawImage() method
//    contex.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX,destY,destWidth,destHeight);
    
    
    
    
    context.drawImage(photos[picIndex], offset, 0, picWidth - offset, picHeight, 0, 54, picWidth - offset, picHeight); 
    
    context.drawImage(photos[picIndex + 1], 0, 0, picWidth, picHeight, picWidth - offset, 54, picWidth, picHeight);
    
}