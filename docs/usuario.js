async function carregarUsuario() {
    const token = localStorage.getItem("token");

    if (!token) {
        return;
    }

    try {
        const response = await fetch("/auth/me", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            localStorage.removeItem("token");
            window.location.href = "/login.html";
            return;
        }

        const usuario = await response.json();

        // Atualiza nome
        document.getElementById("saudacaoUsuario").innerText =
            `Olá, ${usuario.login}`;

        // Atualiza inicial
        document.getElementById("avatarInicial").innerText =
            usuario.login.charAt(0).toUpperCase();

    } catch (err) {
        console.error(err);
        window.location.href = "/login.html";
    }
}

carregarUsuario();

