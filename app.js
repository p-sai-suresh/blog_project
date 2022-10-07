const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const articleRouter = require('./routes/blogRoutes');
const cookieParser  = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const methodOverride = require('method-override');
const express = require('express');
const app = express();

app.use(express.static('public')); 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded( {extended: false }));
app.use(methodOverride('_method'));  // For PUT operation

app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://admin1:admin1@cluster0.y0mofav.mongodb.net/node-auth';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get('*', checkUser); // apply to every route

app.use('/api/v1/', authRoutes);
app.use('/articles', articleRouter);

app.use((req, res)=>{ 
  res.render('404');
});