const API_BASE = '/api/employees'

export async function fetchEmployees() {
  const res = await fetch(API_BASE)
  if (!res.ok) throw new Error('Failed to fetch employees')
  return res.json()
}

export async function fetchEmployee(id) {
  const res = await fetch(`${API_BASE}/${id}`)
  if (!res.ok) throw new Error('Employee not found')
  return res.json()
}

export async function createEmployee(employee) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee)
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to create')
  }
  return res.json()
}

export async function updateEmployee(id, employee) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee)
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to update')
  }
  return res.json()
}
