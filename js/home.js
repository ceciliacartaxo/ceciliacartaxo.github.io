// ======================================================================
// CONFIGURAÇÃO GLOBAL
// ======================================================================
const track = document.getElementById('track');
const slides = document.querySelectorAll('.slide');

// Elementos da linha interativa
const mouseLine = document.getElementById('mouseLine');
const indexLink = document.getElementById('indexLink');

// Elementos do Tooltip e Estrela de Info
const starInfo = document.getElementById('starInfo');
const tooltip = document.getElementById('imageTooltip');
const infoImages = document.querySelectorAll('.info-image');

// Variáveis de estado do Carousel (apenas para desktop)
let currentIndex = 0;
let isScrolling = false;
const SCROLL_DEBOUNCE_TIME = 800; // Tempo em ms para ignorar scrolls

// Verifica se está em ambiente Desktop (assumindo que a media query é 768px)
const isDesktop = window.innerWidth > 768;


// ======================================================================
// 1. LÓGICA DO CAROUSEL (Desktop Only)
// ======================================================================

function updatePosition() {
    if (!track || slides.length === 0) return;

    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function goNext() {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
        updatePosition();
    }
}

function goPrev() {
    if (currentIndex > 0) {
        currentIndex--;
        updatePosition();
    }
}

function initCarouselEvents() {
    // Escuta eventos de roda do mouse (scroll)
    document.addEventListener('wheel', (e) => {
        e.preventDefault();

        if (isScrolling) return;
        isScrolling = true;

        if (e.deltaY > 0) goNext();
        else goPrev();

        setTimeout(() => isScrolling = false, SCROLL_DEBOUNCE_TIME);
    }, { passive: false });

    // Escuta eventos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
    });

    // Atualiza a posição em caso de redimensionamento da janela
    window.addEventListener('resize', updatePosition);

    // Garante que a posição inicial está correta
    updatePosition();
}


// ======================================================================
// 2. LÓGICA DA LINHA DO MOUSE (Desktop Only)
// ======================================================================

function initMouseLine() {
    if (!mouseLine || !indexLink) return;

    const startLineX = indexLink.getBoundingClientRect().left;

    document.addEventListener('mousemove', (e) => {
        if (mouseLine) {
            const length = Math.max(0, e.clientX - startLineX);
            mouseLine.style.width = length + 'px';
        }
    });
}


// ======================================================================
// 3. LÓGICA DO TOOLTIP E ESTRELA
// ======================================================================

function initTooltipEvents() {
    infoImages.forEach((img) => {
        img.addEventListener('mouseenter', () => {
            if (tooltip) {
                tooltip.innerText = img.dataset.info || '';
                tooltip.style.display = 'block';
            }
        });

        img.addEventListener('mousemove', (e) => {
            if (tooltip) {
                tooltip.style.left = e.clientX + 12 + 'px';
                tooltip.style.top = e.clientY + 12 + 'px';
            }
        });

        img.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.style.display = 'none';
            }
        });
    });
}

function initStarInfo() {
    if (!starInfo) return;

    starInfo.addEventListener('click', (e) => {
        e.preventDefault(); // Impede que a página suba ao clicar no #
        alert(
            "𝒸𝑒𝒸𝒾𝓁𝒾𝒶 𝒸𝒶𝓇𝓉𝒶𝓍𝑜 \n" +
            "graphic and digital design + creative coding 🇧🇷🐰 \n" +
            "<<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>\r\n" +
            "website design and development by me 💋💝"
        );
    });
}


// ======================================================================
// INICIALIZAÇÃO GERAL
// ======================================================================

document.addEventListener('DOMContentLoaded', () => {
    initTooltipEvents();
    initStarInfo();

    if (isDesktop) {
        initCarouselEvents();
        initMouseLine();
    }
});


