const request =  require('request');

const geocode= (location,callback)=>{
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1Ijoic3VtYW50aGthemFtYSIsImEiOiJjazh4Z2cwZWwwNW9tM2VxejZ4YXc2c3JvIn0.EEIQ9zL_rkmVuhlsK2pcjA';

    request({url:url2, json:true},(error,response,body)=>{
        if(error){
            callback("Unable to connect to location services",undefined);
        }
        else if(body.features.length===0){
            callback("Unable to fetch details, please check location",undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude : body.features[0].center[0],
                locationName: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode;