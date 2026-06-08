import { useEffect, useState } from "react";
import api from "../services/api";
import { useToast } from "../context/ToastContext";
import LoadingSpinner from "../components/LoadingSpinner";

const Projects = () => {
  const { showToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Reusable fetch so we can refresh after add/edit
  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Delete a project after confirmation
  const handleDelete = async (project) => {
    const confirmed = window.confirm(`Delete "${project.title}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await api.delete(`/projects/${project._id}`);
      setProjects((prev) => prev.filter((p) => p._id !== project._id));
      showToast("Project deleted", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to delete project", "error");
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  // Full-page error only if initial load failed
  if (error && projects.length === 0) {
    return <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Projects</h1>
          <p className="text-gray-500 text-sm mt-1">
            You have {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
        >
          + Add Project
        </button>
      </div>

      {/* Action error banner */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 flex items-center justify-between text-sm">
          <span>{error}</span>
          <button onClick={() => setError("")} className="text-red-500 hover:text-red-700">
            ×
          </button>
        </div>
      )}

      {/* Projects grid / empty state */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-10 text-center">
          <div className="text-5xl mb-3">🚀</div>
          <p className="text-gray-800 font-medium mb-1">No projects added yet</p>
          <p className="text-gray-500 text-sm mb-4">
            Showcase your work by adding your first project!
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            + Add Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={() => {
                setEditingProject(project);
                setShowModal(true);
              }}
              onDelete={() => handleDelete(project)}
            />
          ))}
        </div>
      )}

      {/* Add / Edit modal */}
      {showModal && (
        <ProjectModal
          projectToEdit={editingProject}
          onClose={() => {
            setShowModal(false);
            setEditingProject(null);
          }}
          onSuccess={(msg) => {
            setShowModal(false);
            setEditingProject(null);
            fetchProjects();
            showToast(msg, "success");
          }}
        />
      )}
    </div>
  );
};

// Status → badge colors
const statusColors = {
  Planned: "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
};

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 flex flex-col">
      {/* Top: title + status */}
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            statusColors[project.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* Description (truncated to 2 lines) */}
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{project.description}</p>

      {/* Tech stack tags */}
      {project.techStack?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Completion progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Completion</span>
          <span>{project.completionPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${project.completionPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-3 mb-4 text-sm">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-600 hover:underline"
          >
            GitHub
          </a>
        )}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-600 hover:underline"
          >
            Live Demo
          </a>
        )}
      </div>

      {/* Actions (pushed to bottom) */}
      <div className="flex gap-2 justify-end mt-auto">
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
  );
};

const statusOptions = ["Planned", "In Progress", "Completed"];

const ProjectModal = ({ projectToEdit, onClose, onSuccess }) => {
  const isEditing = Boolean(projectToEdit);

  const [form, setForm] = useState({
    title: projectToEdit?.title || "",
    description: projectToEdit?.description || "",
    techStack: projectToEdit?.techStack?.join(", ") || "",
    githubLink: projectToEdit?.githubLink || "",
    liveLink: projectToEdit?.liveLink || "",
    status: projectToEdit?.status || "Planned",
    completionPercent: projectToEdit?.completionPercent ?? 0,
    learnings: projectToEdit?.learnings || "",
    challenges: projectToEdit?.challenges || "",
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    const errors = {};
    if (!form.title.trim()) errors.title = "Title is required";
    if (!form.description.trim()) errors.description = "Description is required";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    setSaving(true);

    // Convert comma-separated techStack string into an array
    const payload = {
      ...form,
      techStack: form.techStack
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      completionPercent: Number(form.completionPercent),
    };

    try {
      if (isEditing) {
        await api.put(`/projects/${projectToEdit._id}`, payload);
      } else {
        await api.post("/projects", payload);
      }
      onSuccess(isEditing ? "Project updated" : "Project added");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save project");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {isEditing ? "Edit Project" : "Add Project"}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
              ×
            </button>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  fieldErrors.title ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="e.g. SkillBridge"
              />
              {fieldErrors.title && <p className="text-red-600 text-xs mt-1">{fieldErrors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  fieldErrors.description ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="What is this project about?"
              ></textarea>
              {fieldErrors.description && (
                <p className="text-red-600 text-xs mt-1">{fieldErrors.description}</p>
              )}
            </div>

            {/* Tech stack */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tech Stack <span className="text-gray-400 font-normal">(comma-separated)</span>
              </label>
              <input
                type="text"
                name="techStack"
                value={form.techStack}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
                <input
                  type="text"
                  name="githubLink"
                  value={form.githubLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Live Link</label>
                <input
                  type="text"
                  name="liveLink"
                  value={form.liveLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
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

            {/* Completion percent slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Completion: {form.completionPercent}%
              </label>
              <input
                type="range"
                name="completionPercent"
                min="0"
                max="100"
                value={form.completionPercent}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* Learnings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Learnings</label>
              <textarea
                name="learnings"
                value={form.learnings}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What did you learn?"
              ></textarea>
            </div>

            {/* Challenges */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Challenges</label>
              <textarea
                name="challenges"
                value={form.challenges}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What challenges did you face?"
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
                {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Projects;
