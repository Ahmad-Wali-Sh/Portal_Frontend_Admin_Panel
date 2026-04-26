// ─────────────────────────────────────────────────────────────────────────────
// ResourcePage.jsx
//
// Resources management page — supplementary materials for students including
// documents, links, files, media, and tools that support course content.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import MasterComponent from '../shared/components/MasterComponent/MasterComponent'
import { useThemeStore } from '../shared/store/useThemeStore'

// ── Type Badge Renderer ───────────────────────────────────────────────────────
function TypeBadge({ type }) {
    const typeStyles = {
        document: 'bg-primary-50 text-primary-700',
        link: 'bg-secondary-100 text-secondary-700',
        file: 'bg-accent-100 text-accent-700',
        media: 'bg-purple-100 text-purple-700',
        tool: 'bg-cyan-100 text-cyan-700',
    }

    const typeLabels = {
        document: 'PDF/Doc',
        link: 'Link',
        file: 'File',
        media: 'Media',
        tool: 'Tool',
    }

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${typeStyles[type] || 'bg-muted text-muted-foreground'}`}>
            {typeLabels[type] || type}
        </span>
    )
}

// ── Visibility Badge Renderer ──────────────────────────────────────────────────
function VisibilityBadge({ visibility }) {
    const isPublic = visibility === 'public' || visibility === 'all'

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${isPublic ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}>
            {isPublic ? 'All Students' : 'Instructors'}
        </span>
    )
}

// ── Resources Config ──────────────────────────────────────────────────────────
const resourcesConfig = {
    apiPath: '/api/resources',
    entityName: 'Resource',

    // ── List ──────────────────────────────────────────────────────────────────
    searchPlaceholder: 'Search resources by title, description…',
    defaultOrderBy: 'created_at:desc',
    pageSize: 15,
    emptyMessage: 'No resources added yet. Create your first resource.',

    columns: [
        {
            key: 'title',
            label: 'Title',
            sortable: true,
            render: (val, record) => (
                <div className="space-y-1">
                    <span className="font-semibold text-sm block">{val}</span>
                    {record.description && (
                        <span className="text-xs text-muted-foreground line-clamp-1">
                            {record.description}
                        </span>
                    )}
                </div>
            ),
        },
        {
            key: 'category',
            label: 'Category',
            sortable: true,
            width: '140px',
        },
        {
            key: 'type',
            label: 'Type',
            width: '100px',
            render: (val) => <TypeBadge type={val} />,
        },
        {
            key: 'visibility',
            label: 'Visibility',
            width: '120px',
            render: (val) => <VisibilityBadge visibility={val} />,
        },
        {
            key: 'url',
            label: 'Link',
            width: '100px',
            render: (val) =>
                val ? (
                    <a
                        href={val}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 underline text-xs font-medium"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Open
                    </a>
                ) : (
                    <span className="text-muted-foreground opacity-40">—</span>
                ),
        },
        {
            key: 'created_at',
            label: 'Added',
            sortable: true,
            width: '100px',
            render: (val) => <span className="text-muted-foreground text-xs">{formatDate(val)}</span>,
        },
    ],

    // ── Filters ─────────────────────────────────────────────────────────────────
    filters: [
        {
            key: 'category',
            label: 'Category',
            type: 'select',
            options: [
                { value: 'documents', label: 'Documents' },
                { value: 'links', label: 'Links' },
                { value: 'code_files', label: 'Code Files' },
                { value: 'templates', label: 'Templates' },
                { value: 'media', label: 'Media' },
                { value: 'tools', label: 'Tools' },
            ],
        },
        {
            key: 'type',
            label: 'Type',
            type: 'select',
            options: [
                { value: 'document', label: 'PDF/Document' },
                { value: 'link', label: 'Link' },
                { value: 'file', label: 'File' },
                { value: 'media', label: 'Media' },
                { value: 'tool', label: 'Tool' },
            ],
        },
        {
            key: 'visibility',
            label: 'Visibility',
            type: 'select',
            options: [
                { value: 'all', label: 'All Students' },
                { value: 'instructor', label: 'Instructors Only' },
            ],
        },
    ],

    // ── Form ──────────────────────────────────────────────────────────────────
    formSections: [
        {
            title: 'Basic Information',
            keys: ['title', 'description', 'category', 'type'],
            columns: 2,
        },
        {
            title: 'Resource Details',
            keys: ['url', 'file_path'],
            columns: 2,
        },
        {
            title: 'Access Control',
            keys: ['visibility'],
            columns: 1,
        },
    ],

    fields: [
        {
            key: 'title',
            label: 'Resource Title',
            type: 'text',
            required: true,
            fullWidth: true,
            placeholder: 'e.g. Week 3 - React Component Diagram',
            validate: (val) => val && val.trim().length < 3 ? 'Title must be at least 3 characters' : null,
        },
        {
            key: 'description',
            label: 'Description',
            type: 'textarea',
            rows: 3,
            fullWidth: true,
            placeholder: 'Brief description of the resource and how students should use it…',
        },
        {
            key: 'category',
            label: 'Category',
            type: 'select',
            required: true,
            options: [
                { value: 'documents', label: 'Documents' },
                { value: 'links', label: 'Links' },
                { value: 'code_files', label: 'Code Files' },
                { value: 'templates', label: 'Templates' },
                { value: 'media', label: 'Media' },
                { value: 'tools', label: 'Tools' },
            ],
            hint: 'Group resources by type for easier navigation',
        },
        {
            key: 'type',
            label: 'Resource Type',
            type: 'select',
            required: true,
            options: [
                { value: 'document', label: 'PDF/Document' },
                { value: 'link', label: 'External Link' },
                { value: 'file', label: 'Downloadable File' },
                { value: 'media', label: 'Media (Video/Audio)' },
                { value: 'tool', label: 'Tool/Software' },
            ],
        },
        {
            key: 'url',
            label: 'URL / Link',
            type: 'url',
            fullWidth: true,
            placeholder: 'https://example.com/resource or /uploads/file.pdf',
            hint: 'For external links or hosted files',
        },
        {
            key: 'file_path',
            label: 'File Path',
            type: 'text',
            fullWidth: true,
            placeholder: '/storage/resources/example.pdf',
            hint: 'Local server path (if not using URL)',
        },
        {
            key: 'visibility',
            label: 'Visibility',
            type: 'select',
            options: [
                { value: 'all', label: 'All Students' },
                { value: 'instructor', label: 'Instructors Only' },
            ],
            hint: 'Control who can access this resource',
        },
    ],

    // Custom label shown in "Editing:" badge
    getRecordLabel: (r) => r.title,

    allowDelete: true,

    onCreated: (record) => console.log('[resources] Created:', record?.title),
    onUpdated: (record) => console.log('[resources] Updated:', record?.id),
    onDeleted: () => console.log('[resources] Deleted'),
}

// ── Page Component ────────────────────────────────────────────────────────────
export default function ResourcePage() {
    const { isDark } = useThemeStore()

    return (
        <MasterComponent
            config={resourcesConfig}
            isDark={isDark}
            title="Resources"
            subtitle="Manage supplementary materials, documents, links, and tools for students."
        />
    )
}

// ── Helper: Date Formatter ─────────────────────────────────────────────────────
function formatDate(dateString) {
    if (!dateString) return '—'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}