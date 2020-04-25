
const path = require('path');

const express= require('express');
const app = express();
const port = process.env.PORT || 3000;
const weather = require('./utils/weatherReport')

const publicDirectory = path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../views');

app.set('view engine','hbs')
app.set('views',viewsPath)

app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Sam'
    })
})

app.get('/weather',(req,res,err)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    weather(req.query.address,(error,{location,weather,temperature}={})=>{
        if(error){
            res.send({
                error:error
            })
        }else{
            res.send({
                location: location,
                forecast: weather,
                temperature:temperature
            });
        }
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.all('*',(req,res)=>{
    res.send("404")
})

app.listen(port,()=>{
    console.log("Server running at "+port);
})