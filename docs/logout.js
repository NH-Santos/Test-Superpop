document.getElementById("btnLogout").addEventListener("click", function () {
    // Remove o token
    localStorage.removeItem("token");

    // Opcional: limpar qualquer outro dado salvo
    localStorage.removeItem("usuario");

    // Redireciona para login
    window.location.href = "/login.html";
});