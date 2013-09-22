$(document).ready(function() {
  $('#buyBar').on('click', function(){
      $(this).toggleClass("click")
  });

  $("input,select").on('click', function(e) {
    e.stopPropagation();
  });

  $('#listBtn,#maker_load,#getEstimate').on('click', function(e) {
    $('#buyBar').toggleClass("click")
  });

  $('#bar-ico').on('click', function(){
    $("#sidebar").toggleClass("click")
    $("#bar-ico").toggleClass("click")
  });

  $('#bar-ico-right').on('click', function(){
    $("#bar-right").toggleClass("click")
    $("#bar-ico-right").toggleClass("click")
  });
});

function elemCreate(user, year, condition, make, model, price){
  
}