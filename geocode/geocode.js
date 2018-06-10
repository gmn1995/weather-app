const request=require('request');


var geocodeAddress=function(addr,callback){
  var enc=encodeURIComponent(addr);
  request({
    url:`http://maps.googleapis.com/maps/api/geocode/json?address=${enc}`,
    json:true

  },(error,response,body)=>{
    if(error){
      callback("no connection")

    }
    else if (body.status==='ZERO_RESULTS') {
        callback('Unable to find that address');
    }
    else if (body.status==="OK") {
      callback(undefined,{
        address:body.results[0].formatted_address,
        latitude:body.results[0].geometry.location.lat,
        longitude:body.results[0].geometry.location.lng
      });

    }

  });
}

module.exports={
  geocodeAddress,
}
