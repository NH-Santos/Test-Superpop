document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    const saudacao = document.getElementById("saudacaoUsuario");
    const avatar = document.getElementById("avatarInicial");

    const btnLogin = document.querySelector(".login-fixo");
    const btnCadastro = document.querySelector(".cadastro-fixo");

    if (!token) {
        // Usuário não logado
        saudacao.textContent = "Olá, Visitante";
        avatar.textContent = "V";
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
            window.location.href = "login.html";
            return;
        }

        const usuario = await response.json();

        // Nome reduzido
        saudacao.textContent = `Olá, ${usuario.nome_reduzido}`;

        // Primeira letra do nome
        avatar.textContent = usuario.nome_reduzido.charAt(0).toUpperCase();

        // Esconde login e cadastro
        if (btnLogin) btnLogin.style.display = "none";
        if (btnCadastro) btnCadastro.style.display = "none";

    } catch (error) {
        console.error("Erro ao carregar usuário:", error);
    }
});
