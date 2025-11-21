import tokenUtils from "../utils/token.js";

function authMiddleware(req, res, next) {

  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido (Authorization Header ausente)' });
  }

  const tokenParts = authHeader.split(' ');
  const token = tokenParts[1];
  const scheme = tokenParts[0];

  if (scheme !== 'Bearer' || !token) {
     return res.status(401).json({ message: "Formato do Token inválido. Esperado: 'Bearer <token>'" });
  }

  try {
    const decoded = tokenUtils.verifyToken(token);
    req.userId = decoded.id; 
    next();
  } catch (err) {

    console.error("Erro na verificação do Token:", err.name, err.message);

    let errorMessage = "Token inválido ou com erro de assinatura.";
    let statusCode = 401;

    if (err.name === 'TokenExpiredError') {
      errorMessage = "Sessão expirada. Faça login novamente.";
      statusCode = 401; 
    }
    
    return res.status(statusCode).json({ message: errorMessage });
  }
}

export default authMiddleware;