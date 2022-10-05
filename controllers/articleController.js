const Article = require('../models/article');

module.exports.article_get = async (req, res) => {
    res.render('new', { article: new Article() }); // sending blank article
}

module.exports.article_post = async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        article = await article.save();
        res.redirect('/articles');
    }catch(e){
        res.render('new', { article: article });
    }
}

module.exports.articelView_get = async (req, res) => {
    const articles =  await Article.find().sort({createdAt: 'desc'});
    res.render('index', {articles: articles});
}

module.exports.articleDelete = async(req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/articles');
}

module.exports.articelEdit_get = async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('edit', { article: article });
}

module.exports.userDetails_get = (req, res) => {
    console.log("=>", res.locals.user);
}

module.exports.articleUpdate_put = async (req, res) =>{
    req.article = await Article.findById(req.params.id);
    let article = req.article;
    article.title= req.body.title;
    article.description= req.body.description;
    article.markdown= req.body.markdown;    

    try{
        article = await article.save();
        console.log('success');
        res.redirect('/articles');
    }catch(e){
        console.log('error');
        res.redirect('/articles');
    }   
}