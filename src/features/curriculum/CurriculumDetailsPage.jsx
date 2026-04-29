// src/pages/Curriculum/CurriculumDetailsPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowRight,
  Plus,
  Save,
  Edit2,
  Trash2,
  Loader2,
  X,
  Check,
} from "lucide-react";
import { cn } from "../../utils/utils";
import api from "../../utils/api";
import { useThemeStore } from "../shared/store/useThemeStore";

export default function CurriculumDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useThemeStore();

  const [curriculum, setCurriculum] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [entryForm, setEntryForm] = useState({
    name: "",
    description: "",
    date: "",
    day: "",
    subject_id: "",
  });
  const [editingEntry, setEditingEntry] = useState(null);
  const [entrySaving, setEntrySaving] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // for inline delete in edit form
  const weekDays = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];
  const listRef = useRef(null); // ref for session table to scroll into view

  // Fetch curriculum info
  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        const res = await api.get(`/api/curriculums/${id}`);
        setCurriculum(res.data?.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setErrorMessage("Failed to load curriculum details");
      }
    };
    fetchCurriculum();
  }, [id]);

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get("/api/subjects?limit=0");
        setSubjects(res.data?.data || []);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setErrorMessage("Failed to load subjects");
      }
    };
    fetchSubjects();
  }, []);

  // Fetch entries
  const fetchEntries = async () => {
    try {
      const res = await api.get("/api/curriculum-entries", {
        params: { curriculum_id: id },
      });
      setEntries(res.data?.data || []);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setErrorMessage("Failed to load sessions");
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (id) fetchEntries();
  }, [id]);

  const resetEntryForm = () => {
    setEditingEntry(null);
    setEntryForm({
      name: "",
      description: "",
      date: "",
      day: "",
      subject_id: "",
    });
    setFormErrors({});
    setShowDeleteConfirm(false);
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setEntryForm({
      name: entry.name,
      description: entry.description || "",
      date: entry.date.split("T")[0],
      day: entry.day || "",
      subject_id: entry.subject_id,
    });
    setFormErrors({});
    setShowDeleteConfirm(false);
  };

  const validateForm = () => {
    const errors = {};
    if (!entryForm.name.trim()) errors.name = "Session title is required";
    if (!entryForm.date) errors.date = "Date is required";
    if (!entryForm.subject_id) errors.subject_id = "Subject is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitEntry = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setEntrySaving(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const payload = {
        name: entryForm.name.trim(),
        description: entryForm.description,
        date: entryForm.date,
        day: entryForm.day || null,
        subject_id: parseInt(entryForm.subject_id),
        curriculum_id: parseInt(id),
      };
      if (editingEntry) {
        await api.patch(`/api/curriculum-entries/${editingEntry.id}`, payload);
        setSuccessMessage("Session updated successfully");
      } else {
        await api.post("/api/curriculum-entries", payload);
        setSuccessMessage("Session added successfully");
      }
      resetEntryForm();
      await fetchEntries();
      setTimeout(() => setSuccessMessage(""), 3000);
      // Scroll to session list after add/update
      if (listRef.current) {
        listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Save failed");
    } finally {
      setEntrySaving(false);
    }
  };

  const handleDeleteFromForm = async () => {
    if (!editingEntry) return;
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await api.delete(`/api/curriculum-entries/${editingEntry.id}`);
      setSuccessMessage("Session deleted successfully");
      resetEntryForm();
      await fetchEntries();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Delete failed");
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const requestDeleteInForm = () => {
    setShowDeleteConfirm(true);
  };

  const cancelDeleteInForm = () => {
    setShowDeleteConfirm(false);
  };

  if (loading && !curriculum) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 size={30} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/curriculum")}
          className="text-sm text-primary-600 hover:text-primary-700 mb-2 inline-flex items-center gap-1"
        >
          <ArrowRight size={14} /> Back to Curricula
        </button>
        <h1
          className={cn(
            "text-2xl font-bold",
            isDark ? "text-white" : "text-foreground",
          )}
        >
          {curriculum?.name} - Sessions
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Cycle: {curriculum?.cycle?.name} | Class:{" "}
          {curriculum?.class?.name || "Cycle-level"} | Employee:{" "}
          {curriculum?.employee?.name} {curriculum?.employee?.lastname || ""}
        </p>
      </div>

      {/* Toast messages */}
      {errorMessage && (
        <div
          className={cn(
            "p-3 rounded-md text-sm flex items-center justify-between",
            isDark ? "bg-red-950/40 text-red-400" : "bg-red-50 text-red-700",
          )}
        >
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage("")} className="ml-2">
            <X size={14} />
          </button>
        </div>
      )}
      {successMessage && (
        <div
          className={cn(
            "p-3 rounded-md text-sm flex items-center justify-between",
            isDark
              ? "bg-green-950/40 text-green-400"
              : "bg-green-50 text-green-700",
          )}
        >
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage("")} className="ml-2">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Form */}
      <div
        className={cn(
          "rounded-lg border p-5",
          isDark ? "bg-gray-900 border-gray-800" : "bg-white border-border",
        )}
      >
        <h3 className="text-lg font-semibold mb-4">
          {editingEntry ? "Edit Session" : "Add New Session"}
        </h3>
        <form onSubmit={handleSubmitEntry} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Subject *
              </label>
              <select
                value={entryForm.subject_id}
                onChange={(e) =>
                  setEntryForm({ ...entryForm, subject_id: e.target.value })
                }
                className={cn(
                  "w-full px-3 py-2 rounded-md border",
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300",
                  formErrors.subject_id && "border-red-500",
                )}
              >
                <option value="">Select subject</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              {formErrors.subject_id && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.subject_id}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Session Date *
              </label>
              <input
                type="date"
                value={entryForm.date}
                onChange={(e) =>
                  setEntryForm({ ...entryForm, date: e.target.value })
                }
                className={cn(
                  "w-full px-3 py-2 rounded-md border",
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300",
                  formErrors.date && "border-red-500",
                )}
              />
              {formErrors.date && (
                <p className="text-red-500 text-xs mt-1">{formErrors.date}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Day (optional)
              </label>
              <select
                value={entryForm.day}
                onChange={(e) =>
                  setEntryForm({ ...entryForm, day: e.target.value })
                }
                className={cn(
                  "w-full px-3 py-2 rounded-md border",
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300",
                )}
              >
                <option value="">Select day</option>
                {weekDays.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Session Title *
              </label>
              <input
                type="text"
                value={entryForm.name}
                onChange={(e) =>
                  setEntryForm({ ...entryForm, name: e.target.value })
                }
                placeholder="e.g., Session 1 - Introduction"
                className={cn(
                  "w-full px-3 py-2 rounded-md border",
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300",
                  formErrors.name && "border-red-500",
                )}
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                What We Learned / Content
              </label>
              <textarea
                value={entryForm.description}
                onChange={(e) =>
                  setEntryForm({ ...entryForm, description: e.target.value })
                }
                rows="3"
                placeholder="Describe what was taught in this session..."
                className={cn(
                  "w-full px-3 py-2 rounded-md border",
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300",
                )}
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              type="submit"
              disabled={entrySaving}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 flex items-center gap-2 disabled:opacity-50"
            >
              {entrySaving && <Loader2 size={14} className="animate-spin" />}
              {editingEntry ? <Save size={16} /> : <Plus size={16} />}
              {editingEntry ? "Update" : "Add"}
            </button>
            {editingEntry && (
              <>
                {!showDeleteConfirm ? (
                  <button
                    type="button"
                    onClick={requestDeleteInForm}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleDeleteFromForm}
                      className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 flex items-center gap-2"
                    >
                      <Check size={16} /> Confirm Delete
                    </button>
                    <button
                      type="button"
                      onClick={cancelDeleteInForm}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </>
            )}
            {editingEntry && !showDeleteConfirm && (
              <button
                type="button"
                onClick={resetEntryForm}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table of sessions with ref for scroll */}
      <div
        ref={listRef}
        className={cn(
          "rounded-lg border scroll-mt-4",
          isDark ? "bg-gray-900 border-gray-800" : "bg-white border-border",
        )}
      >
        <div className="p-4 border-b">
          <h3 className="font-semibold">
            Session List ({entries.length} sessions)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className={isDark ? "bg-gray-800" : "bg-gray-50"}>
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Subject</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Day</th>
                <th className="px-4 py-3 text-left">Session Title</th>
                <th className="px-4 py-3 text-left">What We Learned</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-8">
                    <Loader2 size={20} className="animate-spin mx-auto" />
                  </td>
                </tr>
              ) : entries.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-8 text-muted-foreground"
                  >
                    No sessions added yet. Use the form above.
                  </td>
                </tr>
              ) : (
                entries.map((entry, idx) => (
                  <tr key={entry.id} className="border-t">
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium">
                      {entry.subject?.name}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{entry.day || "—"}</td>
                    <td className="px-4 py-3 font-semibold">{entry.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {entry.description || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleEditEntry(entry)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
