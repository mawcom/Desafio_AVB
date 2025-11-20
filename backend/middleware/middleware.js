import tokenUtils from "../utils/token.js";
// Certifique-se que o tokenUtils tem a mesma chave secreta usada para gerar o token

function authMiddleware(req, res, next) {
  // O log dos headers pode ser útil, mas deve ser removido em produção
  // console.log("HEADERS RECEBIDOS:", req.headers); 
  
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    // Adicionando um log mais limpo para fins de depuração:
    console.log("Tentativa de acesso sem cabeçalho Authorization.");
    return res.status(401).json({ message: 'Token não fornecido (Authorization Header ausente)' });
  }

  // Verifica o formato e extrai o token
  const tokenParts = authHeader.split(' ');
  const token = tokenParts[1];
  const scheme = tokenParts[0];

  if (scheme !== 'Bearer' || !token) {
     return res.status(401).json({ message: "Formato do Token inválido. Esperado: 'Bearer <token>'" });
  }

  try {
    const decoded = tokenUtils.verifyToken(token);
    // Anexa o ID do usuário à requisição
    req.userId = decoded.id; 
    next();
  } catch (err) {
    // 💡 TRATAMENTO DE ERRO ESPECÍFICO AQUI 💡

    console.error("Erro na verificação do Token:", err.name, err.message);

    let errorMessage = "Token inválido ou com erro de assinatura.";
    let statusCode = 401;

    // Se o erro for TokenExpiredError (lançado pelo jwt.verify)
    if (err.name === 'TokenExpiredError') {
      errorMessage = "Sessão expirada. Faça login novamente.";
      // O código de status 403 (Forbidden) ou 401 (Unauthorized) é comum aqui
      statusCode = 401; 
    }
    
    // Retorna a mensagem de erro específica
    return res.status(statusCode).json({ message: errorMessage });
  }
}

export default authMiddleware;