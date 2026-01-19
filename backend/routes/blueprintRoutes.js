const express = require("express");
const router = express.Router();
const blueprintController = require("../controllers/blueprintController");

router.post("/", blueprintController.createBlueprint);
router.get("/", blueprintController.getBlueprints);

module.exports = router;
