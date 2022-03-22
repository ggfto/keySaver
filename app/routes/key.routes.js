  
module.exports = app => {
    const key = require("../controllers/key.controller.js");
    var router = require("express").Router();
    router.post("/", key.create);
    router.get("/", key.findAll);
    router.get("/:id", key.findOne);
    router.delete("/:id", key.delete);
    app.use('/api/keys', router);
  };