


const moduleCLUB                =   require('../model/club');
const {validateRequiredFields}  =   require("../middleware/validatorApi");
const {sendWelcomeEmails}       =   require('../service/mailService');



const ClubController =
{
    new_club : async (req,res) =>
    {
        try 
        {
            const { name, read_time, members, firstBook } = req.body;
            const requiredFields = ['name', 'read_time', 'members', 'firstBook'];
            const validation = validateRequiredFields(req.body, requiredFields);
            
            if (!validation.success) 
            {
                return res.status(400).json({ message: validation.message, missingFields: validation.missingFields });
            }
    
            if (!Array.isArray(members) || members.length === 0) 
            {
                return res.status(400).json({ message: 'Members must be a non-empty array' });
            }
    
            const newClub = await moduleCLUB.insert_new_one(name, read_time, members, firstBook);
            
            if (!newClub) 
            {
                return res.status(400).json({ message: 'Error creating the club' });
            }
    
            await sendWelcomeEmails(members, newClub);
            return res.status(200).json({ message: 'Club created successfully' });
        } 
        catch (error)
        {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    },



    new_review : async (req,res) =>
    {
        try 
        {
            const { clubId, email: memberEmail } = req.user;
            const { content } = req.body;

            const validation = validateRequiredFields(req.body, ['content']);
            if (!validation.success)
            {
                return res.status(400).json({ message: validation.message, missingFields: validation.missingFields });
            }

            const review = await moduleCLUB.insert_new_review(clubId, memberEmail, content);

            if (!review)
            {
                return res.status(400).json({ message: 'Error creating the review' });
            }
            return res.status(200).json({ message: 'Review created successfully' });
        }
        catch (error)
        {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    },



    new_book : async (req,res) =>
    {
        try 
        {
            const { clubId } = req.user; 
            const { name, description } = req.body;
            const requiredFields = ['name', 'description'];
    
            const validation = validateRequiredFields(req.body, requiredFields);
            if (!validation.success) 
            {
                return res.status(400).json({ message: validation.message, missingFields: validation.missingFields });
            }
    
            const newBook = await moduleCLUB.insert_new_book(clubId, name, description);
    
            if (!newBook) 
            {
                return res.status(400).json({ message: 'Error creating the book' });
            }
    
            return res.status(200).json({ message: 'Book created successfully' });
        } 
        catch (error) 
        {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error', error: { message: error.message } });
        }
    },



    new_vote_counter : async (req,res) =>
    {
        try 
        {
            const { clubId } = req.user;
            const { bookId } = req.body;
            const requiredFields = ['bookId'];
    
            const validation = validateRequiredFields(req.body, requiredFields);
            if (!validation.success) 
            {
                return res.status(400).json({ message: validation.message, missingFields: validation.missingFields });
            }
    
            const newVote = await moduleCLUB.update_vote_count(clubId, bookId);
    
            if (!newVote) 
            {
                return res.status(400).json({ message: 'Error updating vote count' });
            }
    
            return res.status(200).json({ message: 'Vote count updated successfully' });
        } 
        catch (error) 
        {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error', error: { message: error.message } });
        }
    },



    new_current_book : async (req,res) =>
    {
        try 
        {
            const newActualBook = await moduleCLUB.update_current_book();
    
            if (!newActualBook) 
            {
                return res.status(400).json({ message: 'Error updating the current book' });
            }
            return res.status(200).json({ message: 'Current book updated successfully' });
        } 
        catch (error) 
        {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error', error: { message: error.message } });
        }
    }

}

module.exports = ClubController;