import mercadopago from "mercadopago";

// Configurar seu access token do Mercado Pago
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

export default async function handler(req, res) {
  // Habilita CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const { itens, email } = req.body;

      // Monta os itens para a preferência do Mercado Pago
      const itemsMP = itens.map(item => ({
        title: item.nome,
        quantity: item.qtd,
        unit_price: item.preco,
        currency_id: "BRL"
      }));

      // Cria preferência
      const preference = {
        items: itemsMP,
        payer: {
          email: email || "cliente@exemplo.com" // padrão se não passar
        },
        back_urls: {
          success: "https://seusite.com/sucesso", // coloque sua URL de sucesso
          failure: "https://seusite.com/falha",
          pending: "https://seusite.com/pendente"
        },
        auto_return: "approved"
      };

      const response = await mercadopago.preferences.create(preference);

      return res.status(200).json({ init_point: response.body.init_point });
    } catch (error) {
      console.error("Erro ao criar preferência:", error);
      return res.status(500).json({ error: "Erro ao criar preferência" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
