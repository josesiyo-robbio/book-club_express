


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
    `,


    UPDATE_VOTE_COUNTER_BOOK:
    `
    UPDATE club_book_vote
    SET 
        vote_count = vote_count + 1 
    WHERE 
        club_id = $1 
    AND 
        book_id = $2
    RETURNING vote_count;
    `,


    SELECT_TOP_BOOK:
    `
    SELECT
        book_id
    FROM 
        club_book_vote
    ORDER BY 
        vote_count DESC
    LIMIT 1;
    `,

    UPDATE_CURRENT_BOOK :
    `
    UPDATE
        club_book
    SET
        is_current = TRUE
    WHERE 
        id = $1
    RETURNING id;
    `,


    UPDATE_CURRENT_BOOK_STATUS:
    `UPDATE 
        club_book 
    SET
        is_current = FALSE 
    WHERE 
        is_current = TRUE
    `
}


module.exports = ClubQuery;