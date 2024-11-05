const synonymService = require('../services/synonymService');
const { errors } = require('../constants/errors');
const { addSynonymSchema, getSynonymSchema } = require('../validators/synonymValidator');

exports.addSynonym = async (req, res) => {
    const { error } = addSynonymSchema.validate(req.body);
    if (error) {
        throw errors.VALIDATION(error.details[0].message);
    }

    const { word, synonyms } = req.body;
    await synonymService.addSynonym(word, synonyms);
    return res.status(201).json({ message: 'Synonyms added successfully' });
};

exports.getSynonyms = async (req, res) => {
    const { error } = getSynonymSchema.validate(req.params);
    if (error) {
        throw errors.VALIDATION(error.details[0].message);
    }

    const { word } = req.params;
    const synonyms = await synonymService.getSynonyms(word);

    if (!synonyms) {
        throw errors.NOT_FOUND('Word not found');
    }

    return res.status(200).json({ synonyms });
};
