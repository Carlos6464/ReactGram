const express = require("express");
const router = express()

const UseRoutes = require("./UseRoutes");
router.use("/api/users", UseRoutes);

router.get('/', (req, res) => {
   res.send("teste test");
})
module.exports = router;