const express = require('express')
const mongoose = require('mongoose')

module.exports = async() => {
    //database connection
    const connection = await mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`MongoDB connected...`)
            }
        })
}
