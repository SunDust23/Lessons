const Router = require('express');
const router = new Router();

const lessonsController = require('../controllers/lessonsController');

router.post('/', lessonsController.create);
router.get('/', lessonsController.getAll);
// router.get('/:id', lessonsController.getOne);

module.exports = router;