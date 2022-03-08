var cloudinary = require('cloudinary').v2;
var Model = require('./models/ourModel');

// base
const express = require('express');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});