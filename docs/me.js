async function carregarUsuario() {
    const token = localStorage.getItem("token");

    if (!token) {
        return;
    }

    try {
        const response = await fetch("https://absorbable-karleen-pseudolobar.ngrok-free.dev/auth/me", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            localStorage.removeItem("token");
            window.location.href = "index.html";
            return;
        }

        const usuario = await response.json();

        document.getElementById("reconhecido_por").value = usuario.nome_reduzido;

    } catch (error) {
        console.error("Erro ao carregar usuário:", error);
    }
}

carregarUsuario();
