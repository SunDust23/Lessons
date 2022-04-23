const Router = require('express');
const router = new Router();
const lessonsRouter = require('./lessonsRouter');
const dataController = require('../controllers/dataController');


router.use('/lessons', lessonsRouter);
router.get('/', dataController.getAll);
// router.get('/:id', );


module.exports = router;