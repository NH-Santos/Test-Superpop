async function carregarUsuario() {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
        console.log("Sem token");
        return;
    }

    try {
        const response = await fetch(
            "https://absorbable-karleen-pseudolobar.ngrok-free.dev/api/auth/me",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        console.log("Status da resposta:", response.status);

        if (!response.ok) {
            localStorage.removeItem("token");
            window.location.href = "index.html";
            return;
        }

        const usuario = await response.json();
        console.log("Usuário recebido:", usuario);

        const campo = document.getElementById("reconhecido_por");

        if (!campo) {
            console.log("Campo não encontrado no DOM");
            return;
        }

        campo.value = usuario.nome_reduzido;

    } catch (error) {
        console.error("Erro ao carregar usuário:", error);
    }
}

document.addEventListener("DOMContentLoaded", carregarUsuario);
