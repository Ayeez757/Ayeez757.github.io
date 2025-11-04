let artitalkFancyboxInitialized = false;

function initArtitalkFancybox() {
    if (typeof Fancybox === 'undefined') {
        console.warn('Fancybox is not available');
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
                    console.log('Artitalk content updated, images added');
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
    console.log('Artitalk image click handler setup');
}

function handleArtitalkImageClick(e) {
    if (e.target.matches('#artitalk_main img') && typeof Fancybox !== 'undefined') {
        e.preventDefault();
        e.stopImmediatePropagation();

        console.log('Artitalk image clicked, opening Fancybox');

        const images = Array.from(document.querySelectorAll('#artitalk_main img'));
        const currentIndex = images.indexOf(e.target);

        Fancybox.show(images.map(img => ({
            src: img.src,
            type: 'image'
        })), {
            startIndex: currentIndex,
            groupAll: true
        });
    }
}

function disableFancyboxAutoBind() {
    if (typeof Fancybox !== 'undefined') {
        try {
            Fancybox.unbind('#artitalk_main img');
        } catch(e) {
            console.log('No existing Fancybox bindings to unbind');
        }

        const originalBind = Fancybox.bind;
        Fancybox.bind = function(selector, options) {
            if (typeof selector === 'string' && selector.includes('#artitalk_main')) {
                console.log('Prevented Fancybox auto-bind for:', selector);
                return;
            }
            return originalBind.call(this, selector, options);
        };

        console.log('Fancybox auto-bind disabled for artitalk images');
    }
}

function initializeArtitalkFancybox() {
    if (!initArtitalkFancybox()) {
        console.error('Fancybox not available, retrying in 1s');
        setTimeout(initializeArtitalkFancybox, 1000);
        return;
    }

    disableFancyboxAutoBind();
    setupArtitalkImageClick();
    observeArtitalkChanges();

    console.log('Artitalk Fancybox initialized');
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeArtitalkFancybox, 1000);
});

document.addEventListener('click', function(e) {
    if (e.target.matches('#readmore') || e.target.closest('#readmore')) {
        console.log('Readmore clicked, reinitializing artitalk fancybox');
        setTimeout(() => {
            setupArtitalkImageClick();
        }, 800);
    }
});

window.addEventListener('error', function(e) {
    console.error('Error in artitalk fancybox:', e.error);
});