document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    const saudacao = document.getElementById("saudacaoUsuario");
    const avatar = document.getElementById("avatarInicial");

    const btnLogin = document.querySelector(".login-fixo");
    const btnCadastro = document.querySelector(".cadastro-fixo");

    if (!token) {
        if (saudacao) saudacao.textContent = "Olá, Visitante";
        if (avatar) avatar.textContent = "V";
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

        const nome = usuario.nome_reduzido || usuario.login || "Usuário";

        // Saudação
        if (saudacao) {
            saudacao.textContent = `Olá, ${nome}`;
        }

        // Inicial
        if (avatar) {
            avatar.textContent = nome.trim().charAt(0).toUpperCase();
        }

        // Esconde login e cadastro
        if (btnLogin) btnLogin.style.display = "none";
        if (btnCadastro) btnCadastro.style.display = "none";

    } catch (error) {
        console.error("Erro ao carregar usuário:", error);
    }
});
