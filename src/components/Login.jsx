import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import InputField from "./InputField";
import Button from "./Button";
import { login, emailOk } from "../auth";

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const notice = useLocation().state?.notice;
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (!emailOk(form.email)) return setError("Enter a valid email address.");
    setLoading(true); setError("");
    try { setUser(await login(form)); navigate("/dashboard"); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <form className="card" onSubmit={submit} noValidate>
      <h1>Log in</h1>
      <p className="sub">Welcome back.</p>
      <InputField label="Email" type="email" autoComplete="email" value={form.email} onChange={set("email")} />
      <InputField label="Password" type="password" autoComplete="current-password" value={form.password} onChange={set("password")} />
      {notice && <p className="msg ok">{notice}</p>}
      {error && <p className="msg err" role="alert">{error}</p>}
      <Button type="submit" loading={loading}>Log in</Button>
      <div className="row">
        <Link to="/forgot-password">Forgot password?</Link>
        <Link to="/signup">Create account</Link>
      </div>
    </form>
  );
}
