// ─────────────────────────────────────────────────────────────────────────────
// SubjectPage.jsx
//
// Subjects management page — config-driven CRUD via MasterComponent.
// Subject model: name, class_score, project_score, final_score,
//                duration, maximum_absent
// API: /api/subjects  (getAll, getById, post, patch, delete)
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import MasterComponent from '../shared/components/MasterComponent/MasterComponent'
import { useThemeStore } from '../shared/store/useThemeStore'

// ── Score cell renderer ───────────────────────────────────────────────────────
function ScoreCell({ val, color = 'blue' }) {
    if (val === null || val === undefined || val === '') {
        return <span className="text-muted-foreground opacity-40">—</span>
    }

    const colorMap = {
        blue: 'bg-primary-50 text-primary-700',
        green: 'bg-secondary-100 text-secondary-700',
        amber: 'bg-accent-100 text-accent-700',
    }

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold font-mono ${colorMap[color]}`}>
            {Number(val).toFixed(2)}
        </span>
    )
}

// ── Subjects config ───────────────────────────────────────────────────────────
const subjectsConfig = {
    apiPath: '/api/subjects',
    entityName: 'Subject',

    // ── List ──────────────────────────────────────────────────────────────────
    searchPlaceholder: 'Search subjects…',
    defaultOrderBy: 'name:asc',
    pageSize: 20,
    emptyMessage: 'No subjects added yet. Create your first subject.',

    columns: [
        {
            key: 'id',
            label: 'ID',
            sortable: true,
            width: '60px',
            render: (val) => (
                <span className="text-xs font-mono text-muted-foreground">#{val}</span>
            ),
        },
        {
            key: 'name',
            label: 'Subject Name',
            sortable: true,
            render: (val) => (
                <span className="font-semibold text-sm">{val}</span>
            ),
        },
        {
            key: 'class_score',
            label: 'Class Score',
            align: 'right',
            render: (val) => <ScoreCell val={val} color="blue" />,
        },
        {
            key: 'project_score',
            label: 'Project Score',
            align: 'right',
            render: (val) => <ScoreCell val={val} color="green" />,
        },
        {
            key: 'final_score',
            label: 'Final Score',
            align: 'right',
            render: (val) => <ScoreCell val={val} color="amber" />,
        },
        {
            key: 'duration',
            label: 'Duration (hrs)',
            align: 'right',
            render: (val) =>
                val !== null && val !== undefined
                    ? <span className="text-sm font-mono">{val}</span>
                    : <span className="text-muted-foreground opacity-40">—</span>,
        },
        {
            key: 'maximum_absent',
            label: 'Max Absences',
            align: 'right',
            render: (val) =>
                val !== null && val !== undefined
                    ? (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${val <= 3 ? 'bg-red-100 text-red-700' : 'bg-muted text-muted-foreground'
                            }`}>
                            {val}
                        </span>
                    )
                    : <span className="text-muted-foreground opacity-40">—</span>,
        },
    ],

    // ── Form ──────────────────────────────────────────────────────────────────
    formSections: [
        {
            title: 'Basic Information',
            keys: ['name'],
            columns: 1,
        },
        {
            title: 'Score Configuration',
            keys: ['class_score', 'project_score', 'final_score'],
            columns: 3,
        },
        {
            title: 'Schedule & Attendance',
            keys: ['duration', 'maximum_absent'],
            columns: 2,
        },
    ],

    fields: [
        {
            key: 'name',
            label: 'Subject Name',
            type: 'text',
            required: true,
            fullWidth: true,
            placeholder: 'e.g. English Grammar, Business Writing…',
            validate: (val) => val && val.trim().length < 2 ? 'Name must be at least 2 characters' : null,
        },
        {
            key: 'class_score',
            label: 'Class Score',
            type: 'number',
            placeholder: '0.00',
            min: 0,
            max: 100,
            step: 0.01,
            hint: 'Maximum score for in-class participation/tests.',
        },
        {
            key: 'project_score',
            label: 'Project Score',
            type: 'number',
            placeholder: '0.00',
            min: 0,
            max: 100,
            step: 0.01,
            hint: 'Maximum score for project/assignment work.',
        },
        {
            key: 'final_score',
            label: 'Final Score',
            type: 'number',
            placeholder: '0.00',
            min: 0,
            max: 100,
            step: 0.01,
            hint: 'Maximum score for the final exam.',
        },
        {
            key: 'duration',
            label: 'Duration (hours)',
            type: 'number',
            placeholder: 'e.g. 40',
            min: 1,
            max: 1000,
            hint: 'Total teaching hours for this subject.',
        },
        {
            key: 'maximum_absent',
            label: 'Max Absences Allowed',
            type: 'number',
            placeholder: 'e.g. 3',
            min: 0,
            max: 100,
            hint: 'Student fails if absences exceed this limit.',
        },
    ],

    // Custom label shown in "Editing:" badge
    getRecordLabel: (r) => r.name,

    allowDelete: true,

    onCreated: (record) => console.log('[subjects] Created:', record?.name),
    onUpdated: (record) => console.log('[subjects] Updated:', record?.id),
    onDeleted: () => console.log('[subjects] Deleted'),
}

// ── Page Component ────────────────────────────────────────────────────────────
export default function SubjectPage() {
    const { isDark } = useThemeStore()

    return (
        <MasterComponent
            config={subjectsConfig}
            isDark={isDark}
            title="Subjects"
            subtitle="Manage course subjects, score weights, duration, and attendance limits."
        />
    )
}