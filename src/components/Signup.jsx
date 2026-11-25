import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name, email, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <InputField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;