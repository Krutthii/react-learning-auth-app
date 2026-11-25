import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import Button from "./Button";
import { resetPassword, passwordError } from "../auth";

export default function ResetPassword() {
  const state = useLocation().state || {};
  const [form, setForm] = useState({ email: state.email || "", code: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (passwordError(form.password)) return setError(passwordError(form.password));
    setLoading(true); setError("");
    try { await resetPassword(form); navigate("/login", { state: { notice: "Password updated. Log in with your new password." } }); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <form className="card" onSubmit={submit} noValidate>
      <h1>Reset password</h1>
      <p className="sub">Enter the code and choose a new password.</p>
      {state.demoCode && <p className="msg ok">Demo mode: no email is sent. Your code is {state.demoCode}.</p>}
      <InputField label="Email" type="email" autoComplete="email" value={form.email} onChange={set("email")} />
      <InputField label="Reset code" inputMode="numeric" maxLength={6} value={form.code} onChange={set("code")} />
      <InputField label="New password" type="password" autoComplete="new-password" value={form.password} onChange={set("password")} />
      {error && <p className="msg err" role="alert">{error}</p>}
      <Button type="submit" loading={loading}>Save new password</Button>
      <div className="row"><Link to="/login">Back to log in</Link><span /></div>
    </form>
  );
}
