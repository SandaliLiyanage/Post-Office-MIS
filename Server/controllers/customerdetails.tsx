import express from 'express';
var router = express.Router();

router.post('/customerDetails', (req, res) => {
    console.log(req.body);
    res.send("Customer details saved");
})

export default router;