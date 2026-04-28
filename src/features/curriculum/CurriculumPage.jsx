// src/pages/Curriculum/CurriculumPage.jsx
import React from "react";
import { useNavigate } from "react-router";
import MasterComponent from "../shared/components/MasterComponent/MasterComponent";
import { useThemeStore } from "../shared/store/useThemeStore";
import { formatDate } from "../../utils/utils";
import { Eye } from "lucide-react";
import { cn } from "../../utils/utils";

export default function CurriculumPage() {
  const { isDark } = useThemeStore();
  const navigate = useNavigate();

  // ستون‌ها با دکمه "Manage Sessions" که به صفحه جزییات می‌رود
  const baseColumns = [
    { key: "id", label: "ID", width: "70px", sortable: true },
    { key: "name", label: "Curriculum Name", sortable: true },
    {
      key: "cycle.name",
      label: "Cycle",
      sortable: true,
      render: (val) => (
        <span className="font-medium text-primary-600">{val || "—"}</span>
      ),
    },
    {
      key: "class.name",
      label: "Class / Scope",
      sortable: false,
      render: (val, row) =>
        row.class_id ? (
          <span>{val}</span>
        ) : (
          <span className="text-muted-foreground italic">
            Cycle‑level template
          </span>
        ),
    },
    {
      key: "employee.name",
      label: "Responsible",
      sortable: false,
      render: (val) =>
        val ? (
          <span>{val}</span>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      key: "created_at",
      label: "Created",
      sortable: true,
      render: (val) => (
        <span className="text-muted-foreground text-xs">{formatDate(val)}</span>
      ),
    },
    {
      key: "actions",
      label: "Sessions",
      width: "120px",
      render: (_, record) => (
        <button
          onClick={() => navigate(`/curriculum/${record.id}/details`)}
          className={cn(
            "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition",
            "bg-primary-50 text-primary-700 hover:bg-primary-100",
          )}
        >
          <Eye size={13} />
          Manage Sessions
        </button>
      ),
    },
  ];

  const curriculumConfig = {
    apiPath: "/api/curriculums",
    entityName: "Curriculum",
    searchPlaceholder: "Search by curriculum name…",
    defaultOrderBy: "created_at:desc",
    pageSize: 15,
    emptyMessage: "No curricula defined yet. Create a new curriculum plan.",
    columns: baseColumns,
    filters: [
      {
        key: "cycle_id",
        label: "Cycle",
        fetchOptions: { url: "/api/cycles", valueKey: "id", labelKey: "name" },
      },
      {
        key: "class_id",
        label: "Class",
        fetchOptions: {
          url: "/api/classes",
          valueKey: "id",
          labelKey: "name",
          params: { limit: 0 },
        },
      },
      {
        key: "employee_id",
        label: "Responsible Employee",
        fetchOptions: {
          url: "/api/employees",
          valueKey: "id",
          labelKey: (emp) => `${emp.name} ${emp.lastname || ""}`.trim(),
        },
      },
    ],
    formSections: [
      {
        title: "General Information",
        keys: ["name", "cycle_id", "class_id", "employee_id"],
        columns: 2,
      },
    ],
    fields: [
      {
        key: "name",
        label: "Curriculum Name",
        type: "text",
        required: true,
        placeholder: "e.g. Business English – Cycle 12",
      },
      {
        key: "cycle_id",
        label: "Cycle",
        type: "select",
        required: true,
        fetchOptions: { url: "/api/cycles", valueKey: "id", labelKey: "name" },
      },
      {
        key: "class_id",
        label: "Class (optional)",
        type: "select",
        required: false,
        fetchOptions: {
          url: "/api/classes",
          valueKey: "id",
          labelKey: "name",
          params: { limit: 0 },
        },
        placeholder: "Leave empty for cycle‑level template",
      },
      {
        key: "employee_id",
        label: "Responsible Employee",
        type: "select",
        required: true,
        fetchOptions: {
          url: "/api/employees",
          valueKey: "id",
          labelKey: (emp) => `${emp.name} ${emp.lastname || ""}`.trim(),
        },
      },
    ],
    getRecordLabel: (record) => record.name,
    allowDelete: true,
    onCreated: (record) => console.log("[Curriculum] Created:", record?.name),
    onUpdated: (record) => console.log("[Curriculum] Updated:", record?.id),
    onDeleted: () => console.log("[Curriculum] Deleted"),
  };

  return (
    <MasterComponent
      config={curriculumConfig}
      isDark={isDark}
      title="Curriculum Management"
      subtitle="Define curriculum plans and manage sessions in the details page."
    />
  );
}
