const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        const response = {
            foodItems: global.food_items,
            foodCategory: global.food_category
        };

        res.send(response);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;