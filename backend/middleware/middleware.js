import tokenUtils from "../utils/token.js";

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  // Se o token não existir no formato "Bearer token"
  if (!token) {
    return res.status(401).json({ message: "Token não encontrado no header" });
  }

  try {
    const decoded = tokenUtils.verifyToken(token);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}

export default authMiddleware;