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
        res.status(201).send(table.rows[0])
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function getUrlbyId(req, res){
    const {id} = req.params;

    try{
        const url = await db.query(`SELECT id, "shortUrl", "url" FROM urls WHERE id = $1`, [id]);
        if(!url.rows[0]) return res.sendStatus(404);
        
        const views = await db.query(`SELECT "visitCount" FROM urls WHERE id = $1`, [id]);
        const count = (views.rows[0].visitCount)+1;
        await db.query(`UPDATE urls SET "visitCount"=$1 WHERE id = $2`, [count, id]);

        res.send(url.rows[0])
    } catch(err){
        return res.status(500).send(err.message);
    }
}

