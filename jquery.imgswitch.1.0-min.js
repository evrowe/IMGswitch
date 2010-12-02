/*
 * jQuery IMGswitch
 * v 1.0
 * For use with TinyMCE and TinyMCE Image Manager with auto thumbnail generation
 * http://www.evan-rowe.com
 *
 * Copyright (c) 2010, Evan Rowe
 * Licensed under the MIT license.
 */

(function(a){a.fn.IMGswitch=function(c,b){var d={thumbDir:"mcith",thumbPrefix:"mcith_",thumbWidth:90,focusWidth:"auto"};if(!a.isFunction(c)){a.extend(d,c);if(b!=undefined){var e=b}}else{if(c!=undefined){var e=c}}return a(this).each(function(){var f=this;a(this).append('<div id="galleryThumbs></div>');var g=0;a(this).find("img").each(function(k){var l=a(this).attr("src");var q=a(this).attr("alt");var p=l.split("/");var j=p.length;var o=p[j-1];if(d.thumbPrefix!=false){var n=d.thumbPrefix+o}var i=j-1;var m=p;if(d.thumbDir!=false){m.splice(i,0,d.thumbDir)}m.splice(m.length-1,1,n);var h=m.join("/");a(this).wrap('<div class="focusImage img_'+k+'" />');a(this).attr("style","width:"+d.focusWidth);a("#galleryThumbs").append('<img src="'+h+'" alt="'+q+'" width="'+d.thumbWidth+'" rel="'+l+'" class="img_'+k+'" />');k++});a(this).find(".focusImage:first-child").addClass("selected");a("#galleryThumbs img").click(function(){var h=a(this).attr("class");if(a(".focusImage").hasClass(h)){a(".focusImage."+h).addClass("selected");a(".focusImage."+h).siblings().removeClass("selected")}});if(a.isFunction(e)){e.call(f)}})}})(jQuery);