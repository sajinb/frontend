import React from 'react'
import EmployeeList from './components/EmployeeList'
import EmployeeForm from './components/EmployeeForm'

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Employee Management</h1>
      <EmployeeForm />
      <hr />
      <EmployeeList />
    </div>
  )
}
