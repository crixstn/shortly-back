import db from "../database/database.js";

export async function getUser(req, res){
    const token = (req.headers.authorization).replace('Bearer ', '');

    try{
        const id = await db.query(`SELECT "user_id" FROM sessions WHERE token = $1`, [token]);
        if(!id.rows[0] || !token) return res.sendStatus(401);

        const datas = await db.query(`
            SELECT users.id, users.name, 
            SUM(urls."visitCount") AS "visitCount", 
                JSON_AGG(JSON_BUILD_OBJECT(
                    'id', urls.id, 
                    'shortUrl', urls."shortUrl",
                    'url', urls.url,
                    'visitCount' ,urls."visitCount"
                    )) AS "shortenedUrls"
            FROM users 
            JOIN urls 
                ON users.id = urls.user_id 
            WHERE users.id = $1
            GROUP BY users.id`, [id.rows[0].user_id])

        res.send(datas.rows[0]);
    }catch(err){
        return res.status(500).send(err.message);
    }
}