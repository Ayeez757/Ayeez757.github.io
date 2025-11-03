function initArtitalkFancybox() {
    if (typeof Fancybox !== 'undefined') {
        Fancybox.unbind('[data-fancybox]');
        Fancybox.unbind('.gallery-group-img');

        Fancybox.bind('[data-fancybox]', {});
        Fancybox.bind('#artitalk_main img', {
            groupAll: true,
            on: {
                reveal: (fancybox, slide) => {
                    console.log('Artitalk image opened');
                }
            }
        });
    }
}

function observeArtitalkChanges() {
    const artitalkContainer = document.getElementById('artitalk_main');
    if (artitalkContainer) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    setTimeout(() => {
                        initArtitalkFancybox();
                    }, 100);
                }
            });
        });
        
        observer.observe(artitalkContainer, {
            childList: true,
            subtree: true
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initArtitalkFancybox();
        observeArtitalkChanges();
    }, 1000);
});

document.addEventListener('click', function(e) {
    if (e.target.matches('#readmore') || e.target.closest('#readmore')) {
        setTimeout(() => {
            initArtitalkFancybox();
        }, 500);
    }
});