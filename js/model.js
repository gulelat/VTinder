
$( document ).ready(function() {
    init(); 
   
});

function init(){

    Parse.$ = jQuery;
    var app="MbNHyjpV8RSUfE2xfweYwKpeQAuyBDXXyYy22AKU";
    var key="HM1NPfqkGE59wPPGvuK1BRKLHCKsX3cEMP2AdqgD";
    Parse.initialize(app,key);
    // Initialize Parse with your Parse application javascript keys
    //Parse.initialize("fNHhqbzan7rgLv5XCqzg6QyyhSsD6Op3nfr1okZJ","tsD5mxxe3pDqwCPtsWsihAZUwHETuLDnMgQYwAx5");
    $('#maker_load').click(function(event){
        event.preventDefault();
        var year=$("#year").val();
        var maker=$("#maker").val();
        //alert(maker+year);
        getModels(parseInt(year), maker);
    });
    
    $('#submit').click(function(event){
        event.preventDefault();
        $("#image_uploader").show();
        saveCar();
    });
     
    $("#image_uploader").hide();

    $( "#getEstimate" ).click(function(event){
        event.preventDefault();
        var year=$("#year").val();
        var maker=$("#maker").val();
        var model=$("#models").val();
        var condition=$("#condition").val();
        var state=$("#state").val();
        var mileage=$("#mileage").val();

        //alert(year+" "+maker+" "+model+" "+condition+" "+state+" "+mileage);
        getUVC(maker,model,parseInt(year),condition,state,mileage);
    });
    
}


function getUVC(maker,model,year,condition,state,mileage){

    Parse.$ = jQuery;
    var Car = Parse.Object.extend("BlackBook");
    var query = new Parse.Query(Car);
    var results_count=0;
    query.equalTo("make", maker);
    query.startsWith("model",model)
    query.greaterThan("year",year);
    
    query.find({
        success: function(results) {
                    
            results_count=results.length; 
            //Do something with the returned Parse.Object values
            //for (var i = 0; i < results.length; i++) { 
            //  var object = results[i];
            //alert(object.get('model')
            //  +'('+object.get('year')+')'+" - "+object.get('series')+' uvc: ' + object.get('uvc'));
            //}
            var object = results[0];

            getUVCData(object.get('uvc'),state,year,mileage,condition);

        //alert(results);
        //return results;
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });       
}

function getModels(year, maker){
    Parse.$ = jQuery;
    var Models = Parse.Object.extend("BlackBook");
    var query = new Parse.Query(Models);
    var results_count=0;
    var response;
    query.equalTo("make", maker);
    query.equalTo("year",year);
    
    query.find({
        success: function(results) {
                   
            results_count=results.length; 
            //Do something with the returned Parse.Object values
            $('#models').html(' ');
            for (var i = 0; i < results.length; i++) { 
                var object = results[i];
                //alert(object.get('model')+" - "+object.get('series')+" ["+object.get('make')+"]");

                $('#models').append('<option value="'+object.get('model')+'">'+object.get('model')+' - '+object.get('series')+' ['+object.get('style')+']</option>');    

            }
                  
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });    
  
}

function saveCar(){
    var condition= $('#condition').val();
    var make=$('#maker').val();
    var year=$('#year').val();
    var model=$('#model').val();
    var dolars=$('#dolars').val();
    var cents=$('#cents').val();
    var user="zLSR83Q9VF";
    alert(condition+", "+make+", "+year+", "+model+", $"+dolars+"."+cents+", "+user);
    /*
    var Model = Parse.Object.extend("Cars");
    var car = new Model();
    
    car.set("condition", 1337);
    car.set("playerName", "Sean Plott");
    car.set("cheatMode", false);
 
    car.save(null, {
        success: function(car) {
            // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + car.id);
        },
        error: function(car, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and description.
            alert('Failed to create new object, with error code: ' + error.description);
        }
    });
    */
}


function getUVCData(uvc,state,year,mileage,condition){
    //alert(uvc);
    
    $( "#uvc" ).load( "transactions.php", { 
        uvc:uvc,
        year:year,
        mileage:mileage,
        state:state,
        condition:condition

    } );
    
    
    
    
}
