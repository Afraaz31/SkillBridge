import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
        setData(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
    );
  }

  const { user, stats, readiness, roleTemplate } = data;

  // Score color logic
  const score = readiness?.totalScore || 0;
  const scoreColor = score >= 70 ? "#16a34a" : score >= 40 ? "#ca8a04" : "#dc2626";
  const scoreTextColor = score >= 70 ? "text-green-600" : score >= 40 ? "text-yellow-600" : "text-red-600";

  // Circular progress math
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user.name}
        </h1>
        <p className="text-gray-500 mt-1">
          {user.targetRole
            ? `Target role: ${user.targetRole}`
            : "No target role set yet"}
        </p>
      </div>

      {/* No role template warning */}
      {!roleTemplate && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
          <p className="font-medium mb-1">Set your target role to see real readiness</p>
          <p className="text-sm">
            Go to{" "}
            <Link to="/profile" className="text-blue-600 hover:underline font-medium">
              Profile
            </Link>{" "}
            and choose a target role (Frontend, Backend, MERN, etc.)
          </p>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Skills" value={stats.totalSkills} color="blue" />
        <StatCard label="Completed Skills" value={stats.completedSkills} color="green" />
        <StatCard label="Total Projects" value={stats.totalProjects} color="purple" />
        <StatCard label="Completed Projects" value={stats.completedProjects} color="emerald" />
      </div>

      {/* Readiness score + weak areas + next steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Readiness Ring */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Readiness Score</h2>
          <div className="relative w-44 h-44">
            <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#e5e7eb"
                strokeWidth="14"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={scoreColor}
                strokeWidth="14"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${scoreTextColor}`}>{score}</span>
              <span className="text-sm text-gray-500">out of 100</span>
            </div>
          </div>
          {/* Mini score breakdown */}
          <div className="w-full mt-6 space-y-2 text-sm">
            <ScoreBar label="Skills (40)" value={readiness?.skillScore || 0} max={40} />
            <ScoreBar label="Projects (30)" value={readiness?.projectScore || 0} max={30} />
            <ScoreBar label="Proof (15)" value={readiness?.proofScore || 0} max={15} />
            <ScoreBar label="Consistency (15)" value={readiness?.consistencyScore || 0} max={15} />
          </div>
        </div>

        {/* Weak Areas */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Weak Areas</h2>
          {readiness?.weakAreas?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {readiness.weakAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No weak areas detected yet.</p>
          )}

          {readiness?.strengths?.length > 0 && (
            <>
              <h3 className="text-sm font-semibold text-gray-700 mt-6 mb-2">
                Your Strengths
              </h3>
              <div className="flex flex-wrap gap-2">
                {readiness.strengths.map((s, idx) => (
                  <span
                    key={idx}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Next Steps</h2>
          {readiness?.nextSteps?.length > 0 ? (
            <ul className="space-y-3">
              {readiness.nextSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">You're all caught up!</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Stat card sub-component
const StatCard = ({ label, value, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    purple: "bg-purple-50 text-purple-700",
    emerald: "bg-emerald-50 text-emerald-700",
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <p className="text-sm text-gray-500 mb-2">{label}</p>
      <p className={`text-3xl font-bold ${colors[color]} inline-block px-3 py-1 rounded-md`}>
        {value}
      </p>
    </div>
  );
};

// Mini score breakdown bar
const ScoreBar = ({ label, value, max }) => {
  const percent = max > 0 ? (value / max) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-blue-600 h-1.5 rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Dashboard;
