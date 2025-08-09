// Save token
export function saveToken(token) {
  localStorage.setItem("token", token);
}

// Get token
export function getToken() {
  return localStorage.getItem("token");
}

// Remove token
export function removeToken() {
  localStorage.removeItem("token");
}

// Save user
export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

// Get user
export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Remove user
export function removeUser() {
  localStorage.removeItem("user");
}
