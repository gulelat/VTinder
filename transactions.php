<?php

class ValueOfCar {

    private $api_key = "j9s2gskzgc3e9zc2b4huur75";

    function priceOfCar($UVC, $state, $mileage, $quality )
    {
       $url = "http://autoAPI.hearst.com/v1/UsedCarWS/UsedCarWS/UsedVehicle/UVC/" . $UVC . "?state=" . $state . "&mileage=". $mileage . "&api_key=" . $this->api_key;
        $response=$this->_connectAPI($url);
        if($quality == "xclean")
        {
            $price = $response->used_vehicles->used_vehicle_list[0]->retail_xclean;
        }elseif($quality == "clean")
        {
            $price = $response->used_vehicles->used_vehicle_list[0]->retail_clean;
        }elseif($quality == "avg")
        {
            $price = $response->used_vehicles->used_vehicle_list[0]->retail_avg;
        }elseif($quality == "rough")
        {
            $price = $response->used_vehicles->used_vehicle_list[0]->retail_rough;
        }
        return $price;  
    }
    
    
    private function _connectAPI($url) {
        $ch = curl_init();
        $opts = array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Accept: application/json'
            )
        );
        curl_setopt_array($ch, $opts);
        $response = curl_exec($ch);

        $headers = curl_getinfo($ch);
        curl_close($ch);
        $response = json_decode($response);
        return $response;
    }
    
    

} 

    //$test = new ValueOfCar();
    
   // print_r($test->priceOfCar(2010900249, "MI", 500000, "avg"));


    //$car=new ValueOfCar();
    //print_r($test->priceOfCar($uvc, "MN", 500000, "avg"));


if($_POST['uvc']!=""){
    $uvc=$_POST['uvc'];
<<<<<<< HEAD
    $carValue=new ValueOfCar();
    print_r($carValue->priceOfCar($uvc, "MN", 700000, "rough"));
=======
    $state=$_POST['state'];
    $mileage=$_POST['mileage'];
    $condition=$_POST['condition'];
    $carValue=new ValueOfCar();
    print_r( $carValue->priceOfCar($uvc, $state, $mileage, $condition));
>>>>>>> 34430c25bd13b60126418b6db4394d9a4515ff9a
    
   }


?>
