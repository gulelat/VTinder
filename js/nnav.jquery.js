$(document).ready(function() {
  ////////////////////////////////////////////////////////
  // ENABLE TOGGLE NAVIGATION LINK
  $('[data-toggle="nnav"]').on('click', function(e) {
    var nnav_id = $(this).attr("href");
  	$(nnav_id).toggleClass("nav-active");
    // STOP PROPAGATION
    e.preventDefault();
    e.stopPropagation();
  }); // END OF ENBALE TOGGLE LINKS
  ////////////////////////////////////////////////////////
  // ENABLE CLICK ON CONTENT WHEN NAV IS SHOWN TO HIDE NAV
	$('[class="nnav-content"]').on('click', function(e) {
  	if($(this).parent().hasClass('nav-active')) {
    	// TOGGLE NAVIGATION
    	$(this).parent().toggleClass("nav-active");
    	// PREVENT PROPAGATION
    	e.preventDefault();
    	e.stopPropagation();
  	}                                 
	}); // END OF ENABLE CLICK ON CONTENT
 
}); // END OF DOCUMENT READY