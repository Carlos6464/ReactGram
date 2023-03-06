const express = require("express");
const router = express()

const UseRoutes = require("./UseRoutes");
const PhotoRoutes = require("./PhotoRoutes");
router.use("/api/users", UseRoutes);
router.use("/api/photos", PhotoRoutes);

router.get('/', (req, res) => {
   res.send("teste test");
})
module.exports = router;