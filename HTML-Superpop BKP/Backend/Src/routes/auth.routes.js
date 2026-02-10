router.post("/login", async (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).json({ erro: "Login e senha obrigatórios" });
  }

  const result = await pool.query(
    `
    SELECT
      u.id,
      u.login,
      u.senha,
      u.perfil,
      u.ativo,
      c.matricula,
      c.nome,
      c.situacao
    FROM superpop.usuarios_superpop u
    JOIN superpop.contatos_superpop c ON c.matricula = u.matricula
    WHERE u.login = $1
    `,
    [login]
  );

  if (result.rowCount === 0) {
    return res.status(401).json({ erro: "Usuário não encontrado" });
  }

  const usuario = result.rows[0];

  if (!usuario.ativo || usuario.situacao !== "ATIVO") {
    return res.status(403).json({ erro: "Usuário inativo" });
  }

  // 🔴 comparação direta (senha simples)
  if (senha !== usuario.senha) {
    return res.status(401).json({ erro: "Senha inválida" });
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      matricula: usuario.matricula,
      nome: usuario.nome,
      perfil: usuario.perfil
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    token,
    nome: usuario.nome,
    perfil: usuario.perfil
  });
});
