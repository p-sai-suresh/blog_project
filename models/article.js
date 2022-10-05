const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Please enter the title'], // [ <attribute_value>, <error_message>]
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        require: [true, 'Please enter markdown'], // [ <attribute_value>, <error_message>]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Article = mongoose.model('Article', articleSchema);
 
module.exports = Article;
