const { v4: uuidv4 } = require("uuid");
const contracts = require("../models/contracts");
const blueprints = require("../models/blueprints");

const lifecycle = {
  CREATED: ["APPROVED", "REVOKED"],
  APPROVED: ["SENT"],
  SENT: ["SIGNED", "REVOKED"],
  SIGNED: ["LOCKED"],
  LOCKED: [],
  REVOKED: []
};

// Create contract from blueprint
exports.createContract = (req, res) => {
  const { name, blueprintId } = req.body;

  if (!name || !blueprintId) {
    return res.status(400).json({ error: "name and blueprintId required" });
  }

  const blueprint = blueprints.find(b => b.id === blueprintId);
  if (!blueprint) {
    return res.status(404).json({ error: "Blueprint not found" });
  }

  const contract = {
    id: uuidv4(),
    name,
    blueprintName: blueprint.name,
    status: "CREATED",
    fields: blueprint.fields.map(f => ({
      ...f,
      value: ""
    })),
    createdAt: new Date()
  };

  contracts.push(contract);
  res.status(201).json(contract);
};

// Get all contracts
exports.getContracts = (req, res) => {
  res.json(contracts);
};

// Change contract status (LIFECYCLE)
exports.changeStatus = (req, res) => {
  const { nextStatus } = req.body;
  const contract = contracts.find(c => c.id === req.params.id);

  if (!contract) {
    return res.status(404).json({ error: "Contract not found" });
  }

  const allowed = lifecycle[contract.status];

  if (!allowed.includes(nextStatus)) {
    return res.status(400).json({
      error: `Invalid transition from ${contract.status} to ${nextStatus}`
    });
  }

  contract.status = nextStatus;
  res.json(contract);
};

