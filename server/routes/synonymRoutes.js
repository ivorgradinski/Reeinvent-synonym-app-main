const express = require('express');
const router = express.Router();
const synonymController = require('../controllers/synonymController');
const { ADD_SYNONYM, SEARCH_SYNONYM } = require('../constants/routes');
const { callbackErrorHandler } = require('../utils/errorHandlers');


router.post(ADD_SYNONYM, callbackErrorHandler(synonymController.addSynonym));
router.get(SEARCH_SYNONYM, callbackErrorHandler(synonymController.getSynonyms));

module.exports = router;
