const path=require('path');
const express=require('express');
const hbs=require('hbs');

const geolocation = require('./utils/geolocation');
const weatherDetails = require('./utils/weatherDetails');


const app=express()

const port=process.env.PORT|| 3000

// define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public'); 
const viewPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials')

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Raj"
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Us",
        name:"Raj"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help !",
        name:"Raj",
        message:"Ask for any help "
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Address not provided"
        })
    }
    geolocation(req.query.address, (error, { place_name, lat, long } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        else {
            weatherDetails(long, lat, (error, { temperature, feelsLike, description }={}) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                const status=description + "Throught the day. It is currently " + temperature + " degrees out. Feels like " + feelsLike + " degrees out";
                res.send({
                    address:req.query.address,
                    location:place_name,
                    forecast:status
                })
            })
        }
    });
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: "404",
        errormessage:"help article not found",
        name:"Raj"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: "404",
        errormessage:"page not found",
        name:"Raj"
    })
})

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`)
});