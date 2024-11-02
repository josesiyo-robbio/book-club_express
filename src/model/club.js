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
                return firstBook;
            });
            console.log('results',result);
            return result
        }
        catch(error)
        {
            console.error('Error:', error);
            throw error;
        }
    }

}


module.exports = Club;