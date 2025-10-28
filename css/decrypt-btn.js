(function() {
  // 等待DOM加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addDecryptButton);
  } else {
    addDecryptButton();
  }

  function addDecryptButton() {
    // 检查是否存在加密内容区域
    const encryptElement = document.getElementById('hexo-blog-encrypt');
    if (!encryptElement) return;

    // 检查是否已存在我们添加的按钮
    if (document.getElementById('custom-decrypt-btn')) return;

    // 查找密码输入框
    const passwordInput = document.getElementById('hexo-blog-encrypt-pass');
    if (!passwordInput) return;

    // 创建解密按钮
    const decryptBtn = document.createElement('button');
    decryptBtn.id = 'custom-decrypt-btn';
    decryptBtn.textContent = '解密文章';
    decryptBtn.type = 'button';

    // 将按钮插入到密码输入框后面
    passwordInput.parentNode.insertBefore(decryptBtn, passwordInput.nextSibling);

    // 添加点击事件
    decryptBtn.addEventListener('click', function() {
      // 触发解密逻辑
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        keyCode: 13,
        which: 13,
        bubbles: true
      });
      passwordInput.dispatchEvent(event);
    });
  }
})();