const yargs=require('yargs');

const geocode=require('./geocode/geocode.js');
const weather=require('./weather/weather.js');
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

geocode.geocodeAddress(argv.a,(errorMessage,results)=>{
  if(errorMessage){
    console.log(errorMessage);
  }
  else{
    console.log(results.address);
    weather.getWeather(results.latitude,results.longitude,function(eMessage,wresults){
      if(eMessage){
           console.log(eMessage);
         }
         else{
         console.log(`Its currently ${wresults.temperature} but feels like ${wresults.apparentTemperature}`);
         }
    });
  }
});
//lat lng 35.16321000000001,-80.9072676
