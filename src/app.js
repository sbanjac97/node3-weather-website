const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // views je taj folder koji je u putanji viewsPath
hbs.registerPartials(partialsPath) 

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // bukvalno pristup statickim datotekama(css, html, JS,slike)
                                             // ispise se npr css fajl u browseru; ali mi ovo treba i da bih mogao css da primenim na index.hbs,
                                            // odnosno, da bih mogao da renderujem index.hbs zajedno sa css-om

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpfux text!',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You have to provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

        // res.send({
        //     forecast: '30 deagrees',
        //     location: 'Ruma',
        //     address: req.query.address
        // })
    })
    
    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',  {
        title: '404help',
        name: 'Andrew',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
            title: '404*',
            name: 'Andrew',
            errorMessage: 'Page not found.'
        })
    })

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})