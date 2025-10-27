/*
 accessibility.js
 - Skip link focus management
 - Theme toggles (dark / high-contrast) with persistence
 - Keyboard navigation helpers for menu and modal
*/
(function(){
  const skip = document.createElement('a');
  skip.href = '#main';
  skip.className = 'skip-link visually-hidden';
  skip.textContent = 'Pular para conteúdo';
  document.body.insertBefore(skip, document.body.firstChild);

  // make skip link visible on focus
  const style = document.createElement('style');
  style.innerHTML = '.skip-link:focus{position:static;left:0;top:0;background:#000;color:#fff;padding:8px 12px;z-index:9999;border-radius:4px}';
  document.head.appendChild(style);

  // Theme toggles
  function setTheme(name){
    document.documentElement.setAttribute('data-theme', name);
    localStorage.setItem('site-theme', name);
  }
  function initTheme(){
    const saved = localStorage.getItem('site-theme') || 'default';
    setTheme(saved);
  }

  // keyboard: close modal on Escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      const modal = document.querySelector('.modal[aria-hidden="false"]');
      if(modal){ modal.setAttribute('aria-hidden','true'); }
    }
  });

  // expose functions
  window.accessibility = {
    setTheme, initTheme
  };
  document.addEventListener('DOMContentLoaded', initTheme);
})();
