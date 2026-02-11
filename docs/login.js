document
  .getElementById("formlogin")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const dados = {
      usuario: formData.get("usuario"),
      senha: formData.get("senha")
    };

    try {
      const response = await fetch(
        "https://absorbable-karleen-pseudolobar.ngrok-free.dev/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dados)
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.erro || "Erro no login");
      }

      // 🔐 salva token
      localStorage.setItem("token", result.token);
      localStorage.setItem("login", result.login);
      localStorage.setItem("perfil", result.perfil);

      alert("Login realizado com sucesso!");

      // 🚀 redireciona para página principal
      window.location.href = "/index.html";

    } catch (error) {
      console.error("Erro no login:", error);
      alert("Usuário ou senha inválidos.");
    }
});
