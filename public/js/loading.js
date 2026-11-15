document.addEventListener("DOMContentLoaded", () => {
    const carregamento = document.getElementById('loading-screen');
    const barraPreenchimento = document.getElementById('progress-fill');
    const numero = document.getElementById('numero');

    barraPreenchimento.style.width = '100%';

    for (let i = 0; i <= 100; i++) {

        // cada 25ms é 25 no contador;
        setTimeout(() => {
            numero.textContent = `${i}%`;

            if (i == 100) {
                carregamento.style.opacity = '0';

                // tempo de 1s
                setTimeout(() => {
                    carregamento.style.display = 'none';
                }, 10000);
            }
        }, 25 * i);
    }
}, 200);
