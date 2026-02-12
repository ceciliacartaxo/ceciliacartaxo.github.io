
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.info-image');
    const tooltip = document.getElementById('imageTooltip');


    images.forEach((img) => {

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
});






