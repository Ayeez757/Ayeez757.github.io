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

// themes/butterfly/source/js/utils.js
diffDate(date, more = false) {
  const datePost = new Date(date)
  const dateNow = new Date()
  const diffTime = dateNow - datePost
  const diffSecond = Math.round(diffTime / 1000)
  const diffDay = Math.floor(diffSecond / 86400)
  const diffMonth = diffDay / 30
  const { dateSuffix } = GLOBAL_CONFIG

  if (!more) {
    const totalDays = Math.floor(diffDay)

    // 如果启用了年天格式转换
    if (GLOBAL_CONFIG.runtime_format === 'year_day' && totalDays >= 365) {
      const years = Math.floor(totalDays / 365)
      const days = totalDays % 365

      if (years > 0 && days > 0) {
        return `${years} 年 ${days} 天`
      } else if (years > 0) {
        return `${years} 年`
      } else {
        return `${days} 天`
      }
    }

    return totalDays
  }

  // ... 其他时间差处理逻辑
}
