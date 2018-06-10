const yargs=require('yargs');
const axios=require('axios');
const argv=yargs
  .options({
    a:{
      demand:true,
      alias:'address',
      describe:"address to fetch weather for",
      string:true
    }
})
.help()
.alias('help','h')
.argv;

var enc=encodeURIComponent(argv.address);
var geocodeURL=`http://maps.googleapis.com/maps/api/geocode/json?address=${enc}`;

axios.get(geocodeURL).then((response)=>{
  if(response.data.status==='ZERO_RESULTS'){
    throw new Error('Unable to find addr');
  }
  var lat=response.data.results[0].geometry.location.lat;
  var lng=response.data.results[0].geometry.location.lng;
  var weatherURL=`https://api.darksky.net/forecast/64df2e55fa568a90765b355e0a344715/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherURL);
}).then((response)=>{
  var temperature=response.data.currently.temperature;
  var apptemperature=response.data.currently.apparentTemperature;
  console.log(`its ${temperature} feels ${apptemperature}`);
}).catch((e)=>{
  if (e.code==='ENOTFOUND') {
    console.log('unable to connect');
  }
  else{
    console.log(e.message);
  }
});
