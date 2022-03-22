const router = require("express").Router();
const studentsController = require("../controllers/studentsController");

router.get("/", studentsController.view);
router.post("/", studentsController.find);

router.get("/add_student", studentsController.add);
router.post("/add_student", studentsController.submit);

router.post('/update_student/:id', studentsController.update);

router.get('/:id', studentsController.delete);

module.exports = router;
