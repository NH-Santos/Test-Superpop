easync function carregarUsuario() {
  const token = localStorage.getItem("token");

  console.log("Token encontrado:", token);

  if (!token) {
    console.warn("Sem token, redirecionando para login...");
    window.location.href = "/login.html";
    return;
  }

  try {
    const response = await fetch("https://absorbable-karleen-pseudolobar.ngrok-free.dev/api/auth/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    console.log("Status da resposta:", response.status);

    if (response.status === 401) {
      console.warn("Token inválido ou expirado");
      localStorage.removeItem("token");
      window.location.href = "/login.html";
      return;
    }

    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    const usuario = await response.json();
    console.log("Usuário recebido:", usuario);

    // Preencher campo
    const campo = document.getElementById("reconhecido_por");

    if (campo) {
      campo.value = usuario.nome_reduzido || "";
    }

  } catch (error) {
    console.error("Erro ao carregar usuário:", error);
  }
}

document.addEventListener("DOMContentLoaded", carregarUsuario);
