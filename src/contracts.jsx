import { useState, useEffect } from 'react'

const STATUS_FLOW = ['Created', 'Approved', 'Sent', 'Signed', 'Locked']

function Contracts({ blueprints }) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [values, setValues] = useState([])

  const [contracts, setContracts] = useState(() => {
    const saved = localStorage.getItem('contracts')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('contracts', JSON.stringify(contracts))
  }, [contracts])

  function handleChange(label, value) {
    setValues({ ...values, [label]: value })
  }

  function createContract() {
    setContracts([
      ...contracts,
      {
        name: blueprints[selectedIndex].name,
        values,
        status: 'Created',
        createdAt: new Date().toLocaleString()
      }
    ])
    setValues({})
  }

  function nextStatus(index) {
    const updated = [...contracts]
    const current = updated[index].status
    const next = STATUS_FLOW[STATUS_FLOW.indexOf(current) + 1]
    if (next) updated[index].status = next
    setContracts(updated)
  }

  function revokeContract(index) {
    const updated = [...contracts]
    updated[index].status = 'Revoked'
    setContracts(updated)
  }

  return (
    <div>
      <h2>Contracts</h2>

      <select onChange={(e) => setSelectedIndex(e.target.value)}>
        <option value="">Select Blueprint</option>
        {blueprints.map((bp, index) => (
          <option key={index} value={index}>
            {bp.name}
          </option>
        ))}
      </select>

      {selectedIndex !== null && blueprints[selectedIndex] && (
        <div>
          <h3>{blueprints[selectedIndex].name} Contract</h3>

          {blueprints[selectedIndex].fields.map((field, i) => (
            <div key={i}>
              <label>{field.label}</label>

              {field.type === 'text' && (
                <input
                  type="text"
                  onChange={(e) =>
                    handleChange(field.label, e.target.value)
                  }
                />
              )}

              {field.type === 'date' && (
                <input
                  type="date"
                  onChange={(e) =>
                    handleChange(field.label, e.target.value)
                  }
                />
              )}

              {field.type === 'checkbox' && (
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleChange(field.label, e.target.checked)
                  }
                />
              )}

              {field.type === 'signature' && (
                <input
                  type="text"
                  placeholder="Sign here"
                  onChange={(e) =>
                    handleChange(field.label, e.target.value)
                  }
                />
              )}
            </div>
          ))}

          <button onClick={createContract}>
            Create Contract
          </button>
        </div>
      )}

      <h3>Contract List</h3>

      <ul>
        {contracts.map((c, i) => (
          <li key={i}>
            {c.name} | {c.status} | {c.createdAt}

            {c.status !== 'Locked' && c.status !== 'Revoked' && (
              <button onClick={() => nextStatus(i)}>
                Next
              </button>
            )}

            {(c.status === 'Created' || c.status === 'Sent') && (
              <button onClick={() => revokeContract(i)}>
                Revoke
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* ✅ DASHBOARD (INSIDE RETURN) */}
      <h3>Dashboard</h3>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Contract Name</th>
            <th>Status</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.status}</td>
              <td>{c.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Contracts
