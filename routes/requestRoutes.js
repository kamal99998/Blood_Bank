const express = require("express");
const router = express.Router();

const requestController = require("../controllers/requestController");

router.post("/", requestController.createRequest);
router.get("/", requestController.getAllRequests);
router.get("/:id", requestController.getRequestById);
router.get("/donor/:donorId", requestController.getRequestsByDonor);
router.get("/requester/:requesterId", requestController.getRequestsByRequester);
router.put("/:id", requestController.updateRequest);
router.patch("/:id/status", requestController.updateRequestStatus);
router.delete("/:id", requestController.deleteRequest);

module.exports = router;