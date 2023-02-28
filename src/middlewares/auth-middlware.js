import { signUpSchema, loginSchema } from "../schemas/auth-schema.js";

export async function validateSignUp(req, res, next){
    if(!req.body){
        return res.status(201).send("body is required.")
    }

    try{
        const validation = signUpSchema.validate( req.body, {abortEarly: false});
        if(validation.error){
            const err = validation.error.details.map((detail) => detail.message);
            return res.status(400).send(err)
        }

    }catch(err){
        return res.status(500).send(err.message);
    }

    next()
}

export async function validateLogin(req, res, next){
    if(!req.body){
        return res.status(201).send("body is required.")
    }

    try{
        const validation = loginSchema.validate(req.body, {abortEarly: false})
        if(validation.error){
            const err = validation.error.details.map((detail) => detail.message);
            return res.status(400).send(err)
        }
        
    }catch(err){
        return res.status(500).send(err.message);
    }

    next()
}