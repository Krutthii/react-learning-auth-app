import { useId, useState } from "react";

export default function InputField({ label, type = "text", value, onChange, ...rest }) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPw = type === "password";

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        <input id={id} type={isPw && show ? "text" : type} value={value} onChange={onChange} {...rest} />
        {isPw && (
          <button type="button" className="toggle" onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
}
