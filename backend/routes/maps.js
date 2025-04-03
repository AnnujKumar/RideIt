const express = require("express");
const asyncWrap= require("../Errors/asyncCatch")
const {getCoordinate,getJourneyDetail,getAutoCompleteSuggestion} = require("../controllers/maps")
const router = express.Router();
router.get("/get-coordinate",asyncWrap(getCoordinate));
router.get("/get-journey-details",asyncWrap(getJourneyDetail))
router.get("/get-autocomplete-suggestions",asyncWrap(getAutoCompleteSuggestion));
module.exports = router;