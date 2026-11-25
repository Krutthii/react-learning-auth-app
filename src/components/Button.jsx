// function Button({ text, type = "button", onClick }) {
//   return <button type={type} onClick={onClick}>{text}</button>
// }
// export default Button
export default function Button({ children, loading, ...rest }) {
  return (
    <button className="btn" disabled={loading} {...rest}>
      {loading ? "Please wait…" : children}
    </button>
  );
}
