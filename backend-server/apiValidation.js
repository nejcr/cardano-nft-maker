import { check, validationResult } from 'express-validator';

export const apiErrorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const mintRequestValidationSchema = [
    check('assetName')
        .isAlphanumeric()
        .withMessage('must be alphanumeric')
        .isLength({
            min: 3,
            max: 16,
        })
        .withMessage('must be between 3 and 16'),
    check('metadata', 'passwordConfirmation field must have the same value as the password field')
        .exists()
        .custom((value, { req }) => {
            const field = req.body?.metadata;
            if (Array.isArray(req.body?.metadata)) {
                if (field.length === 0) {
                    return true;
                }
                const keys = field?.map((item) => item.key);
                const containsKeyValue = field?.every((item) => item.hasOwnProperty('key') && item.hasOwnProperty('value'));
                if (!containsKeyValue) {
                    throw new Error('not every item contains key and value');
                }
                const hasDuplicateKeys = new Set(keys).size !== keys?.length;
                if (hasDuplicateKeys) {
                    throw new Error('metadata has duplicate keys');
                }
            } else {
                if (req.body.hasOwnProperty('metadata')) {
                    throw new Error('metadata must be an array of unique key value pair');
                }
            }

            return true;
        }),
];
