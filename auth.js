function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "../html/superpop.html";
      } else {
        alert("Login inválido");
      }
    });
}