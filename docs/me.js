async function carregarUsuario() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  try {
    const response = await fetch("https://absorbable-karleen-pseudolobar.ngrok-free.dev/api/auth/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      }
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    const usuario = await response.json();

    const campo = document.getElementById("reconhecido_por");
    if (campo) {
      campo.value = usuario.nome_reduzido;
    }

  } catch (error) {
    console.error("Erro ao carregar usuário:", error);
  }
}

document.addEventListener("DOMContentLoaded", carregarUsuario);
