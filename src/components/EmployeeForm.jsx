import React, { useState } from 'react'
import { createEmployee, updateEmployee } from '../api/employeeApi'

const empty = { firstName: '', lastName: '', email: '', position: '', salary: '', hiredDate: '' }

export default function EmployeeForm({ existing, onSaved }) {
  const [form, setForm] = useState(existing || empty)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // maximum lengths for fields
  const maxLengths = { firstName: 900, lastName: 150, position: 200 }

  React.useEffect(() => {
    setForm(existing || empty)
  }, [existing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // client-side length validation
    for (const key of ['firstName', 'lastName', 'position']) {
      const val = form[key] || ''
      if (val.length > (maxLengths[key] || Infinity)) {
        setError(`${key} must be at most ${maxLengths[key]} characters`)
        return
      }
    }

    setLoading(true)
    try {
      const payload = { ...form, salary: form.salary ? Number(form.salary) : null }
      let saved
      if (form.id) {
        saved = await updateEmployee(form.id, payload)
      } else {
        saved = await createEmployee(payload)
      }
      setForm(empty)
      onSaved && onSaved(saved)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 12, borderRadius: 6 }}>
      <h2>{form.id ? 'Update' : 'Create'} Employee</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <label>First name</label>
      <input name="firstName" value={form.firstName} onChange={handleChange} required maxLength={maxLengths.firstName} />

      <label>Last name</label>
      <input name="lastName" value={form.lastName} onChange={handleChange} required maxLength={maxLengths.lastName} />

      <label>Email</label>
      <input name="email" type="email" value={form.email} onChange={handleChange} required />

      <label>Position</label>
      <input name="position" value={form.position} onChange={handleChange} maxLength={maxLengths.position} />

      <label>Salary</label>
      <input name="salary" type="number" value={form.salary} onChange={handleChange} />

      <label>Hired date</label>
      <input name="hiredDate" type="date" value={form.hiredDate} onChange={handleChange} />

      <div>
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : (form.id ? 'Update' : 'Create')}</button>
      </div>
    </form>
  )
}
