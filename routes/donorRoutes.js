const express = require("express");
const router = express.Router();

const donorController = require("../controllers/donorController");

router.post("/register", donorController.registerDonor);
router.post("/", donorController.registerDonor);
router.get("/", donorController.getAllDonors);
router.get("/:id", donorController.getDonorById);
router.put("/:id", donorController.updateDonor);
router.delete("/:id", donorController.deleteDonor);

module.exports = router;