(function ($, window, document, undefined) {

  'use strict';

  $(function () {

      // Deferring images for faster pages
      // http://www.feedthebot.com/pagespeed/defer-images.html
  		function init() {
			var imgDefer = document.getElementsByTagName('img');
			for (var i=0; i<imgDefer.length; i++) {
			if(imgDefer[i].getAttribute('data-src')) {
			imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
			} } }
			window.onload = init;

      // ANIMATED SCROLLING
		  $('a[href*=#]:not([href=#])').click(function() {
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		      if (target.length) {
		        $('html,body').animate({
		          scrollTop: target.offset().top
		        }, 1000);
		        return false;
		      }
		    }
		  });


		  // SCROLL TO THE TOP OF THE PAGE

	    $(window).scroll(function () {
	        if ($(this).scrollTop() > 100) {
	            $('.scrollup').fadeIn();
	        } else {
	            $('.scrollup').fadeOut();
	        }
	    });

	    $('.scrollup').click(function () {
	        $("html, body").animate({
	            scrollTop: 0
	        }, 600);
	        return false;
	    });


  });

})(jQuery, window, document);
