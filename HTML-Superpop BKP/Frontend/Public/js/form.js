document
  .getElementById("formsuperpop")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const dados = {
      colaborador: formData.get("colaborador"),
      reconhecido_por: formData.get("reconhecido_por"),
      valores: formData.getAll("valores[]"),
      observacoes: formData.get("observacoes")
    };

    try {
      const response = await fetch("https://absorbable-karleen-pseudolobar.ngrok-free.dev/enviar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(dados)
      });

      if (!response.ok) throw new Error();

      alert("Reconhecimento enviado com sucesso!");
      e.target.reset();
    } catch {
      alert("Erro ao enviar. Tente novamente.");
    }
});