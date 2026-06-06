import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const GapAnalysis = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [noRole, setNoRole] = useState(false);

  useEffect(() => {
    const fetchGapAnalysis = async () => {
      try {
        const res = await api.get("/gap-analysis");
        setData(res.data.data);
      } catch (err) {
        // Backend returns 400 when no target role is set
        if (err.response?.status === 400) {
          setNoRole(true);
        } else {
          setError(err.response?.data?.message || "Failed to load gap analysis");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchGapAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // No target role set
  if (noRole) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Gap Analysis</h1>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-6 rounded-lg">
          <p className="font-medium mb-1">Set your target role first</p>
          <p className="text-sm">
            Gap analysis compares your skills against a target role. Go to{" "}
            <Link to="/profile" className="text-blue-600 hover:underline font-medium">
              Profile
            </Link>{" "}
            and choose a role (Frontend, Backend, MERN, etc.)
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>;
  }

  const { targetRole, overallMatch, matchedSkills, missingSkills, weakSkills, recommendations } = data;

  // Match percentage color
  const matchColor =
    overallMatch >= 70 ? "text-green-600" : overallMatch >= 40 ? "text-yellow-600" : "text-red-600";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Gap Analysis</h1>

      {/* Summary banner */}
      <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Target Role</p>
          <p className="text-xl font-semibold text-gray-800">{targetRole}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Overall Match</p>
          <p className={`text-3xl font-bold ${matchColor}`}>{overallMatch}%</p>
        </div>
      </div>

      {/* Three skill sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Matched */}
        <SkillSection
          title="Matched Skills"
          subtitle="Skills you actively have"
          count={matchedSkills.length}
          emptyText="No matched skills yet."
        >
          {matchedSkills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill.name} <span className="opacity-70">· {skill.status}</span>
            </span>
          ))}
        </SkillSection>

        {/* Missing */}
        <SkillSection
          title="Missing Skills"
          subtitle="Required but not added"
          count={missingSkills.length}
          emptyText="No missing skills. Great!"
        >
          {missingSkills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </SkillSection>

        {/* Weak */}
        <SkillSection
          title="Weak Skills"
          subtitle="Added but low level"
          count={weakSkills.length}
          emptyText="No weak skills."
        >
          {weakSkills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill.name} <span className="opacity-70">· {skill.status}</span>
            </span>
          ))}
        </SkillSection>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h2>
        {recommendations?.length > 0 ? (
          <ul className="space-y-3">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">You're on track!</p>
        )}
      </div>
    </div>
  );
};

// Reusable section card with title, count, and badge container
const SkillSection = ({ title, subtitle, count, emptyText, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        <span className="text-sm font-medium text-gray-400">{count}</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">{subtitle}</p>
      {count > 0 ? (
        <div className="flex flex-wrap gap-2">{children}</div>
      ) : (
        <p className="text-sm text-gray-400">{emptyText}</p>
      )}
    </div>
  );
};

export default GapAnalysis;
