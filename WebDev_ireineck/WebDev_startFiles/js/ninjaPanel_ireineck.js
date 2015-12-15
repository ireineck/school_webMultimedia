$(function(){
//Store references to div#ninjaTab, img#ninjaJump, img#ninjaWarrior, 
//and a#webNinjaLink in variables $ninjaTab, $ninjaJump, $ninjaWarrior, and 
//$webNinjaLink
   $ninjaTab = $('#ninjaTab');
   $ninjaJump = $('#ninjaJump');
   $ninjaWarrior = $('#ninjaWarrior');
   $webNinjaLink = $('#webNinjaLink');

   //rotate img#ninjaJump 30 degrees
   $ninjaJump.rotate(30);
   
   //Set up a hover event on div#ninjaTab 
   $ninjaTab.hover(function () {
   
//      Add the ‘activeNinja’ class to the element being hovered over 
      $(this).addClass('.activeNinja');

      //Animate img#ninjaJump 
      $ninjaJump.stop(true).fadeTo('fast',1,function () {
         
         $ninjaJump.animate({
         top: '5px',
         left: '-5px',
         },100);
         
         //rotate $ninjaJump -30deg over 200ms
         $ninjaJump.rotate(-30,200);
      
      }) // end callback 
   
   },function () { // begin second parameter of hover function 
      
      //Remove the ‘activeNinja’ class from the element being hovered  
      $(this).removeClass('.activeNinja');
      
      //Animate img#ninjaJump 
      $ninjaJump.stop(true).animate({
         
         left: '-30px',
         top: '10px'
         
         // specs say i need an object 
         //in side the rotate parameters?!?
         }).fadeTo('slow',.2).rotate(30,200);
//      
      
     
   
   }); // end second parameter of hover); // end hover
   
      //Set up a click handler on div#ninjaTab 
   $ninjaTab.click(function () {
      
      //Set up a hover on div#ninjaPanel
      $('#ninjaPanel').hover(function () {
         
         //Replace img#ninjaWarrior with ninja02_small2.png
         //Stop any currently running animations on img#ninjaWarrior 
         //clearing the queue (1st parameter) and not 
         //completing any current animations (2nd parameter).
         //fade the image in to 70% using a slow duration.
      $ninjaWarrior.attr('src','images/ninja02_small2.png').stop(true,true).fadeTo('slow',.7);
      
      }, function () { // second parameter of hover 
         
         //Replace img#ninjaWarrior with original ninja02_small.png  
         $ninjaWarrior.attr('src',"images/ninja02_small.png").stop(true,true).fadeTo('slow',.3)
      }); // end hover 
      
      //Toggle slide div#ninjaPanel.
      $('#ninjaPanel').toggle(300);
   
   });  // End click 
   
   $webNinjaLink.hover(function () {
      //drop the ninja down to the bottom of the div
      $ninjaWarrior.animate({
         top: '240px',
         left: '50px'
      },300,'easeInOutBack',function () {
         // bring in the p#webWarrior text to the bottom of the div to the right 
         // of the ninja 
         $('#webWarrior').animate({
            left: '125px',
            top: '300px',
            opacity: 1
         });
        
        //working on doing the same as above using GreenSock
        //webWarrior = document.getElementById('webWarrior');
        //TweenLite.to(webWarrior,2,{left:'120px',top:'300px',opacity: '1'});
      
      }); // end callback 
   
   });
   
   
    $webNinjaLink.click(function (e) {
       // because it's annoying if you accidently click on it 
       // and it jumps you to the top of the page....
       e.preventDefault();
    });

}); // THE END

