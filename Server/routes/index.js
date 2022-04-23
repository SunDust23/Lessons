const Router = require('express');
const router = new Router();
const lessonsRouter = require('./lessonsRouter');


router.use('/lessons', lessonsRouter);
// router.get('/', );
// router.get('/:id', );


module.exports = router;