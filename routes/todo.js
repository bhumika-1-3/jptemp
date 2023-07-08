const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoControler")

router.post("/", todoController.addData);
router.get("/", todoController.allData);
router.put("/", todoController.updateData);
router.delete("/", todoController.deleteData);

module.exports = router;