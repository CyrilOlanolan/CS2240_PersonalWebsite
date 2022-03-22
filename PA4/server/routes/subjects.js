const router = require("express").Router();
const subjectsController = require("../controllers/subjectsController");

router.get("/", subjectsController.view);
router.post("/", subjectsController.find);

router.get("/add_subject", subjectsController.add);
router.post("/add_subject", subjectsController.submit);

router.post('/update_subject/:id', subjectsController.update);

router.get('/:id', subjectsController.delete);

module.exports = router;