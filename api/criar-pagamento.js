export default async function handler(req, res) {
  // Permitir requisições do seu domínio Lovable
  res.setHeader('Access-Control-Allow-Origin', '*'); // ou seu domínio exato
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    // Seu código de criar pagamento aqui
    const { itens, email } = req.body;
    // ...
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
