const express = require("express");
const cards = require("./cards");

const router = express.Router();

const getCards = (req, res) => {
    res.status(200).json({ cards: cards });
};

router.get("/get", getCards);

module.exports = router;