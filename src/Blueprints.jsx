import { useState } from 'react'

function Blueprints({ blueprints, setBlueprints }) {
  const [showForm, setShowForm] = useState(false)
  const [blueprintName, setBlueprintName] = useState('')
  const [selectedBlueprintIndex, setSelectedBlueprintIndex] = useState(null)
  const [fieldType, setFieldType] = useState('text')
  const [fieldLabel, setFieldLabel] = useState('')

  function createBlueprint() {
    if (!blueprintName.trim()) return

    setBlueprints([
      ...blueprints,
      { name: blueprintName, fields: [] }
    ])

    setBlueprintName('')
    setShowForm(false)
  }

  function addField() {
    if (!fieldLabel.trim()) return

    const updated = [...blueprints]
    updated[selectedBlueprintIndex].fields.push({
      type: fieldType,
      label: fieldLabel,
      position: { x: 0, y: 0 }
    })

    setBlueprints(updated)
    setFieldLabel('')
  }

  return (
    <div>
      <h2>Blueprints</h2>

      <button onClick={() => setShowForm(true)}>
        Create Blueprint
      </button>

      {showForm && (
        <div>
          <input
            placeholder="Blueprint name"
            value={blueprintName}
            onChange={(e) => setBlueprintName(e.target.value)}
          />
          <button onClick={createBlueprint}>Save</button>
        </div>
      )}

      <ul>
        {blueprints.map((bp, index) => (
          <li key={index}>
            <span
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => setSelectedBlueprintIndex(index)}
            >
              {bp.name}
            </span>
          </li>
        ))}
      </ul>

      {selectedBlueprintIndex !== null && (
        <div>
          <h3>Add Field</h3>

          <select
            value={fieldType}
            onChange={(e) => setFieldType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="date">Date</option>
            <option value="checkbox">Checkbox</option>
            <option value="signature">Signature</option>
          </select>

          <input
            placeholder="Field label"
            value={fieldLabel}
            onChange={(e) => setFieldLabel(e.target.value)}
          />

          <button onClick={addField}>Add Field</button>

          <ul>
            {blueprints[selectedBlueprintIndex].fields.map((f, i) => (
              <li key={i}>
                {f.type} — {f.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Blueprints
