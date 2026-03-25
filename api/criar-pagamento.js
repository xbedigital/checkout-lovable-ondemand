export default async function handler(req, res) {
  // CORS (mínimo necessário)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    // 🔥 TESTE SIMPLES (sem Mercado Pago ainda)
    return res.status(200).json({
      ok: true,
      message: "API funcionando"
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
