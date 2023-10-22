const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const CategoryController = require("../../controllers/admin/categoryController");

router.post("/datatable-data", NotLoggedIn, CategoryController.datatable_data);
router.get("/list", NotLoggedIn, CategoryController.list);
router.get("/all", CategoryController.get_all_categories);
router.post("/add", NotLoggedIn, CategoryController.add);
router.post("/edit", NotLoggedIn, CategoryController.edit);
router.post("/delete", NotLoggedIn, CategoryController.delete);
module.exports = router;
