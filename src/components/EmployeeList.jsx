import React, { useEffect, useState } from 'react'
import { fetchEmployees } from '../api/employeeApi'
import EmployeeForm from './EmployeeForm'

export default function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)

  const load = async () => {
    setError('')
    setLoading(true)
    try {
      const data = await fetchEmployees()
      setEmployees(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleSaved = (saved) => {
    // reload list
    load()
    setEditing(null)
  }

  return (
    <div>
      <h2>Employees</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading ? <div>Loading...</div> : (
        <table style={{ width: '100%', background: '#fff', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 8 }}>ID</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Email</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Position</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Salary</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Hired</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td style={{ padding: 8 }}>{emp.id}</td>
                <td style={{ padding: 8 }}>{emp.firstName} {emp.lastName}</td>
                <td style={{ padding: 8 }}>{emp.email}</td>
                <td style={{ padding: 8 }}>{emp.position}</td>
                <td style={{ padding: 8 }}>{emp.salary}</td>
                <td style={{ padding: 8 }}>{emp.hiredDate}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => setEditing(emp)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editing && (
        <div style={{ marginTop: 12 }}>
          <EmployeeForm existing={editing} onSaved={handleSaved} />
          <button onClick={() => setEditing(null)} style={{ marginTop: 8 }}>Cancel</button>
        </div>
      )}
    </div>
  )
}
