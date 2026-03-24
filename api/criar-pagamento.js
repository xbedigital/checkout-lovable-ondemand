import fetch from "node-fetch";

export default async function handler(req, res) {
  if(req.method === "POST"){
    const { itens, email } = req.body;

    const itemsMP = itens.map(i => ({
      title: i.nome,
      unit_price: i.preco,
      quantity: i.qtd,
      currency_id: "BRL"
    }));

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        items: itemsMP,
        payer: { email }
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
