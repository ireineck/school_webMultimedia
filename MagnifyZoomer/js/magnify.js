//$(document).ready(function() {
$(function(){    

    var nativeWidth = 0,
        nativeHeight = 0;
    //
    // When the user moves the mouse anywhere within 
    // the image (div.magnify), do the following
    // 
    $('.magnify').mousemove(function(e) {
        
        // when the user moves the mouse over the image 
        // the script will first calculate the native 
        // dimensions of the image if they don't yet exist. 
        //
        // Only after the native dimensions are available 
        // will the script show the zoomed in version 
        // 
        if (!nativeWidth && !nativeHeight){
            
            // get the image's actual dimensions... 
            //
            // We cannot use img.small because its width attribute 
            // is already specfied to be 600px
            //
            // We will create a new empty Image object and 
            // populate its 'src' property with the value of 
            // our img.small's 'src' property 
            // 
            var imageObject = new Image();
            imageObject.src = $('.small').attr('src');
            
            nativeWidth = imageObject.width;
            nativeHeight = imageObject.height;
            
            
        
        } 
        else {  // either or both nativeWidth and nativeHeight are set        
            
            $target = $(this); // this refers to div.magnify 
            
            // get coordinates of the first element in set of matched 
            // elements (div.magnify) relative to the document (web page)
            var magnifyOffset = $target.offset()
            
           // console.log ('relative to the document\nleft edge of div.magnify = ' + magnifyOffset.left + '\ntop edge of div.mgnify = ' + magnifyOffset.top + '\n\n');
            
           // Deduct left and top offsets to get the postition of the mouse 
            // related to the top and left edges of the image (div.magnify)
            var mouseX = e.pageX - magnifyOffset.left; 
            var mouseY = e.pageY - magnifyOffset.top; 
            
           // console.log ('relative to the document\nleft edge of div.magnify = ' + mouseX + '\ntop edge of div.mgnify = ' +mouseY + '\n\n');
           
            $glass = $('.large');
            glassWidth = $glass.width();
            glassHeight = $glass.height();
            
            if (mouseX > 0 && mouseX < $target.width() && mouseY > 0 && mouseY < $target.height() ){
                
                $glass.fadeIn(100);
                
            }
            else { // mouse if not over the image 
                 $glass.fadeOut(100);
                
            }
            
            // if the magnifying glass is visible , do calulations to zoom to 
            // the correct (corresponing) portion of the large image
            if ($glass.is(':visible')){
               
                var rx = Math.round(mouseX / $('.small').width() * nativeWidth - glassWidth / 2 ) * - 1;
                var ry = Math.round(mouseY / $('.small').height() * nativeHeight - glassHeight / 2 ) * -1;
                
                
                var backgroundPos = rx + "px" + ry + "px";
                
                // new position to move the magnifying glass to on the page
                var posX = mouseX - glassWidth / 2;
                var posY = mouseY - glassHeight / 2;
                
                
                // use jquery's css() method to apply these changes 
                $glass.css({
                    top:    posY,
                    left:   posX,
                    backgroundPosition: backgroundPos
                    
                });
               
                
                
            }
        
        }
            
    
    });
    
});