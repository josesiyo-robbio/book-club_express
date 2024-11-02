
const moduleCLUB = require('../model/club');


const ClubController =
{
     new_club : async (req,res) =>
    {
        try
        {
            const {name,read_time,members,firstBook} = req.body;


            const newCLub = await moduleCLUB.insert_new_one(name,read_time,members,firstBook);

            if(!newCLub)
            {
                res.status(400).json('error to get a club');
                return;
            }

            return res.status(200).json('club created successfully');
        }
        catch (error)
        {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }

    }


}

module.exports = ClubController;