function validateSchemas(schema) {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (err) {
            const errorMessages = err.details.map((err) => err.message);
            res.status(422).send(errorMessages);
        }
    };
}

export default validateSchemas