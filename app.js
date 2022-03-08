// dotenv init
require('dotenv').config();
const ImgUpl = require('./models/ourModel');

// base
const express = require('express');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// init express
const app = express();

// bodyparser settings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// init routes
app.get((req, res, next) => {
    res.json({ message: `Hey ho! Let's go!` });
});

// image upload api
app.post('/upload-image', (req, res) => {
    const data = {
        // title: req.body.title, ADDING LATER
        image: req.body.image
    }
    cloudinary.uploader.upload(data.image)
    .then((output) => {
        var post = new ImgUpl({
            // title: req.body.title,
            // desc: req.body.desc,
            created_at: new Date(),
            image: output.url,
            image_id: output.public_id
        })
        post.save(function (err) {
            if (err) {
                res.send(err)
            }
        })
        res.status(201).send({
            status: 'success',
            data: {
                message: "You've uploaded an image!",
                // title: req.body.title,
                // desc: req.body.desc,
                image: output.url,
                image_id: output.public_id
            },
        })
    }).catch((error) => {
        res.status(500).send({
            message: "Something went wrong...",
            error,
        });
    });
});

app.get("/get-image/:image_id", (req, res) => {
    const { image_id } = req.params;
    ImgUpl
    .findOne({ image_id: image_id })
    .then((output) => {
        res.status(200).send({
            status: 'success',
            data: {
                message: "Here's your image!",
                // title: output.title,
                url: output.image,
                image_id: output.image_id,
                created_at: output.created_at
            },                
        });
    })
    .catch((error) => {
        res.status(401).send({
            status: 'Failure',
            data: {
                message: "Something went wrong...",
                error,
            },
        });
    })
});

app.get("/delete-image/:image_id", (req, res) => {
    const { image_id } = req.params;
    ImgUpl
    .findOneAndDelete({ image_id: image_id })
    .then((output) => {
        console.log(output);
        res.status(200).send({
            status: 'image deleted successfully!',             
        });
    })
    .catch((error) => {
        res.status(401).send({
            status: 'Failure',
            data: {
                message: "Something went wrong...",
                error,
            },
        });
    })
});

module.exports = app;