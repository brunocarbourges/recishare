const validate = (schema) => async function(req, res, next) {
    try {
        await schema.validate({
            ...(req?.body ? { body: req.body } : {}), 
            ...(req?.query ? { query: req.query } : {}),
            ...(req?.params ? { params: req.params } : {}),

            /* 
            If req.body exists, body object set and properties spread to the object, else empty object 
            Same logic for the other two
            */

        });
        return next();  // continue to the next middleware
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export default validate;