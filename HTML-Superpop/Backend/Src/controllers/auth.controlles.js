import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// TEMPORÁRIO (depois vai pro banco)
const usuarioFake = {
  email: "admin@superpop.com",
  // senha: 123456
  senhaHash: bcrypt.hashSync("123456", 10)
};

export function login(req, res) {
  const { email, senha } = req.body;

  if (email !== usuarioFake.email) {
    return res.status(401).json({ erro: "Credenciais inválidas" });
  }

  const senhaOk = bcrypt.compareSync(senha, usuarioFake.senhaHash);
  if (!senhaOk) {
    return res.status(401).json({ erro: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
}
