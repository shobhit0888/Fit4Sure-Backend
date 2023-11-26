const Category = require("../../models/Category");
const Trainer = require("../../models/Trainer");
const Adminauth = require("../../models/Adminauth");
const datatablesQuery = require("datatables-query");

class CategoryController {
  static datatable_data = async (req, res) => {
    try {
      const params = req.body;
      const query = datatablesQuery(Category);
      const raw = await query.run(params);
      return res.send(raw);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static list = async (req, res) => {
    try {
      const admin = await Adminauth.find();
      return res.render("admin/category-list", { admin });
    } catch (error) {
      return res.send("Something went wrong please try again later");
    }
  };

  static get_all_categories = async (req, res) => {
    try {
    const category = await Category.find({});
    return res.send({
        category,
    });
    } catch (error) {
    res.status(500).json({
        message: error.message,
    });
    }
};

  static add = async (req, res) => {
    try {
        const category = Category({
          name: req.body.name,
        });
        await category.save();
        return res.send({
          error: false,
          message: "Category added successfully",
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static edit = async (req, res) => {
    try {
      const category = await Category.findOne({
        _id: req.body.editid,
      });

      await Category.findOneAndUpdate(
        {
          _id: req.body.editid,
        },
        {
          name: req.body.editname,
          updated_at: Date.now(),
        }
      );

      return res.send({
        error: false,
        message: "Category Updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
      const category = await Category.findOne({
        _id: req.body.id,
      });
      const trainer = await Trainer.findOne({ category: category._id });
      if (trainer)
        return res.status(500).send("Catgegory is in use. You can't delete it");

      await Category.deleteOne({
        _id: category.id,
      });
      return res.send({
        error: false,
        message: "Category Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = CategoryController;
