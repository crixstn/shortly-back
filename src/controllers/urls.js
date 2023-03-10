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

        res.send(url.rows[0])
    } catch(err){
        return res.status(500).send(err.message);
    }
}

export async function openUrl(req, res){
    const {shortUrl} = req.params;

    try{
        const url = await db.query(`SELECT url FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
        if(!url.rows[0]) return res.sendStatus(404);

        const views = await db.query(`SELECT "visitCount" FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
        const count = (views.rows[0].visitCount)+1;
        await db.query(`UPDATE urls SET "visitCount"=$1 WHERE "shortUrl" = $2`, [count, shortUrl]);

        res.redirect(url.rows[0].url);
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function deleteUrl(req, res){
    const {id} = req.params;
    const token = (req.headers.authorization).replace('Bearer ', '');

    try{
        const userId = await db.query(`SELECT "user_id" FROM sessions WHERE token = $1`, [token]);
        if(!userId.rows[0] || !token) return res.sendStatus(401);    

        const shortUrl = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
        if(!shortUrl.rows[0]) return res.sendStatus(404);

        if(userId.rows[0].user_id !== shortUrl.rows[0].user_id) return res.sendStatus(401);
        await db.query(`DELETE FROM urls WHERE id = $1`, [id]);

        return res.sendStatus(204);
    }catch(err){
        return res.status(500).send(err.message);
    }
}
