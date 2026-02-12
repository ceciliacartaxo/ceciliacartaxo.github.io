const elementos = document.querySelectorAll('.info-text');
const imagemHover = document.getElementById('imagem-hover');

elementos.forEach(elemento => {
    elemento.addEventListener('mouseover', (e) => {
        const imgSrc = elemento.dataset.info;
        imagemHover.innerHTML = `<img src="${imgSrc}" alt="Imagem">`;
        imagemHover.style.display = 'block';
        imagemHover.style.top = `${e.pageY + 10}px`;
        imagemHover.style.left = `${e.pageX + 10}px`;
    });

    elemento.addEventListener('mouseout', () => {
        imagemHover.style.display = 'none';
    });

    elemento.addEventListener('mousemove', (e) => {
        imagemHover.style.top = `${e.pageY + 10}px`;
        imagemHover.style.left = `${e.pageX + 10}px`;
    });
});




const img = document.getElementById('eu');
let mousedown = false;
let offset = [0, 0];

img.addEventListener('dragstart', (e) => e.preventDefault());

img.addEventListener('mousedown', (e) => {
    mousedown = true;
    img.style.cursor = 'grabbing';

    const rect = img.getBoundingClientRect();
    offset = [
        e.clientX - rect.left,
        e.clientY - rect.top
    ];
});

document.addEventListener('mouseup', () => {
    mousedown = false;
    img.style.cursor = 'grab';
});

document.addEventListener('mousemove', (e) => {
    if (!mousedown) return;

    const x = e.clientX - offset[0];
    const y = e.clientY - offset[1];

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
});


