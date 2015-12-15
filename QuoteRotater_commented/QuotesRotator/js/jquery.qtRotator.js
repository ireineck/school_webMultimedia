/**
 * jquery.qtRotator.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
 
 // Resources:
// 		http://extraordinarythoughts.com/2011/08/20/understanding-jquery-plugins
//		https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Closures

//
// Wrap our plugin logic in an anonymous function which will
// be run immediately.  To ensure that our use of the $ sign 
// as a shorthand creates no conflicts between jQuery and other 
// JavaScript libraries, we simply pass jQuery to this closure, which 
// maps it to the dollar sign, thus ensuring that it can’t be 
// affected by anything outside of its scope of execution.
//
/* A closure is a special kind of object that combines two things: a function, and the environment in which that function was created. The environment consists of any local variables that were in-scope at the time that the closure was created.*/
//
// window (local) will be passed in the global window object for
// slightly better performance (see comment at end of code).
//
// undefined is used here as the undefined global
// variable in ECMAScript 3 and is mutable (i.e. it can
// be changed by someone else). undefined isn't really
// being passed in so we can ensure that its value is
// truly undefined. In ES5, undefined can no longer be
// modified.
//
// The semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
//
;( function( $, window, undefined ) {

/* An immediate (anonymous) function is, as its name insinuates, a function. What’s unique about it is it’s enclosure in parenthesis, this makes everything inside the function run within a local scope. This does not mean the DOM (global) is protected, but rather all public variables and object namespaces are inaccessible. This makes a perfect start for defining variables and objects to your hearts content without interfering with existing code. 

Now since all public variables are inaccessible, that could be a problem seeing jQuery itself is, in fact, a public variable. Just like any function, immediate functions can be passed variables and objects are passed by reference. We can just pass jQuery into our immediate function. */

	'use strict';

	// Set up use of Modernizr to do CSS3 feature detection in 
	// the user's browser
	var Modernizr = window.Modernizr;

	//
	// Constructor function for the QTRotator "class" - 
	// invoked below in the $.fn.qtRotator plugin function 
	// definition via the new keyword.  Note that the two 
	// parameters are passed in by that call.
	//
	// The $.QTRotator is creating the constructor function 
	// as a method of jQuery thus 'extending' the jQuery library 
	// so to speak.
	//
	// options - passed in options to the plugin when it is called
	//
	// element - here, a single DOM element from the matched set 
	// of elements the plugin method is being applied to
	//
	$.QTRotator = function( options, element ) {
	
		// Select element via jQuery that we are applying our 
		// plugin too (here div#quoteRotator) and store in the $el property of this 
		// QTRotator object
		this.$el = $( element );
		
		// Call the private _init() method of this QTRotator 
		// object passing it the passed-in options.  
		//
		// ***Note that beginning the method's name with an 
		// underscore is a convention for showing the method is 
		// private to this object.
		this._init( options );
		
	};

	// Assign an object literal containing the options default values to 
	// a property of our QTRotator object named defaults
	$.QTRotator.defaults = {
	
		// default transition speed (ms)
		speed : 700,
		
		// default transition easing
		easing : 'ease',
		
		// rotator interval (ms)
		interval : 8000
		
	};

	//
	// When creating a new object/class in JavaScript, methods should normally be 
	// associated to the object's prototype (inherited object 
	// property) rather than defined into the object constructor. 
	//
	// The reason is that whenever the constructor 
	// is called the methods would get reassigned (that is, 
	// for every object creation).
	//
	// This will allow the inherited prototype to be shared by all 
	// instantiated QTRotator objects and the method 
	// definitions need not occur at every object creation.
	//
	// So, let's define the QTRotator object's (or class) 
	// methods as part of QTRotator's
	// inherited prototype property (which is also an object).
	//
	$.QTRotator.prototype = {
	
		// this here refers to the current QTRotator object 
		// being constructed...
		
		_init : function( options ) {

			// options setup - the jQuery.extend() function will merge 
			// the contents of two (or more) objects together into 
			// the target object (here the empty {} object 
			// literal).  The first (optional) boolean parameter is 
			// turning on a "deep" merge which is recursive - 
			// drills down into object properties that are 
			// themselves objects/arrays...
			//
			// Here, merge our object's default options defined 
			// above with any options that are being passed in via 
			// the plugin method call.
			this.options = $.extend( true, {}, $.QTRotator.defaults, options );
			
			// Call this object's _config() method to cache some elements and 
			// initialize some variables
			this._config();
			
			// Show current item
			//
			// Since this.current is 0, this.$items.eq(0) will return a jQuery
			// object whose matched element will be the first div.quoteContent
			// in the this.$items matched set of elements.
			this.$items.eq( this.current ).addClass( 'quoteCurrent' );
			
			// Set the transition for the div.quoteContent items if CSS3 
			// transitions are supported in the user's browser => this.support 
			// is true
			if( this.support ) {
				this._setTransition();
			}
			
			// Start rotating the items
			this._startRotator();

		},
		
		
		_config : function() {

			// Use the children() jQuery method to select all div.quoteContent's
			// that are direct children of this.$el which is a jQuery object
			// containing a reference to div#quoteRotator.  Note that this refers
			// to the QTRotator object we are currently working with...
			this.$items = this.$el.children( 'div.quoteContent' );
			
			// total items (number of div.quoteContent div's)
			this.itemsCount = this.$items.length;
			
			// current item's index which will initially be the 
			// first div.quoteContent
			this.current = 0;
			
			// support for CSS Transitions - Modernizr.csstransitions will
			// contain true if the user's browser supports CSS3 transitions 
			// or false if it does not.
			this.support = Modernizr.csstransitions;
			
			// If the user's browser supports CSS3 transitions, add the progress bar
			if( this.support ) {
			
				// Insert span.quoteProgress as a new element inside of (at the
				// end) div#quoteRotator
				//
				// This element will be positioned above the quote content in
				// the component.css file
				this.$progress = $( '<span class="quoteProgress"></span>' ).appendTo( this.$el );
			}

		},
		
		
		_setTransition : function() {
		
			// setTimeout() will call the specified function after a delay
			// of 25ms.  The function here is setting up a CSS transition
			// property on each of the div.quoteContent div's
			//
			// Code executed by setTimeout() is run in a separate execution context 
			// to the function from which it was called. As a consequence, the this 
			// keyword for the called function will be set to the window (or 
			// global) object, it will not be the same as the this value for the 
			// function that called setTimeout.
			// 
			// We will get around this "this" problem here by using the global
			// jQuery object's proxy() method which takes a function and returns a 
			// new one that will always have a particular context.  The second 
			// parameter will be the object to which the context (this) of the 
			// function will be set.  Here, we are passing the this keyword to 
			// set the context of the function to our QTRotator object.
			//
			setTimeout( $.proxy( function() {
			
				this.$items.css( 'transition', 'opacity ' + this.options.speed + 'ms ' + this.options.easing );
				// the first time this will set up as
				//		transition: opacity 700ms ease;
				
			}, this ), 25 );
			
		},
		
		
		_startRotator: function() {

			// If user's browser supports CSS3 transitions, start the 
			// progress bar animation so the width of the span.quoteProgress
			// element will transition from 0% to 100% over the transition's
			// specified time interval (here this.options.interval = 8000ms)
			//
			if( this.support ) {
				this._startProgress();
			}

			// After a delay of this.options.interval (8000ms), and
			// if user's browser supports CSS3 transitions, reset the 
			// the progress bar.  
			//
			// Use the jQuery.proxy() method to reset the context of 
			// the function called by setTimeout() to be in the context
			// of the this keyword which is our QTRotator object.
			//
			setTimeout( $.proxy( function() {
			
				if( this.support ) {
					// reset progress bar width to 0% and remove any transitions
					// from it
					this._resetProgress();  
				}
				
				// hide previous div.quoteContent and show next one
				this._next();
				
				// Begin next rotation by re-starting progress bar animation.
				//
				// Since this is a recursive call our animation process will
				// continue until the user leaves the page...
				this._startRotator();
				
			}, this ), this.options.interval );

		},
		
		
		_next : function() {

			// hide previous div.quoteContent item (identified by index
			// of this.current) by removing the "quoteCurrent" class from it.
			this.$items.eq( this.current ).removeClass( 'quoteCurrent' );
			
			// update current index value
			this.current = this.current < this.itemsCount - 1 ? this.current + 1
 : 0;
 
			// same as:
			// if (this.current < this.itemsCount - 1) {
			//    this.current = this.current + 1;
			// }
			// else {   // this.current is currently the last div.quoteContent
			//    this.current = 0;
			// }
			
			// show next div.quoteContent item by adding class "quoteCurrent"
			// to it.
			this.$items.eq( this.current ).addClass('quoteCurrent');

		},
		
		
		//
		// Start the progress bar animation by resetting the CSS transition 
		// property for animating the width property
		//
		_startProgress : function() {
			
			// After a 25ms delay run the css() method on the span.quoteProgress
			// element (that was added above in _config()) which will set up
			// the CSS transition property on any change to the width propery
			// of this element AND set up the width property value to be 100%, 
			// thus triggering the transition right away.
			//
			// The transition will take 8000ms (this.options.interval) with 
			// a linear easing property.
			//
			setTimeout( $.proxy( function() {
				this.$progress.css( { transition : 'width ' + this.options.interval + 'ms linear', width : '100%' } );
			}, this ), 25 );

		},
		
		
		//
		// Reset the progress bar
		//
		_resetProgress : function() {
		
			// Reset CSS transition property to 'none' to remove any transitions
			// AND reset CSS width property to 0%.  These are reset for 
			// our span.quoteProgress element.
			this.$progress.css( { transition : 'none', width : '0%' } );
		},
		
		
		destroy : function() {
		
			if( this.support ) {
			
				// Remove all transitions from all div.quoteContent div's
				this.$items.css( 'transition', 'none' );
				
				// Remove the span.quoteProgress element from the DOM including
				// everything inside of it.
				this.$progress.remove();
				
			}
			
			// Remove the "quoteCurrent" class from all div.quoteContent div's
			// and then reset their positions, z-index, pointer-events, and 
			// opacity CSS properties.
			this.$items.removeClass( 'quoteCurrent' ).css( {
				'position' : 'relative',
				'z-index' : 100,
				'pointer-events' : 'auto',
				'opacity' : 1
			} );
		}
		
	};

	
	// Display the passed-in error message to the browser's error 
	// console if the browser has a console object available.
	var logError = function( message ) {
		if ( window.console ) {
			window.console.error( message );
		}
	};

	
	//
	// Define the qtRotator plugin by assigning a function 
	// definition to jQuery's $.fn object (a jQuery builtin)
	//
	// “jQuery.fn” is a shortcode to “jQuery.prototype”, meaning it 
	// can only be read (and not modified) when using the jQuery 
	// namespace to access it.
	//
	$.fn.qtRotator = function( options ) {
	
		// if options variable contains a string value... (not in our case)
		if ( typeof options === 'string' ) {
		
			// arguments is a local (builtin) variable of every 
			// function.
			//
			// Let’s say you have function (arg1, arg2) {}, 
			// arguments would be a nodelist (not an actual Array 
			// object) of [arg1, arg2].
			//
			// For info on Array.prototype.slice.call( arguments, 1 );
			// check out: http://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work
			//
			// See large comment at bottom for a more detailed explanation...
			//
			//
			// Here, if our options contains a string value, start 
			// at the second element ("sub 1") of our arguments 
			// node list and extract from the second element to the 
			// end of the list returning that "slice" as an
			// array storing it in args.
			var args = Array.prototype.slice.call( arguments, 1 );
			
			// Loop through each matched element in the current 
			// jQuery object (this) - the element(s) that the 
			// plugin was called on... and run the defined 
			// function on each of them.
			this.each(function() {
			
				// Returns value at named data store for the 
				// element, as set by jQuery.data(element, name, 
				// value).  In our case here, it is returning
				// the object stored in the 'qtRotator' data 
				// store for (that is attached to) the 
				// current DOM element (this) and storing it in the 
				// JavaScript variable that is named instance.
				// 
				// Note that this data store is set up further down 
				// from this point like this:
				// 		instance = $.data( this, 'qtRotator', new $.QTRotator( options, this ) );
				//
				// See http://api.jquery.com/jQuery.data for more 
				// info on use of the data() function this way.  
				//
				// Also, http://tutorialzine.com/2010/11/jquery-data-method
				//
				// The jQuery.data() low-level function allows us 
				// to attach data of any type to DOM elements in a 
				// way that is safe from circular references and 
				// therefore from memory leaks. 
				//
				// ***Note that the this keyword is a DOM object here inside 
				// our each() method - the next of our currently 
				// matched elements (i.e., whatever elements our 
				// plugin method was run on...)
				var instance = $.data( this, 'qtRotator' );
				
				// if we didn't retrieve an object from the 'qtRotator' 
				// data store above then throw an error...
				if ( !instance ) {
					logError( "cannot call methods on qtRotator prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				
				// check if the method name in question exists in 
				// this instance of the QTRotator "class", 
				// and if not, throw an error...
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for qtRotator instance" );
					return;
				}
				
				// call the current instance of the 
				// qtRotator object (plugin function)
				// passing it the arguments???  
				// See:
				// 		https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/apply
				instance[ options ].apply( instance, args );
			});
		} 
		else {   // passed in options is NOT (does not contain) a string value
		
			// Loop through each matched element in the current 
			// jQuery object (this) -
			// the element(s) that the plugin was called on - and 
			// run the defined anonymous function on each of them.
			//
			// In our case this is just the singular div#quoteRotator
			this.each(function() {	
			
				// Like above, retrieve any data store value stored under
				// the data store 'qtRotator' in the div#quoteRotator element.
				// If there is data there, it should be an instance of
				// our QTRotator object...
				var instance = $.data( this, 'qtRotator' );
				
				// If we found an instance of our QTRotator object above,
				// then call its _init() method (defined above in the code).
				if ( instance ) {
					instance._init();
				}
				else {
				
					// An instance of the cbpContentSlider plugin object 
					// does not exist so create one passing it any passed
					// in options and the matched set of elements (here
					// div#quoteRotator), via the this keyword, that the 
					// plugin should be run on.
					//
					// Now, using the jQuery.data() low-level function, store 
					// arbitrary data (in this case, our newly-created instance 
					// of the QTRotator object) naming the data 'qtRotator' 
					// (key) and associate the data with the specified element 
					// (***this - the current DOM element from our this.each() 
					// "loop" which is running through the matched set of 
					// elements our plugin is being run on).
					// 
					// Returns the value that was set as an object 
					// storing it in our variable named instance.
					//
					// instance is, in effect, our QTRotator object instance
					//
					instance = $.data( this, 'qtRotator', new $.QTRotator( options, this ) );
					
					
					// Verify that instance is a QTRotator 
					// object by listing its properties...
					//var myInstance = listAllProperties(instance);
					//alert("Creating QTRotator --- " + myInstance);
					
					//var myThis = listAllProperties(this);
					//alert("What is this? --- It is a " + this.nodeName + " with id=" + this.id + "\n\nand its properties are:\n\n" + myThis);
					
				}
			});
		}
		// return our QTRotator object instance to the plugin call
		return this;
	};
	
	
	// Function to list all properties of the passed-in object (o) 
	// and return them as a comma-delimited string.  
	//
	// Got this from https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Working_with_Objects
	// 
	function listAllProperties(o){     
		var objectToInspect;     
		var result = [];
		 
		for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)){  
			result = result.concat(Object.getOwnPropertyNames(objectToInspect));  
		}
		 
		return result; 
	}
	

} )( jQuery, window );
//
// pass jQuery to the parameter variable $ to ensure $ will refer 
// locally here to the jQuery function.  
// 
// The window object is 
// passed through to the formal parameter variable window (above) 
// so it can be local to the function because this (slightly) 
// quickens the resolution process and can be more efficiently 
// minified (especially when it is regularly referenced in your 
// plugin).
//
// See http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns
// for more info...




/* The arguments object is not actually an instance of an Array, and does not have any of the Array methods. So, arguments.slice(...) will not work because the arguments object does not have the slice method.

Arrays do have this method, and because the arguments object is very similar to an array, the two are compatible. This means that we can use array methods with the arguments object. And since array methods were built with arrays in mind, they will return arrays rather than other argument objects.

So why use Array.prototype? The Array is the object which we create new arrays from (new Array()), and these new arrays are passed methods and properties, like slice. These methods are stored in the [Class].prototype object. So, for efficiency sake, instead of accessing the slice method by new Array().slice.call() or [].slice.call(), we just get it straight from the prototype. This is so we don't have to initialise a new array.

But why do we have to do this in the first place? Well, as you said, it converts an arguments object into an Array instance. The reason why we use slice, however, is more of a "hack" than anything. The slice method will take a, you guessed it, slice of an array and return that slice as a new array. Passing no arguments to it (besides the arguments object as its context) causes the slice method to take a complete chunk of the passed "array" (in this case, the arguments object) and return it as a new array. */