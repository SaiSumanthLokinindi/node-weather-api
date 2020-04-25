const request =  require('request');
const geocode=require('./geocode');

const weatherReport=(location,callback)=>{
    geocode(location,(error,{latitude,longitude,locationName}={})=>{
        if(error) callback(error,undefined)
        else{
            const url = 'http://api.weatherstack.com/current?access_key=b99750879addf939bc1d2e9338b4a328&query='+latitude+','+longitude+'';
            request({ url:url, json: true },(error,response)=>{
                if(error){
                    callback("Unable to connect to weather service",undefined);
                }
                else if(response.body.error){
                    callback(response.body.error.type+" : "+response.body.error.info,undefined)
                }
                else{
                    console.log(response.body)
                    callback(undefined,{
                        weather:response.body.current.weather_descriptions[0],
                        location:locationName,
                        temperature:response.body.current.temperature
                    });
                }
            })
        }
    })
}

module.exports = weatherReport