const Counting = require('../../models/Counting');
const Adminauth = require('../../models/Adminauth');

class CountingController {
    static list = async (req, res) => {
        try {
            const counting = await Counting.findOne();
            const admin = await Adminauth.find({});
            res.render('admin/counting', { 
                 admin,
                
                col_one: counting ? counting.col_one : "",
                col_two: counting ? counting.col_two : "",
                col_three: counting ? counting.col_three : "",
                col_four: counting ? counting.col_four : "",});
        } catch (error) {
            res.status(500).send
            return res.send({
                message: error.message || "Some error occurred while retrieving countings."
            })
        }
    }

    static add = async (req, res) => {
        try {
            const counting = await Counting.findOne()
            if (counting) {

                await Counting.findOneAndUpdate({},
                    {$set: {
                            col_one: req.body.col_one,
                            col_two: req.body.col_two,
                            col_three: req.body.col_three,
                            col_four: req.body.col_four,
                        }
                    }
                )
                return res.send({
                    error: false,
                    message: "Counting updated successfully",
                });
                            
            } else {
                const counting = new Counting({
                    col_one: req.body.col_one,
                    col_two: req.body.col_two,
                    col_three: req.body.col_three,
                    col_four: req.body.col_four,
                });
                const data = await counting.save();

                return res.send({
                    error: false,
                    message: "Counting added successfully",
                });
            }

        } catch (error) {
            res.status(500).send
            return res.send({
                message: error.message || "Some error occurred while creating counting."
            })
        }
    }

    static delete = async (req, res) => {
        try {
            console.log(req.body.id);
            await Counting.findOneAndDelete({
                _id: req.body.id,
            });;
            return res.send({
                error: false,
                message: "Counting deleted successfully",
            });
        } catch (error) {
            res.status(500).send
            return res.send({
                message: error.message || "Some error occurred while deleting counting."
            })
        }
    }
}

module.exports = CountingController;
