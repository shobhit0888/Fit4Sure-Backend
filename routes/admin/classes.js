const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const ClassController = require("../../controllers/admin/classController");

router.get("/list", NotLoggedIn, ClassController.list);
router.get("/documents/:id", NotLoggedIn, ClassController.documents_list);

router.post("/add", NotLoggedIn, ClassController.add);
router.post("/add_documents", NotLoggedIn, ClassController.add_documents);

router.post("/delete_documents", NotLoggedIn, ClassController.delete_documents);
router.post("/edit", NotLoggedIn, ClassController.edit);
router.post("/delete", NotLoggedIn, ClassController.delete);

module.exports = router;
