//$(document).ready(function){}
$(function(){
    
    // gaing a refernce to the target element 
   var $theWar = $('p.textDrop');
    
    //Starting scaled up values for "the war"
    $theWar.css({
        "opacity": ".2",
        
        }).css('transform', 'scale(13,9)');
    
    
    
    // animating 'the war' to give an effect as if it 
    // were slaming into the page. 
    $theWar.animate({
        "opacity": ".8" ,
        "transform": "scale (1,1)"
    },1000,'easeInQuint').animate({
        'transform': 'scale (1.25,1.25)'
    },250).animate({
        'transform': 'scale(1,1)'
    },150);
   
   //showing the div#dustPuffs using .show
    $('div#dustPuffs').show(2500);
    
    // animating the span.dustPuffs to give off the 
    //dust flying effect
    $('dustPuffs').delay(2200).each(function(){
        $(this).animate({
            opacity: "2" , 
            transform: 'scale (3,2)'
        },1500);

                             });
   // fade out the div#dustPuffs over 800 milliseconds 
    $('div#dustPuffs').fadeOut(800);
                    
    // Slide 'the war' into it's final position
    $theWar.delay(1500).animate({
    "position": "absolute" ,
    "margin-left": "-404px"
},800,'easeOutElastic');


});