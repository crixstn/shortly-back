import db from "../database/database.js"
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function signUp(req, res){

    try{
        const {name, email, password} = req.body;

        const userExists = await db.query(`SELECT * FROM users WHERE email = $1`, [email])
        if(userExists.rows[0]) return res.send(409).send("Incorrect datas");

        const passwordHashed = bcrypt.hashSync(password,10)
        
        await db.query(`INSERT INTO users (name, email, password, "createdAt") VALUES ($1, $2, $3, NOW())`, [name, email, passwordHashed]);
        res.status(201).send("deubom")
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function login(req, res){

    try{
        const {email, password} = req.body;

        const userExists = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if(!userExists.rows[0] || !bcrypt.compareSync(password, userExists.rows[0].password)){
            return res.status(401).send("Incorrect datas");
        }

        const token = uuidV4();
        const id = userExists.rows[0].id;

        //await db-query(`DELET FROM sessions WHERE user-id = $1`, [id]);
        //await db.query(`INSERT INTO sessions (token, user-id, "createdAt") VALUES ($1, $2, NOW())`, [token, id])

        res.status(200).send(token);
    }catch(err){
        return res.status(500).send(err.message);
    }
}