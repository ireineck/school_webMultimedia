//Ian Reineck
// ireineck@student.cvtc.edu
//2-22-15

$(function(){
   
   // Set height of the #contentWrap and #leftSideBar div's 
   //based on the current height of the div#content
   
   // I was having a hard time using jQuery to adjust the height 
   // so I used this plain old javaScript instead...
    
   adjustHeight($('#content').height());
    
   // set up click events on each of the main navigation links in one jQuery statement
    
   $('nav li').each(function () {
      
      $(this).click(function(e) {
        
         //Grab the content of the clicked link and store 
         // the string in newTopicText
            
         newTopicText = $(this).html() 
            
         // I can get the text by $(newTopicText).text()
            
         var $topic = $('#topic');
           
         // IF the clicked link's content is not already showing 
         if ($(newTopicText).text() != $topic.text()) {
             
            // Fade out current topic and quickly fade in new topic text
            // in the orange box
             
            $topic.stop(true).fadeOut(500, function () {  
               $topic.text($(newTopicText).text()); 
            }).fadeIn(200);     
             
            //Replace primary content area w/ content related to clicked link
            // by sliding Down the new content panel into place 
             
            //use clicked links id and concatenate "Tabs" to it to build
            // an id value stored in newTopic 
             
            var newTopic = $(newTopicText).attr('id') + "Tabs"
             
            //Hide any visible .contentContainer divs
              
            $('div.contentContainer').hide();
             
            //select and slide down correct div using newTopic id value 
             
            $('div#' + newTopic).stop(true).slideDown(300, function (){
                 
               // readjust height here 
                 
               adjustHeight($('#content').height());
              
            });
                
            e.preventDefault()
         
         } // end if 
        
        }); // end of .click 
        
    }); // end of .each  
});

function adjustHeight (height) {
    
   $('#contentWrap').height(height);
   $('#leftSideBar').height(height);

}


