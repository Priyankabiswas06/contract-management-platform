const { v4: uuidv4 } = require("uuid");
const blueprints = require("../models/blueprints");

exports.createBlueprint = (req, res) => {
  const { name, fields } = req.body;

  if (!name || !fields) {
    return res.status(400).json({ error: "Name and fields are required" });
  }

  const blueprint = {
    id: uuidv4(),
    name,
    fields,
    createdAt: new Date()
  };

  blueprints.push(blueprint);
  res.status(201).json(blueprint);
};

exports.getBlueprints = (req, res) => {
  res.json(blueprints);
};
