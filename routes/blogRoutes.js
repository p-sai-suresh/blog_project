const { Router } = require('express');
const articleController = require('../controllers/articleController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

const router = Router();

router.get('/', articleController.articelView_get);
router.get('/new', requireAuth, articleController.article_get);
router.post('/', articleController.article_post);

// for this we require a button with method="DELETE", for which we need method override.
router.delete('/:id', requireAuth, articleController.articleDelete);
router.get('/edit/:id', requireAuth, articleController.articelEdit_get);
router.put('/:id', articleController.articleUpdate_put );

module.exports = router;


