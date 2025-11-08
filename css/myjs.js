function initArtitalkFancybox() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                // 为图片添加Fancybox属性
                document.querySelectorAll('#artitalk_main img').forEach(img => {
                    if (!img.closest('a')) {
                        const src = img.getAttribute('src');
                        const alt = img.getAttribute('alt') || '说说图片';

                        const link = document.createElement('a');
                        link.href = src;
                        link.setAttribute('data-fancybox', 'artitalk-gallery');
                        link.setAttribute('data-caption', alt);

                        img.parentNode.insertBefore(link, img);
                        link.appendChild(img);
                    }
                });
            }
        });
    });

    const artitalkContainer = document.getElementById('artitalk_main');
    if (artitalkContainer) {
        observer.observe(artitalkContainer, {
            childList: true,
            subtree: true
        });

        setTimeout(() => {
            document.querySelectorAll('#artitalk_main img').forEach(img => {
                if (!img.closest('a')) {
                    const src = img.getAttribute('src');
                    const alt = img.getAttribute('alt') || '说说图片';

                    const link = document.createElement('a');
                    link.href = src;
                    link.setAttribute('data-fancybox', 'artitalk-gallery');
                    link.setAttribute('data-caption', alt);

                    img.parentNode.insertBefore(link, img);
                    link.appendChild(img);
                }
            });
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initArtitalkFancybox();
});


