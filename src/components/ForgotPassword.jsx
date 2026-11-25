import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import Button from "./Button";
import { requestReset, emailOk } from "../auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (!emailOk(email)) return setError("Enter a valid email address.");
    setError("");
    const code = requestReset(email);
    if (code) {
      // DEMO: the code is shown here. In the real app it is emailed.
      navigate("/reset-password", { state: { email, demoCode: code } });
    } else {
      setInfo("If that email has an account, a reset code has been sent.");
    }
  }

  return (
    <form className="card" onSubmit={submit} noValidate>
      <h1>Forgot password</h1>
      <p className="sub">Enter your email and we’ll issue a reset code.</p>
      <InputField label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {error && <p className="msg err" role="alert">{error}</p>}
      {info && <p className="msg ok">{info}</p>}
      <Button type="submit">Send reset code</Button>
      <div className="row">
        <Link to="/login">Back to log in</Link>
        <Link to="/reset-password">I have a code</Link>
      </div>
    </form>
  );
}