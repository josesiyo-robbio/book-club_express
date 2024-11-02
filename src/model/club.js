const moduleDB   =   require('../db/postgres');
const moduleCLUBQUERY = require('../query/clubQuery');


const Club =
{
    insert_new_one : async(name,read_time,members,firstBook) =>
    {
        try
        {
            const result = await moduleDB.tx(async t =>
            {
                const club = await t.one(moduleCLUBQUERY.INSERT_NEW_ONE,[name,read_time]);
                const club_id = club.id;

                const membersInsert = members.map ( member => {
                    const { name, email } = member;
                    return t.one(moduleCLUBQUERY.INSERT_CLUB_MEMBERS,[name,email,club_id])
                });
                await Promise.all(membersInsert);

                const { name: bookName, description} = firstBook;
                await t.one(moduleCLUBQUERY.INSERT_CLUB_BOOK,[club_id,bookName,description]);
                return club_id;
            });
            console.log('results',result);
            return result;
        }
        catch(error)
        {
            console.error('Error:', error);
            throw error;
        }
    },


    insert_new_review : async(clubId,memberEmail,content) =>
    {
        try
        {
            const result = await moduleDB.tx(async t => {
                const memberClubId = await t.one(moduleCLUBQUERY.SELECT_MEMBER,[memberEmail,clubId]);

                 await t.one(moduleCLUBQUERY.INSERT_NEW_REVIEW,[clubId,memberClubId.id,content]);

                await t.none(moduleCLUBQUERY.UPDATE_REVIEW_COUNTER,[clubId]);
                return memberClubId;
            });
            console.log('results',result);
            return result;
        }
        catch(error)
        {
            console.error('Error:', error);
            throw error;
        }
    },


    insert_new_book : async(club_id,name,description) =>
    {
        try
        {
            const result = await moduleDB.tx(async t => {
                const newBook = await t.one(moduleCLUBQUERY.INSERT_NEW_CLUB_BOOK,[club_id,name,description]);
                const bookId = newBook.id;
                await t.none(moduleCLUBQUERY.INSERT_NEW_VOTE,[club_id,bookId]);
                return 'ok';
            });
            console.log('results',result);
            return result;

        }
        catch(error)
        {
            console.error('Error:', error);
            throw error;
        }
    },


    update_current_book : async() =>
    {
        try
        {
            const result = await moduleDB.tx(async t => {
                const topBook = await t.one(moduleCLUBQUERY.SELECT_TOP_BOOK);
                const bookId = topBook.book_id;

                await t.none(moduleCLUBQUERY.UPDATE_CURRENT_BOOK_STATUS);
                await t.one(moduleCLUBQUERY.UPDATE_CURRENT_BOOK,[bookId]);
                return bookId;
            });
            console.log('results',result);
            return result;
        }
        catch(error)
        {
            console.error('Error:', error);
            throw error;
        }
    },



    update_vote_count : async (clubId,bookId) =>
    {
        try
        {
            const result = await moduleDB.one({
                text : moduleCLUBQUERY.UPDATE_VOTE_COUNTER_BOOK,
                values : [clubId,bookId],
                rowMode : 'json'
            });
            console.log('results',result);
            return result;
        }
        catch(error)
        {
            console.error('Error:', error);
            throw error;
        }
    }

}


module.exports = Club;