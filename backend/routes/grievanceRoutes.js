const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  createGrievance,
  getGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance,
  searchGrievance,
} = require("../controllers/grievanceController");

const router = express.Router();

router.post("/", protect, createGrievance);
router.get("/", protect, getGrievances);
router.get("/search", protect, searchGrievance);
router.get("/:id", protect, getGrievanceById);
router.put("/:id", protect, updateGrievance);
router.delete("/:id", protect, deleteGrievance);

module.exports = router;
