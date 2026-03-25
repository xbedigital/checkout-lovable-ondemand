module.exports = async (req, res) => {
  // 🔥 CORS COMPLETO
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // 🔥 RESPONDE PREFLIGHT (ESSENCIAL)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 🔥 BLOQUEIA MÉTODOS ERRADOS
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { itens, email } = req.body;

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        items: itens.map(item => ({
          title: item.nome,
          quantity: item.qtd,
          unit_price: item.preco,
          currency_id: "BRL"
        })),
        payer: { email }
      })
    });

    const data = await response.json();

    return res.status(200).json({
      init_point: data.init_point
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};
console.log("Token Mercado Pago:", process.env.MP_ACCESS_TOKEN);
