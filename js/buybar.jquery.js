$(document).ready(function() {
  $('#buyBar').on('click', function(){
      $(this).toggleClass("click")
  });

  $("input,select").on('click', function(e) {
    e.stopPropagation();
  });

  $('#listBtn,#maker_load').on('click', function(e) {
    $('#buyBar').toggleClass("click")
  });
});