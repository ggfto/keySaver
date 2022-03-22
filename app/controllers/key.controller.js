const fs = require("fs");

openFile = function(fileName) {
  try {
    let keys = fs.readFileSync(fileName, "utf8", function(err, data) {
      if(err) throw err;
      return data;
    });
    return JSON.parse(keys);
  } catch(err) {
    if(err.code != 'ENOENT') console.error(err);
    return {};
  }
}

saveFile = function(fileName, data) {
  fs.writeFileSync(fileName, JSON.stringify(data), "utf8");
  return openFile(fileName);
}

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Conteúdo não pode ser vazio!"
    });
    return;
  }
  try {
    let objeto = req.body;
    objeto = JSON.parse(JSON.stringify(objeto));
    let keys = openFile("keys.json");
    for(var key in objeto) {
      keys[key] = objeto[key];
    }
    saveFile("keys.json", keys);
    res.send(keys);
  } catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message
    });
  }
};

exports.findAll = (req, res) => {
  try{
    res.send(openFile("keys.json"));
  } catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message
    });
  }
}

exports.findOne = (req, res) => {
  let id = req.params.id;
  try {
    let keys = openFile("keys.json");
    if(keys[id] == undefined) res.status(404).send({ message: "Not found"});
    res.send({ value: keys[id] });
  } catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message
    });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  try {
    keys = openFile("keys.json");
    delete keys[id];
    res.send(saveFile("keys.json", keys));
  } catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message
    });
  }
};