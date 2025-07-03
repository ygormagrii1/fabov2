


//BARRA DE FRETE GRÁTIS
document.addEventListener("DOMContentLoaded", function() {
    function criarBarraFreteGratis() {
      // Cria uma div para o contêiner do frete grátis
      const freteGratisContainer = document.createElement("div");
      freteGratisContainer.className = "frete-gratis-container";

      // Cria um contêiner para o SVG e o texto
      const svgTextContainer = document.createElement("div");
      svgTextContainer.style.display = "flex";
      svgTextContainer.style.alignItems = "center"; // Alinhar verticalmente no centro

      // Cria o elemento SVG
      const svg = document.createElement("div");
      svg.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_4_277)">
        <path d="M16.5 7.5H20.4919C20.6413 7.49993 20.7874 7.54451 20.9113 7.62803C21.0353 7.71155 21.1315 7.8302 21.1875 7.96875L22.5 11.25" stroke="#161678" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M1.5 13.5H16.5" stroke="#161678" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M17.25 20.25C18.4926 20.25 19.5 19.2426 19.5 18C19.5 16.7574 18.4926 15.75 17.25 15.75C16.0074 15.75 15 16.7574 15 18C15 19.2426 16.0074 20.25 17.25 20.25Z" stroke="#161678" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M6.75 20.25C7.99264 20.25 9 19.2426 9 18C9 16.7574 7.99264 15.75 6.75 15.75C5.50736 15.75 4.5 16.7574 4.5 18C4.5 19.2426 5.50736 20.25 6.75 20.25Z" stroke="#161678" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M15 18H9" stroke="#161678" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M16.5 11.25H22.5V17.25C22.5 17.4489 22.421 17.6397 22.2803 17.7803C22.1397 17.921 21.9489 18 21.75 18H19.5" stroke="#161678" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M4.5 18H2.25C2.05109 18 1.86032 17.921 1.71967 17.7803C1.57902 17.6397 1.5 17.4489 1.5 17.25V6.75C1.5 6.55109 1.57902 6.36032 1.71967 6.21967C1.86032 6.07902 2.05109 6 2.25 6H16.5V15.8784" stroke="#161678" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </g>
        <defs>
        <clipPath id="clip0_4_277">
        <rect width="24" height="24" fill="white"></rect>
        </clipPath>
        </defs>
        </svg>

        </svg>
      `;

      // Cria um elemento <p> para a mensagem de frete grátis
      const mensagemFreteGratis = document.createElement("p");
      mensagemFreteGratis.innerHTML = "Adicione R$ 248,01 reais para ganhar <strong>Frete Grátis!</strong>";
      mensagemFreteGratis.className = "frete-gratis-mensagem";

      // Define estilos CSS para o SVG
      svg.style.marginRight = "8px"; // Espaço entre o SVG e o texto

      // Cria uma div para exibir a barra de frete grátis
      const freteGratisBar = document.createElement("div");
      freteGratisBar.className = "frete-gratis-bar";


      const freteGratisBarBG = document.createElement("div");
      freteGratisBarBG.className = "frete-gratis-bar-bg";

      // Define estilos CSS para a barra de frete grátis
      freteGratisBar.style.backgroundColor = "#161678"; // Cor de fundo verde
      freteGratisBar.style.height = "8px"; // Altura da barra
      freteGratisBar.style.width = "0%"; // Inicialmente a barra tem largura 0%
      freteGratisBar.style.borderRadius = "8px"; // Adicione o border-radius

      freteGratisBarBG.style.backgroundColor = "#fff"; // Cor de fundo verde
      freteGratisBarBG.style.height = "8px"; // Altura da barra
      freteGratisBarBG.style.width = "100%"; // Inicialmente a barra tem largura 0%
      freteGratisBarBG.style.borderRadius = "8px"; // Adicione o border-radius

      // Insira o SVG, a barra de frete grátis e a mensagem no contêiner
      svgTextContainer.appendChild(svg);
      svgTextContainer.appendChild(mensagemFreteGratis);
      freteGratisContainer.appendChild(svgTextContainer);
      freteGratisContainer.appendChild(freteGratisBarBG);
      freteGratisBarBG.appendChild(freteGratisBar);

      // Encontre o elemento .cart
      const cartElement = document.querySelector('.cart');
      const parent = cartElement.parentNode;
      insertAfter(freteGratisContainer, cartElement); // Insira após .cart

      return { container: freteGratisContainer, bar: freteGratisBar, message: mensagemFreteGratis };
    }

    // Função para inserir um elemento após outro
    function insertAfter(newNode, referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function formatarValorMonetario(valorMonetario) {
      return parseFloat(valorMonetario.replace('R$', '').replace(',', '.').trim());
    }

    function updateProgressBar() {
      const valorMonetarioElement = document.querySelector('.monetary');
      const valorMonetario = valorMonetarioElement.textContent;
      const valorTotalCarrinho = formatarValorMonetario(valorMonetario);

      const valorMinimoFreteGratis = 299.00; // Valor mínimo para frete grátis

      let larguraBarra = (valorTotalCarrinho / valorMinimoFreteGratis) * 100;
      larguraBarra = Math.min(100, larguraBarra); // Limita a largura máxima a 100%

      barraFreteGratis.style.width = larguraBarra + "%";
      console.log("testando checkout")

      const mensagemFreteGratis = document.querySelector('.frete-gratis-mensagem');
      if (larguraBarra >= 100) {
        mensagemFreteGratis.innerHTML = "Parabéns! Você ganhou <strong>frete grátis!</strong>";
      } else {
        const faltamParaFreteGratis = valorMinimoFreteGratis - valorTotalCarrinho;
        mensagemFreteGratis.innerHTML = `Adicione <strong>R$ ${faltamParaFreteGratis.toFixed(2).replace('.', ',')}</strong> reais para ganhar <strong>frete grátis!</strong>`;
      }

      const mensagemFreteGratisStrong = document.querySelector('.frete-gratis-mensagem strong:nth-child(1)');
        const mensagemFreteGratisStrongText = mensagemFreteGratisStrong.textContent;

        if (mensagemFreteGratisStrongText.includes("NaN")) {
            mensagemFreteGratisStrong.textContent = 'R$ 328,00';
        }
    }



    // Crie a barra de frete grátis e obtenha a referência para a barra
    const { bar: barraFreteGratis, message: mensagemFreteGratis } = criarBarraFreteGratis();

    // Adiciona um ouvinte de eventos ao elemento que contém o valor do carrinho
    const carrinhoElement = document.querySelector('.monetary');
    carrinhoElement.addEventListener('input', updateProgressBar);

    // Chame a função updateProgressBar inicialmente
    updateProgressBar();

    // Atualize a barra de frete grátis a cada 1 segundo (1000 milissegundos)
    setInterval(updateProgressBar, 1000);
  });

  document.addEventListener("DOMContentLoaded", function() {
    setInterval(function() {
      if (window.location.hash === '#/cart') {
        const breadCrumbItems = document.querySelectorAll('.bread-crumb-item');
        for (let i = 0; i < breadCrumbItems.length; i++) {
          breadCrumbItems[i].classList.remove('active');
          if (i === 0) {
            breadCrumbItems[i].classList.add('active');
          }
        }
      }

      if (window.location.hash === '#/email' || window.location.hash === '#/profile') {
        const breadCrumbItems = document.querySelectorAll('.bread-crumb-item');
        for (let i = 0; i < breadCrumbItems.length; i++) {
          breadCrumbItems[i].classList.remove('active');
          if (i < 2) {
            breadCrumbItems[i].classList.add('active');
          }
        }
      }

      if (window.location.hash === '#/shipping') {
        const breadCrumbItems = document.querySelectorAll('.bread-crumb-item');
        for (let i = 0; i < breadCrumbItems.length; i++) {
          breadCrumbItems[i].classList.remove('active');
          if (i < 3) {
            breadCrumbItems[i].classList.add('active');
          }
        }
      }

      if (window.location.hash === '#/payment') {
        const breadCrumbItems = document.querySelectorAll('.bread-crumb-item');
        for (let i = 0; i < breadCrumbItems.length; i++) {
          breadCrumbItems[i].classList.add('active');
        }
      }
    }, 1000);
});


