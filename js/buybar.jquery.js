$(document).ready(function() {
  $('#buyBar').on('click', function(){
      $(this).toggleClass("click")
  });

  $("input").on('click', function(e) {
    e.stopPropagation();
  });

  $('#listBtn').on('click', function(e) {
    $('#buyBar').toggleClass("click")
  });
});