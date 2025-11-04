function initArtitalkFancybox() {
    if (typeof Fancybox !== 'undefined') {
        Fancybox.unbind('[data-fancybox]');
        Fancybox.unbind('.gallery-group-img');
        Fancybox.unbind('#artitalk_main img');

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

function addArtitalkImageClick() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('#artitalk_main img') && typeof Fancybox !== 'undefined') {
            if (!e.target.hasAttribute('data-fancybox')) {
                e.preventDefault();

                const images = Array.from(document.querySelectorAll('#artitalk_main img'));
                const currentIndex = images.indexOf(e.target);

                Fancybox.show(images.map(img => ({
                    src: img.src,
                    type: 'image'
                })), {
                    startIndex: currentIndex
                });
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initArtitalkFancybox();
        observeArtitalkChanges();
        addArtitalkImageClick();
    }, 1000);
});

document.addEventListener('click', function(e) {
    if (e.target.matches('#readmore') || e.target.closest('#readmore')) {
        setTimeout(() => {
            initArtitalkFancybox();
        }, 800);
    }
});