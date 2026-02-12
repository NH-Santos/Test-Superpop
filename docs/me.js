async function carregarUsuario() {
    const token = localStorage.getItem("token");

    if (!token) {
        return;
    }

    try {
        const response = await fetch("https://absorbable-karleen-pseudolobar.ngrok-free.dev/api/auth/me", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            localStorage.removeItem("token");
            window.location.href = "index.html";
            return;
        }

        const usuario = await response.json();

        // Escolha qual você quer mostrar:
        document.getElementById("reconhecidoPor").value = usuario.nome_reduzido;
        // ou:
        // document.getElementById("reconhecidoPor").value = usuario.nome_completo;

    } catch (error) {
        console.error("Erro ao carregar usuário:", error);
    }
}

carregarUsuario();
