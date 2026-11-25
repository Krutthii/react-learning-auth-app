// DEMO auth: data is stored in localStorage. Replace these functions with
// fetch() calls to your Spring Boot API when the backend is ready.
const USERS = "users", SESSION = "session";
const read = () => { try { return JSON.parse(localStorage.getItem(USERS) || "{}"); } catch { return {}; } };
const write = (d) => localStorage.setItem(USERS, JSON.stringify(d));
const hash = async (p, salt) => {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + p));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
};

export const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
export const passwordError = (p) =>
  p.length < 8 || !/[A-Za-z]/.test(p) || !/\d/.test(p)
    ? "Password needs 8+ characters with a letter and a number." : "";

export function getUser() {
  const email = localStorage.getItem(SESSION), u = email && read()[email];
  return u ? { email, name: u.name } : null;
}

export async function signup({ name, email, password }) {
  email = email.trim().toLowerCase();
  const d = read();
  if (d[email]) throw new Error("An account with this email already exists.");
  const salt = crypto.randomUUID();
  d[email] = { name: name.trim(), salt, pw: await hash(password, salt) };
  write(d);
}

export async function login({ email, password }) {
  email = email.trim().toLowerCase();
  const u = read()[email];
  if (!u || u.pw !== (await hash(password, u.salt))) throw new Error("Email or password is incorrect.");
  localStorage.setItem(SESSION, email);
  return { email, name: u.name };
}

export const logout = () => localStorage.removeItem(SESSION);

export function requestReset(email) {
  email = email.trim().toLowerCase();
  const d = read();
  if (!d[email]) return null; // do not reveal whether the account exists
  const code = String(Math.floor(100000 + Math.random() * 900000));
  d[email].code = code; d[email].exp = Date.now() + 10 * 60 * 1000;
  write(d);
  return code; // in the real app this is emailed, never returned
}

export async function resetPassword({ email, code, password }) {
  email = email.trim().toLowerCase();
  const d = read(), u = d[email];
  if (!u || !u.code || u.code !== code.trim() || Date.now() > u.exp) throw new Error("That code is invalid or has expired.");
  u.salt = crypto.randomUUID(); u.pw = await hash(password, u.salt);
  delete u.code; delete u.exp; write(d);
}
