


const ClubQuery =
{
    INSERT_NEW_ONE :
    `
    INSERT INTO 
        club (name,read_time)
    VALUES 
        ($1,$2)
    RETURNING id;
    `,


    INSERT_CLUB_MEMBERS:
    `
    INSERT INTO 
        club_member (name,email,club_id)
    VALUES
        ($1,$2,$3)
    RETURNING id;
    `,

    INSERT_CLUB_BOOK :
    `
    INSERT INTO
        club_book (club_id,name,description,is_current)
    VALUES 
        ($1,$2,$3,TRUE)
    RETURNING id;
    `,
}


module.exports = ClubQuery;