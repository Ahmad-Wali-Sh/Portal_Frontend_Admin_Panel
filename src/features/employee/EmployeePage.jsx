// ─────────────────────────────────────────────
// EmployeePage.jsx — example of MasterComponent in use
//
// This is the complete Employees page.
// All CRUD, search, filter, pagination is handled by MasterComponent.
// ─────────────────────────────────────────────

import React from 'react'
import MasterComponent from '../shared/components/MasterComponent/MasterComponent'
import { useThemeStore } from '../shared/store/useThemeStore'
import { formatCurrency, formatDate } from '../../utils/utils'

export default function EmployeesPage() {
  const { isDark } = useThemeStore()

  const employeesConfig = {
    apiPath: '/api/employees',
    entityName: 'Employee',

    // ── List ────────────────────────────────────────────────────────────────
    searchPlaceholder: 'Search by name, email, phone…',
    defaultOrderBy: 'created_at:desc',
    pageSize: 15,
    emptyMessage: 'No employees registered yet. Add your first employee.',

    columns: [
      { key: 'name', label: 'First Name', sortable: true },
      { key: 'lastname', label: 'Last Name', sortable: true },
      {
        key: 'email',
        label: 'Email',
        sortable: true,
        render: (val) => (
          <span className="font-medium text-primary-600">
            {val || '—'}
          </span>
        ),
      },
      { key: 'phone_number', label: 'Phone' },
      { key: 'gender.name', label: 'Gender' },
      { key: 'role.name', label: 'Role' },
      {
        key: 'salary',
        label: 'Salary',
        align: 'right',
        render: (val) => (
          <span className="font-mono text-xs text-muted-foreground">
            {formatCurrency(val)}
          </span>
        ),
      },
      {
        key: 'created_at',
        label: 'Registered',
        sortable: true,
        render: (val) => <span className="text-muted-foreground text-xs">{formatDate(val)}</span>,
      },
    ],

    filters: [
      {
        key: 'gender_id',
        label: 'Gender',
        fetchOptions: {
          url: '/api/genders',
          valueKey: 'id',
          labelKey: 'name',
        },
      },
      {
        key: 'role_id',
        label: 'Role',
        fetchOptions: {
          url: '/api/roles',
          valueKey: 'id',
          labelKey: 'name',
        },
      },
    ],

    // ── Form ────────────────────────────────────────────────────────────────
    formSections: [
      {
        title: 'Personal Information',
        keys: ['name', 'lastname', 'age', 'gender_id'],
        columns: 2,
      },
      {
        title: 'Contact & Account',
        keys: ['email', 'phone_number', 'password'],
        columns: 2,
      },
      {
        title: 'Employment',
        keys: ['role_id', 'salary', 'bio'],
        columns: 2,
      },
      {
        title: 'Profile',
        keys: ['image'],
        columns: 2,
      },
    ],

    fields: [
      {
        key: 'name',
        label: 'First Name',
        type: 'text',
        required: true,
        placeholder: 'e.g. Ahmad',
      },
      {
        key: 'lastname',
        label: 'Last Name',
        type: 'text',
        required: true,
        placeholder: 'e.g. Rahimi',
      },
      {
        key: 'age',
        label: 'Age',
        type: 'number',
        min: 18,
        max: 100,
      },
      {
        key: 'gender_id',
        label: 'Gender',
        type: 'select',
        fetchOptions: {
          url: '/api/genders',
          valueKey: 'id',
          labelKey: 'name',
        },
      },
      {
        key: 'email',
        label: 'Email Address',
        type: 'email',
        inputType: 'email',
        required: true,
        placeholder: 'employee@portal.com',
      },
      {
        key: 'phone_number',
        label: 'Phone Number',
        type: 'tel',
        inputType: 'tel',
        placeholder: '+93 7X XXX XXXX',
      },
      {
        key: 'password',
        label: 'Password',
        type: 'password',
        inputType: 'password',
        createOnly: true,
        required: true,
        placeholder: 'Initial login password',
        hint: 'Must be at least 8 characters.',
        validate: (val) => val && val.length < 8 ? 'Password must be at least 8 characters' : null,
      },
      {
        key: 'role_id',
        label: 'Role',
        type: 'select',
        fetchOptions: {
          url: '/api/roles',
          valueKey: 'id',
          labelKey: 'name',
        },
      },
      {
        key: 'salary',
        label: 'Salary',
        type: 'number',
        min: 0,
        step: 0.01,
        placeholder: '0.00',
      },
      {
        key: 'bio',
        label: 'Bio',
        type: 'textarea',
        rows: 3,
        fullWidth: true,
        placeholder: 'Short professional biography',
      },
      {
        key: 'image',
        label: 'Profile Photo',
        type: 'file',
        accept: 'image/*',
        fullWidth: false,
      },
    ],

    getRecordLabel: (record) => `${record.name} ${record.lastname}`,

    allowDelete: true,

    onCreated: (record) => console.log('[employees] Created:', record?.email),
    onUpdated: (record) => console.log('[employees] Updated:', record?.id),
    onDeleted: () => console.log('[employees] Deleted'),
  }

  return (
    <MasterComponent
      config={employeesConfig}
      isDark={isDark}
      title="Employees"
      subtitle="Register, search, and manage all employees."
    />
  )
}
