const graficoDolar = document.getElementById("graficoDolar");
const graficoParaDolar = new Chart(graficoDolar, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Dólar",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

setInterval(() => getCotacao(), 5000);

async function getCotacao() {
  const conexao = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL"
  );
  const cotacao = await conexao.json();
  const valor = cotacao.USDBRL.ask;
  const tempo = getHours();
  adicionarDados(graficoParaDolar, tempo, valor);
}

function getHours() {
  let date = new Date();
  let hour =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return hour;
}

function adicionarDados(grafico, legenda, dados) {
  grafico.data.labels.push(legenda);
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(dados);
  });
  grafico.update();
}
