const router = require('express').Router();
const verify = require('./verifytoken');

router.get('/posts',verify,(req,res)=>{
    res.json({
        posts: "My first Post",
        description:"random data you should not use."
    });
});

module.exports = router;