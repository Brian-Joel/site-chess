document.addEventListener("DOMContentLoaded", () => {
    const carregamento = document.getElementById('loading-screen');
    const barra = document.getElementById('progress-fill');
    const numero = document.getElementById('numero');

    // 1. Manda a barra encher (o CSS faz ela levar 2.5s)
    setTimeout(() => {
        barra.style.width = '100%';
    }, 50);

    // 2. Conta de 0 a 100 na tela
    for (let i = 0; i <= 100; i++) {
        setTimeout(() => {
            numero.textContent = i + '%';
        }, i * 25);
    }

    // 3. Depois de 2.5s (2500ms), começa a sumir
    setTimeout(() => {
        carregamento.style.opacity = '0';
    }, 2500);

    // 4. Depois de mais 0.5s (total 3000ms), remove da tela
    setTimeout(() => {
        carregamento.style.display = 'none';
    }, 3000);
});
