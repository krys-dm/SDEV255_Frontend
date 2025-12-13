window.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector("#loginBtn");
  const statusBtn = document.querySelector("#statusBtn");

  loginBtn?.addEventListener("click", async () => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    await login(username, password);
  });

  statusBtn?.addEventListener("click", displayStatus);
});

async function login(username, password) {
  const login_cred = { username, password };

  const response = await fetch("http://localhost:3000/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(login_cred),
  });

  if (response.ok) {
    const tokenResponse = await response.json();

    localStorage.setItem("token", tokenResponse.token);
    localStorage.setItem("uname", tokenResponse.username2);
    localStorage.setItem("auth", tokenResponse.auth);

    // optional: redirect after login
    window.location.replace("/index.html");
  } else {
    document.querySelector("#errorMsg").textContent = "Bad Username and Password";
  }
}

async function displayStatus() {
  const out = document.querySelector("#statusOutput");
  out.textContent = "Loading...";

  const token = localStorage.getItem("token");
  if (!token) {
    out.textContent = "No token found. Log in first.";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/status", {
      headers: { "x-auth": token }, // IMPORTANT: matches backend check
    });

    const data = await response.json();

    if (!response.ok) {
      out.textContent = `Error ${response.status}: ${data.error || "Request failed"}`;
      return;
    }

    // data should be an array of { username, status }
    out.innerHTML =
      "<ul>" +
      data.map(u => `<li>${u.username}: ${u.status ?? ""}</li>`).join("") +
      "</ul>";
  } catch (err) {
    out.textContent = "Network error (is the backend running on port 3000?)";
    console.error(err);
  }
}
