async function criarCheckout(itensSelecionados, email) {
  const res = await fetch("https://checkout-lovable-ondemand-h9ps7fm21-xbedigital.vercel.app/api/criar-pagamento", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itens: itensSelecionados, email })
  });

  const data = await res.json();
  window.location.href = data.init_point; // redireciona para o checkout do Mercado Pago
}

// Exemplo: itens selecionados do seu catálogo
const itensSelecionados = [
  { nome: "Coleta de Dados + BM", preco: 79.9, qtd: 1 },
  { nome: "Campanha Meta Ads", preco: 378.9, qtd: 1 }
];

criarCheckout(itensSelecionados, "cliente@exemplo.com");
