async function carregarUsuarioSeLogado() {
    const token = localStorage.getItem("token");

    if (!token) {
        return; // Apenas não faz nada
    }

    try {
        const response = await fetch("/auth/me", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            return;
        }

        const usuario = await response.json();

        document.getElementById("saudacaoUsuario").innerText =
            `Olá, ${usuario.login}`;

        document.getElementById("avatarInicial").innerText =
            usuario.login.charAt(0).toUpperCase();

    } catch (err) {
        console.error(err);
    }
}

carregarUsuarioSeLogado();
