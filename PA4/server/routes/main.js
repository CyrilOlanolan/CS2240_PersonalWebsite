const router = require("express").Router();
const mainController = require("../controllers/mainController");

router.get("/", mainController.view);

module.exports = router;
