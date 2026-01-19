const express = require("express");
const router = express.Router();
const contractController = require("../controllers/contractController");

router.post("/", contractController.createContract);
router.get("/", contractController.getContracts);
router.post("/:id/status", contractController.changeStatus);

module.exports = router;
