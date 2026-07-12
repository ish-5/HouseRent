import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!userType) {
      setError("Please select a user type");
      return;
    }
    setLoading(true);
    try {
      const user = await register(name, email, password, userType);
      if (user.userType === "admin") navigate("/admin");
      else if (user.userType === "owner") navigate("/owner");
      else navigate("/renter");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-10">
      <div className="glass w-full max-w-md rounded-2xl border border-white/10 p-10">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-amber-950/60 flex items-center justify-center text-3xl mb-4">
            📝
          </div>
          <h1 className="text-2xl font-bold text-white">Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Renter Full Name / Owner Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-base-800 border border-white/10 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
          <input
            required
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-base-800 border border-white/10 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-base-800 border border-white/10 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
          <select
            required
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full bg-base-800 border border-white/10 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
          >
            <option value="" disabled>
              Select User Type
            </option>
            <option value="renter">Renter</option>
            <option value="owner">Owner</option>
          </select>

          {error && <p className="text-rose-400 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-accent-500 hover:bg-accent-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors shadow-glow"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          <span className="text-rose-400">Have an account? </span>
          <Link to="/login" className="text-accent-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
