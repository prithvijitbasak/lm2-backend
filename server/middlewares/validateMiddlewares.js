const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch(err) {
        console.log(err);
        // res.status(400).json({message: "Validation failed"});

        const status = 400;
        const message = "Validation failed";
        const extraDetails = err.errors[0].message;

        const error = {
            status,
            message,
            extraDetails,
        }

        next(error);
    }
};

module.exports = validate;