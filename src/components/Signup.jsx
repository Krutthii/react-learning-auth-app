import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import Button from "./Button";
import { signup, emailOk, passwordError } from "../auth";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) return setError("Enter your full name.");
    if (!emailOk(form.email)) return setError("Enter a valid email address.");
    if (passwordError(form.password)) return setError(passwordError(form.password));
    if (form.password !== form.confirm) return setError("Passwords don’t match.");
    setLoading(true); setError("");
    try { await signup(form); navigate("/login", { state: { notice: "Account created. Log in to continue." } }); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <form className="card" onSubmit={submit} noValidate>
      <h1>Create account</h1>
      <p className="sub">It takes under a minute.</p>
      <InputField label="Full name" autoComplete="name" value={form.name} onChange={set("name")} />
      <InputField label="Email" type="email" autoComplete="email" value={form.email} onChange={set("email")} />
      <InputField label="Password" type="password" autoComplete="new-password" value={form.password} onChange={set("password")} />
      <InputField label="Confirm password" type="password" autoComplete="new-password" value={form.confirm} onChange={set("confirm")} />
      {error && <p className="msg err" role="alert">{error}</p>}
      <Button type="submit" loading={loading}>Create account</Button>
      <div className="row"><span /><Link to="/login">I already have an account</Link></div>
    </form>
  );
}