const request=require('request');

var getWeather=function(lat,lng,callback){
  request({
    url:`https://api.darksky.net/forecast/64df2e55fa568a90765b355e0a344715/${lat},${lng}`,
    json:true
  },(error,response,body)=>{
    if(error){
      callback("unable to connect");
    }
    else if (response.statusCode === 400) {
      callback("unable to fetch data");
    }
    else if(response.statusCode === 200){
    callback(undefined,{
      temperature:body.currently.temperature,
      apparentTemperature:body.currently.apparentTemperature
    });
  }
});
};
module.exports.getWeather=getWeather;
