const produtos = [
  { nome: "Coleta de Dados + BM", preco: 79.9 },
  { nome: "Campanha Meta Ads", preco: 378.9 },
  { nome: "Campanha Google Ads", preco: 478.9 },
  { nome: "Copy Arte", preco: 19.9 },
  { nome: "Copy Carrossel", preco: 39.9 },
  { nome: "Copy Vídeo", preco: 59.9 },
  { nome: "Criativo Arte", preco: 39.9 },
  { nome: "Criativo Carrossel", preco: 99.9 },
  { nome: "Edição de Vídeo", preco: 119.9 },
  { nome: "Relatório de Métricas", preco: 44.9 },
  { nome: "Copy Landing Page", preco: 249.9 },
  { nome: "Criação de Landing Page", preco: 1199 }
];

const divProdutos = document.getElementById("produtos");
produtos.forEach((p, i) => {
  divProdutos.innerHTML += `
    <div>
      <span>${p.nome} - R$ ${p.preco}</span>
      <input type="number" min="0" value="0" id="qtd${i}" />
    </div>
  `;
});

document.getElementById("comprar").addEventListener("click", async () => {
  const itensSelecionados = produtos.map((p, i) => ({
    nome: p.nome,
    preco: p.preco,
    qtd: parseInt(document.getElementById(`qtd${i}`).value) || 0
  })).filter(i => i.qtd > 0);

  const email = document.getElementById("email").value || "cliente@teste.com";

  if(itensSelecionados.length === 0){
    alert("Selecione pelo menos um serviço");
    return;
  }

  const res = await fetch("https://projetoondemand-f3ugay4qk-xbedigital.vercel.app/api/criar-pagamento", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itens: itensSelecionados, email })
  });
  const data = await res.json();
  window.location.href = data.init_point;
});
