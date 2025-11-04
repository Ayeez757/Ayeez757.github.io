let artitalkFancyboxInitialized = false;

function initArtitalkFancybox() {
    if (typeof Fancybox === 'undefined') {
        return false;
    }
    return true;
}

function observeArtitalkChanges() {
    const artitalkContainer = document.getElementById('artitalk_main');
    if (artitalkContainer) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    setTimeout(() => {
                        setupArtitalkImageClick();
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

function setupArtitalkImageClick() {
    if (artitalkFancyboxInitialized) {
        document.removeEventListener('click', handleArtitalkImageClick);
    }

    document.addEventListener('click', handleArtitalkImageClick);
    artitalkFancyboxInitialized = true;
}

function handleArtitalkImageClick(e) {
    if (e.target.matches('#artitalk_main img') && typeof Fancybox !== 'undefined') {
        e.preventDefault();
        e.stopImmediatePropagation();

        const images = Array.from(document.querySelectorAll('#artitalk_main img'));
        const currentIndex = images.indexOf(e.target);

        Fancybox.show(images.map(img => ({
            src: img.src,
            type: 'image'
        })), {
            startIndex: currentIndex,
            groupAll: true
        });

        return false;
    }
}

function disableFancyboxAutoBind() {
    if (typeof Fancybox !== 'undefined') {
        try {
            Fancybox.unbind('#artitalk_main img');
        } catch(e) {}

        const originalBind = Fancybox.bind;
        Fancybox.bind = function(selector, options) {
            if (typeof selector === 'string' && selector.includes('#artitalk_main')) {
                return;
            }
            return originalBind.call(this, selector, options);
        };
    }
}

function initializeArtitalkFancybox() {
    if (!initArtitalkFancybox()) {
        setTimeout(initializeArtitalkFancybox, 1000);
        return;
    }

    disableFancyboxAutoBind();
    setupArtitalkImageClick();
    observeArtitalkChanges();
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeArtitalkFancybox, 1000);
});

document.addEventListener('click', function(e) {
    if (e.target.matches('#readmore') || e.target.closest('#readmore')) {
        setTimeout(() => {
            setupArtitalkImageClick();
        }, 800);
    }
});