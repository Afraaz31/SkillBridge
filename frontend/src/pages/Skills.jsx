import { useEffect, useState } from "react";
import api from "../services/api";
import { useToast } from "../context/ToastContext";
import LoadingSpinner from "../components/LoadingSpinner";

const categories = ["All", "Frontend", "Backend", "Database", "Tools", "DSA"];

const Skills = () => {
  const { showToast } = useToast();
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  // Reusable fetch so we can refresh after adding a skill
  const fetchSkills = async () => {
    try {
      const res = await api.get("/skills");
      setSkills(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Delete a skill after confirmation
  const handleDelete = async (skill) => {
    const confirmed = window.confirm(`Delete "${skill.name}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await api.delete(`/skills/${skill._id}`);
      // Remove from list locally (no need to re-fetch)
      setSkills((prev) => prev.filter((s) => s._id !== skill._id));
      showToast("Skill deleted", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to delete skill", "error");
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  // Show full-page error only if the initial load failed (no skills loaded)
  if (error && skills.length === 0) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  // Filter skills based on the active category
  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Skills</h1>
          <p className="text-gray-500 text-sm mt-1">
            You have {skills.length} skill{skills.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
        >
          + Add Skill
        </button>
      </div>

      {/* Action error banner (e.g. delete failed) */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 flex items-center justify-between text-sm">
          <span>{error}</span>
          <button onClick={() => setError("")} className="text-red-500 hover:text-red-700">
            ×
          </button>
        </div>
      )}

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      {skills.length === 0 ? (
        // No skills at all yet
        <div className="bg-white rounded-lg shadow-sm p-10 text-center">
          <div className="text-5xl mb-3">🎯</div>
          <p className="text-gray-800 font-medium mb-1">No skills added yet</p>
          <p className="text-gray-500 text-sm mb-4">
            Start tracking your first skill!
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            + Add Your First Skill
          </button>
        </div>
      ) : filteredSkills.length === 0 ? (
        // Has skills, but none in this category filter
        <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
          No skills in the "{activeCategory}" category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill._id}
              skill={skill}
              onEdit={() => {
                setEditingSkill(skill);
                setShowModal(true);
              }}
              onDelete={() => handleDelete(skill)}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Skill modal */}
      {showModal && (
        <AddSkillModal
          skillToEdit={editingSkill}
          onClose={() => {
            setShowModal(false);
            setEditingSkill(null);
          }}
          onSuccess={(msg) => {
            setShowModal(false);
            setEditingSkill(null);
            fetchSkills();
            showToast(msg, "success");
          }}
        />
      )}
    </div>
  );
};

// Level → progress bar width
const levelPercent = {
  Beginner: 30,
  Intermediate: 60,
  Advanced: 90,
};

// Status → badge colors
const statusColors = {
  Completed: "bg-green-100 text-green-700",
  Practicing: "bg-blue-100 text-blue-700",
  Learning: "bg-yellow-100 text-yellow-700",
  "Project Applied": "bg-purple-100 text-purple-700",
  "Not Started": "bg-red-100 text-red-700",
};

const SkillCard = ({ skill, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      {/* Top row: name + status badge */}
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            statusColors[skill.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {skill.status}
        </span>
      </div>

      {/* Category */}
      <p className="text-sm text-gray-500 mb-4">{skill.category}</p>

      {/* Level progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>{skill.level}</span>
          <span>{levelPercent[skill.level]}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${levelPercent[skill.level]}%` }}
          ></div>
        </div>
      </div>

      {/* Bottom row: evidence count + actions */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {skill.evidenceLinks?.length || 0} proof link
          {skill.evidenceLinks?.length !== 1 ? "s" : ""}
        </span>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md transition"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-sm text-red-600 hover:bg-red-50 px-3 py-1 rounded-md transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Dropdown options
const categoryOptions = ["Frontend", "Backend", "Database", "Tools", "DSA", "Other"];
const levelOptions = ["Beginner", "Intermediate", "Advanced"];
const statusOptions = ["Not Started", "Learning", "Practicing", "Project Applied", "Completed"];

const AddSkillModal = ({ skillToEdit, onClose, onSuccess }) => {
  const isEditing = Boolean(skillToEdit);

  const [form, setForm] = useState({
    name: skillToEdit?.name || "",
    category: skillToEdit?.category || "Frontend",
    level: skillToEdit?.level || "Beginner",
    status: skillToEdit?.status || "Not Started",
    notes: skillToEdit?.notes || "",
  });
  const [evidenceInput, setEvidenceInput] = useState("");
  const [evidenceLinks, setEvidenceLinks] = useState(skillToEdit?.evidenceLinks || []);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [saving, setSaving] = useState(false);

  // Update form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add an evidence link to the list
  const addEvidenceLink = () => {
    const link = evidenceInput.trim();
    if (link) {
      setEvidenceLinks([...evidenceLinks, link]);
      setEvidenceInput("");
    }
  };

  // Remove an evidence link
  const removeEvidenceLink = (idx) => {
    setEvidenceLinks(evidenceLinks.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!form.name.trim()) {
      setNameError("Skill name is required");
      return;
    }
    setNameError("");

    setSaving(true);
    try {
      if (isEditing) {
        await api.put(`/skills/${skillToEdit._id}`, { ...form, evidenceLinks });
      } else {
        await api.post("/skills", { ...form, evidenceLinks });
      }
      onSuccess(isEditing ? "Skill updated" : "Skill added");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save skill");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {isEditing ? "Edit Skill" : "Add Skill"}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
              ×
            </button>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  nameError ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="e.g. React"
              />
              {nameError && <p className="text-red-600 text-xs mt-1">{nameError}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {levelOptions.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Evidence links */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Evidence Links</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={evidenceInput}
                  onChange={(e) => setEvidenceInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addEvidenceLink();
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="GitHub repo, certificate, etc."
                />
                <button
                  type="button"
                  onClick={addEvidenceLink}
                  className="bg-gray-200 text-gray-700 px-3 rounded-md hover:bg-gray-300 transition"
                >
                  Add
                </button>
              </div>
              {evidenceLinks.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {evidenceLinks.map((link, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between bg-gray-50 px-3 py-1.5 rounded text-sm text-gray-700"
                    >
                      <span className="truncate">{link}</span>
                      <button
                        type="button"
                        onClick={() => removeEvidenceLink(idx)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Optional notes..."
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition"
              >
                {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Skill"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Skills;
