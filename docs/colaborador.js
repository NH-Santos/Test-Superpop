edocument.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("colaboradorInput");
    const lista = document.getElementById("listaColaboradores");
    const token = localStorage.getItem("token");

    let timeout = null; // debounce

    input.addEventListener("input", () => {

        clearTimeout(timeout);

        const termo = input.value.trim();

        if (termo.length < 2) {
            lista.innerHTML = "";
            return;
        }

        // debounce de 300ms (evita excesso de requisição)
        timeout = setTimeout(async () => {

            try {
                const response = await fetch(
                    `https://absorbable-karleen-pseudolobar.ngrok-free.dev/api/auth/colaboradores?search=${encodeURIComponent(termo)}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "ngrok-skip-browser-warning": "true"
                        }
                    }
                );

                const colaboradores = await response.json();

                lista.innerHTML = "";

                colaboradores.forEach(col => {
                    const li = document.createElement("li");
                    li.textContent = `${col.nome_completo} - ${col.setor}`;

                    li.addEventListener("click", () => {
                        input.value = `${col.nome_completo} - ${col.setor}`;
                        lista.innerHTML = "";
                    });

                    lista.appendChild(li);
                });

            } catch (error) {
                console.error("Erro ao buscar colaboradores:", error);
            }

        }, 300);
    });

    // Fecha dropdown ao clicar fora
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".autocomplete-container")) {
            lista.innerHTML = "";
        }
    });

});
