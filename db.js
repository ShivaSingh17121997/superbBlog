


const mongoose = require("mongoose")

const connection = mongoose.connect(`mongodb+srv://shiva:singh@cluster0.qffjyga.mongodb.net/finally-eval?retryWrites=true&w=majority`)

module.exports={connection}