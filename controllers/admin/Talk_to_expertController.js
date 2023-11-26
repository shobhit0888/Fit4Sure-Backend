const Talk_To_Expert = require('../../models/Talk_To_Expert');
const Adminauth = require('../../models/Adminauth');


class Talk_To_ExpertController {
    static list = async (req, res) => {
        try {
            let talk_to_expert = await Talk_To_Expert.findOne()
            const admin = await Adminauth.find({});

            return res.render('admin/talk_to_expert', {
                admin,
                title: talk_to_expert ? talk_to_expert.title : "",
                description: talk_to_expert ? talk_to_expert.description : "",
                description2: talk_to_expert ? talk_to_expert.description2 : "",
                expor: talk_to_expert ? talk_to_expert.export : "",

            });
        } catch (error) {
            return res.send('Something went wrong please try again later');
        }
    };

    static add = async (req, res) => {
        try {
            const talk_to_expert = await Talk_To_Expert.findOne()
            if (talk_to_expert) {
                await Talk_To_Expert.findOneAndUpdate({},
                    {
                        title: req.body.title,
                        description: req.body.description,
                        description2: req.body.description2,
                        export: req.body.export,
                        updated_at: Date.now(),
                    } );
                return res.send({
                    error: false,
                    message: 'Talk To Expert added successfully',
                });
            } else {
                const talk_to_expert = Talk_To_Expert({
                    title: req.body.title,
                    description: req.body.description,
                    description2: req.body.description2,
                    export: req.body.export,
                });
                await talk_to_expert.save();
                return res.send({
                    error: false,
                    message: 'Talk To Expert added successfully',
                });
            }
        } catch (error) {
            return res.send('Something went wrong please try again later');
        }
    };
    
    static delete = async (req, res) =>{
        try {
            const talk_to_expert = await Talk_To_Expert.findOne({
                _id: req.body.id,
            });
            await talk_to_expert.deleteOne();
            return res.send({
                error: false,
                message: 'Talk To Expert deleted successfully',
            });
        } catch (error) {
            console.log(error);
            return res.send('Something went wrong please try again later');
        }
    }
}

module.exports = Talk_To_ExpertController;