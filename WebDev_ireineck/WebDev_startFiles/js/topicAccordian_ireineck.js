//
// I have introduced 9 errors into this file, some syntax, some logic 
// (incorrect method names, selectors, etc...).  Use the comments to guide
// you as they are correct in what the logic is supposed to accomplish.
// 
// You should NOT completely rewrite the code, but fix it to follow
// the comments.
//
// I have also made available a logic (pseudocode) document for this in
// the E360 Assessment lesson as well that contains the correct logic for
// use as a guide if you wish.
//
$(function(){

	//
	// Set up a click event handler for clicked <li>
	//
  	$('#accordion li').click(function() {
		
		// find first ul that is a child of this (the clicked <li>)
		var $nextUL = $(this).children('ul:first');
       
		
		// Select all siblings of the clicked <li> and then 
		// select any direct children <ul>'s 
		// that are visible - this is so we can close any visible
		// <ul> before opening the <ul> for the clicked <li>
		var $visibleSiblings = $(this).siblings().children('ul:visible');
		
		// If any other <ul>s are visible, slide the visible <ul>
		// up and then, after the slide up is complete, slide down 
		// the clicked <li>'s <ul> into view
		if ($visibleSiblings.length > 0) {
	  		
           $visibleSiblings.stop().slideUp('normal', function () {
              $nextUL.stop().slideToggle('normal');
            });
			
		} else  {
			// either no <ul>s were open (open the clicked item)
			// or the user clicked on the currently open one so close it
	   		$nextUL.stop().slideToggle('normal');
		}
  	});
});