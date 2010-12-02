/*
 * jQuery IMGswitch
 * v 1.0
 * For use with TinyMCE and TinyMCE Image Manager with auto thumbnail generation
 * http://www.evan-rowe.com
 *
 * Copyright (c) 2010, Evan Rowe
 * Licensed under the MIT license.
 */
 
(function($){
  $.fn.IMGswitch = function(arg1,arg2) {
    
    //Set Default Options
    var settings = {
    	thumbDir : 'mcith',
    	thumbPrefix : 'mcith_',
    	thumbWidth : '',
    	focusWidth : 'auto'
    };
       
    
    //Detect whether settings have been passed in and set other variables accordingly
    if (!$.isFunction(arg1)){
    	$.extend(settings,arg1);
    	if (arg2 != undefined){
    		var callback = arg2;
    	}
    } else if (arg1 != undefined) {
    	var callback = arg1;
    }
    
    return $(this).each(function() {
    	
    	//Remap the jQuery object to variable
    	var container = this;
    	
    	//Create Container for Thumbnails
    	$(this).append('<div id="galleryThumbs></div>');
    	
    	//Init variable for counting number of iterations
    	var imgCount = 0;
    	
    	//Populate Thumbnails and Isolate Full Size Images
    	$(this).find('img').each(function(imgCount){
    		var imgURL = $(this).attr('src');
    		var imgALT = $(this).attr('alt');
    		var imgURLparts = imgURL.split('/');
    		var imgURLlength = imgURLparts.length;
    		var imgFilename = imgURLparts[imgURLlength-1];
    		if (settings.thumbPrefix != false){
    			var thumbFilename = settings.thumbPrefix+imgFilename;
    		}
    		var thumbURLsubdir = imgURLlength-1;
    		var thumbURLparts = imgURLparts;
    		if (settings.thumbDir != false){
    			thumbURLparts.splice(thumbURLsubdir,0,settings.thumbDir);
    		} 		
    		thumbURLparts.splice(thumbURLparts.length-1,1,thumbFilename);
    		var thumbURL = thumbURLparts.join('/');
    	
    		//Wraps each of the full sized images in a containing div
    		$(this).wrap('<div class="focusImage img_'+imgCount+'" />');
    	
    		//Constrain the main image to 215px wide
    		$(this).attr('style','width:'+settings.focusWidth);
    	
    		//Adds the corresponding thumbnail image to the thumbnails container
    		if (settings.thumbWidth == '') {
    			$('#galleryThumbs').append('<img src="'+thumbURL+'" alt="'+imgALT+'" rel="'+imgURL+'" class="img_'+imgCount+'" />');
    		} else {
    			$('#galleryThumbs').append('<img src="'+thumbURL+'" alt="'+imgALT+'" width="'+settings.thumbWidth+'" rel="'+imgURL+'" class="img_'+imgCount+'" />');
    		}
    	
    		//Increase the number of iterations by one upon completion
    		imgCount++;
    	
    	});
    	
    	//Show the first image
    	$(this).find('.focusImage:first-child').addClass('selected');
    	
    	//Handle the swapping of images when a thumbnail is clicked
    	$('#galleryThumbs img').click(function(){
   	 		var myClass = $(this).attr('class');
    		if ($('.focusImage').hasClass(myClass)){
    			$('.focusImage.'+myClass).addClass('selected');
    			$('.focusImage.'+myClass).siblings().removeClass('selected');
    		}
    	});
    	
    	//Run the user-specified callback function if one is specified
    	if($.isFunction(callback)){
			callback.call(container);
		}
    	
    });

  };
})( jQuery );