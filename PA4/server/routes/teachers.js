const router = require("express").Router();
const teachersController = require("../controllers/teachersController");

router.get("/", teachersController.view);
router.post("/", teachersController.find);

router.get("/add_teacher", teachersController.add);
router.post("/add_teacher", teachersController.submit);

router.post('/update_teacher/:id', teachersController.update);

router.get('/:id', teachersController.delete);

module.exports = router;