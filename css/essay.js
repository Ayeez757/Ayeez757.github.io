function enhanceArtitalkImages() {
    const artitalkImages = document.querySelectorAll('#artitalk_main img:not(.atemoji)');
    
    artitalkImages.forEach((img, index) => {
        if (img.classList.contains('atemoji')) return;
        
        // Fancybox
        img.setAttribute('data-fancybox', 'artitalk-gallery');
        img.setAttribute('data-src', img.src);
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            if (typeof Fancybox !== 'undefined') {
                Fancybox.show([{
                    src: this.src,
                    type: 'image'
                }]);
            }
        });
    });
}

// 监听Artitalk
const artitalkObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
            setTimeout(enhanceArtitalkImages, 100);
        }
    });
});

// 启动监听
document.addEventListener('DOMContentLoaded', function() {
    const artitalkMain = document.getElementById('artitalk_main');
    if (artitalkMain) {
        artitalkObserver.observe(artitalkMain, {
            childList: true,
            subtree: true
        });
        enhanceArtitalkImages();
    }
});