import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ erro: "Sem token" });

  try {
    jwt.verify(token, "superpop-secret");
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido" });
  }
}
