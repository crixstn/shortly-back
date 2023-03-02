import db from "../database/database.js";
import { nanoid } from "nanoid";

export async function postUrl(req,res){
    const { url } = req.body;
    const token = (req.headers.authorization).replace('Bearer ', '');
    
    try{
        const userExists = await db.query(`SELECT "user_id" FROM sessions WHERE token = $1`, [token]);
        if(!userExists.rows[0] || !token) return res.sendStatus(401);
        
        const id = userExists.rows[0].user_id;
        const shortUrl = nanoid();
        await db.query(`INSERT INTO urls (user_id, url, "shortUrl", "createdAt", "visitCount") VALUES ($1, $2, $3, NOW(), $4)`, [id, url, shortUrl, 0]);

        const table = await db.query(`SELECT id, "shortUrl" FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
        res.send(table.rows[0])
    }catch(err){
        return res.status(500).send(err.message);
    }
}

