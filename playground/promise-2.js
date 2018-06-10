const request=require('request');
var geocodeAddress=(address)=>{
  return new Promise((resolve,reject)=>{
  
      var enc=encodeURIComponent(address);
      request({
        url:`http://maps.googleapis.com/maps/api/geocode/json?address=${enc}`,
        json:true

      },(error,response,body)=>{
        if(error){
          reject("no connection")

        }
        else if (body.status==='ZERO_RESULTS') {
            reject('Unable to find that address');
        }
        else if (body.status==="OK") {
          resolve({
            address:body.results[0].formatted_address,
            latitude:body.results[0].geometry.location.lat,
            longitude:body.results[0].geometry.location.lng
          });

        }

      });

  })
};

geocodeAddress('28217').then((location)=>{
  console.log(JSON.stringify(location,undefined,2));
},(err)=>{
  console.log(err);
});
