;(function($,window, undefined)  {
    
    
    var Modernizr = window.Modernizr;
    
    //
    // Define our QTRotator constructor function
    //
    
    $.QTRotator = function(options, element){
        
        this.$el = $(element);
        
        this._init(options);
    
    };
    
    $.QTRotator.defaults = {
        speed: 700,
        easing: 'ease',
        interval: 8000
    };
    
    // set up the methods for our QTRotator object
    
    $.QTRotator.prototype = {
        
        _init: function(options){
         
            this.options = $.extend(true,{}, $.QTRotator.defaults, options);
            
            // cache some elements and intitalize some variables 
            this._config();
            
            // Show current item 
            this.$items.eq(this.current).addClass('quoteCurrent');
            
            // Use transitions to animate our progress bar 
            if (this.support){
                this._setTransition();
            }
            // start rotating the quotes (div.quoteContent)
            this._startRotator();
        },
        
        _config: function(){
            
            // store all of the div.quoteContent elements that are direct 
            // children of our div#quoteRotator element 
            this.$items = this.$el.children('div.quoteContent');  //$('#quotRotator > .quoteContent')
            
            // get the number of div.quoteContent elements 
            this.itemsCount = this.$items.length;
            
            // current will represent the index of the currently displayed quote 
            this.current = 0;
            
            
            this.support = Modernizr.csstransitions;
            
            if (this.support){
                
                this.$progress = $('<span class = "quoteProgress"></span>').appendTo(this.$el);
            
            } 
        },
        
        _setTransition: function(){
            
            setTimeout($.proxy(function() {
                
                this.$items.css('transition', 'opacity ' + this.options.speed + 'ms ' + this.options.easing);
                
            }, this), 25);
            
        },
        
        _startRotator: function(){
            
            if (this.support){
                this._startProgress();
            }
            
            
            // After a delay of interval milliseconds, reset the progress 
            // bar if the user browser supports css transitions 
            setTimeout($.proxy(function () {
                
                if (this.support){
                    // reset the progress bar 
                    this._resetProgress();
                }
                
                // hide current quote and fade in new one
                this._next();
                
                //keep the carousel spinning 
                this._startRotator();
                
            }, this), this.options.interval + 50);
            
        },
        
        
        _next: function () {
            
          // hide the previous quote 
            this.$items.eq(this.current).removeClass('quoteCurrent');
            
            // update current index value 
            // example of a terinary 
            this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;
            
            // same as 
            /*
                if (this.current < this.itemscount - 1){
                this.current++;
                } else {
                    this.current = 0;
                }
            
            */
            
            this.$items.eq(this.current).addClass('quoteCurrent');

            
        },
        
        _startProgress: function() {
            
            setTimeout($.proxy(function() {
                
                this.$progress.css({
                   
                    transition: 'width ' + this.options.interval + 'ms linear',
                    width: '100%'
                    
                });
                
            }, this), 25);
            
        },
        
        _resetProgress: function() {
            
            this.$progress.css({
                
                transition: 'none',
                width: '0%'
                
            });
        
        }
    };
    
    

    $.fn.qtRotator = function(options){
      
        if (typeof options === 'string'){
            
            // not as common, leave off code for now. . . 
            
        } else { // options !== 'string', usually meaning it is an object
            // here, this refers th jQuery object that was used
            // to call this plugin method ($('#quoteRotator'))
            this.each(function(){
            
                var instance = $.data(this, 'qtRotator');
                
                if (instance) {
                    instance._init();
                } else {
                    
                    instance = $.data(this, 'qtRotator',new $.QTRotator(options,this));
                }
            
            });
            
        }
        
        // return the jQuery object $('#quoteRotator'), that our method 
        // was called on... , making it chainable
        return this; 
        
    };

})(jQuery, window);