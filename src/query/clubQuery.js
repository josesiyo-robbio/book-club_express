


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


    INSERT_NEW_REVIEW :
    `
    INSERT INTO
        reviews (club_id,member_id,content)
    VALUES
        ($1,$2,$3)
    RETURNING id;
    `,


    SELECT_MEMBER :
    `
    SELECT 
        id
    FROM 
        club_member
    WHERE
        email = $1 AND club_id = $2
    LIMIT
        1;
    `,


    UPDATE_REVIEW_COUNTER:
    `
    UPDATE 
        club 
    SET 
        reviews = reviews+1 
    WHERE 
        id = $1
    `,


    INSERT_NEW_CLUB_BOOK :
    `
    INSERT INTO
        club_book (club_id,name,description,is_current)
    VALUES 
        ($1,$2,$3,FALSE)
    RETURNING id;
    `,

    INSERT_NEW_VOTE:
    `
    INSERT INTO club_book_vote (club_id,book_id)
    VALUES($1,$2)
    `
}


module.exports = ClubQuery;