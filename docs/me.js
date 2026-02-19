async function carregarUsuario() {
  const token = localStorage.getItem("token");

  if (!token) {
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

    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    const usuario = await response.json();

    const nomeCompleto = usuario.nome_completo || "";
    const setor = usuario.setor || "";

    const textoFinal = `${nomeCompleto}- ${setor}`;

    const campo = document.getElementById("reconhecido_por");

    if (campo) {
      campo.value = textoFinal;
    }

  } catch (error) {
    console.error("Erro ao carregar usuário:", error);
  }
}

document.addEventListener("DOMContentLoaded", carregarUsuario);
