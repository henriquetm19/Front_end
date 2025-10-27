document.addEventListener('DOMContentLoaded', function(){
  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.getElementById('main-nav');
  if(hamburger && nav){
    hamburger.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
      // toggle visibility of nav list for mobile
      const list = nav.querySelector('.nav-list');
      if(list) list.style.display = list.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Submenu toggles (for keyboard and click)
  document.querySelectorAll('.has-submenu .submenu-toggle').forEach(btn=>{
    btn.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      const submenu = this.parentElement.querySelector('.submenu');
      if(submenu){
        submenu.classList.toggle('submenu-open');
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
      }
    });
  });

  // Toasts (data-toast attribute)
  document.querySelectorAll('[data-toast]').forEach(btn=>{
    btn.addEventListener('click', function(){
      const msg = this.getAttribute('data-toast') || 'Ação realizada';
      showToast(msg);
    });
  });

  // Show toast
  window.showToast = function(message, timeout=3000){
    const container = document.getElementById('toast-container');
    if(!container) return;
    const node = document.createElement('div');
    node.className = 'toast show';
    node.textContent = message;
    container.appendChild(node);
    setTimeout(()=>{node.classList.remove('show');node.remove();}, timeout);
  }

  // Simple modal open/close
  const modalRoot = document.getElementById('modal-root');
  if(modalRoot){
    modalRoot.querySelectorAll('.modal-close').forEach(btn=>{
      btn.addEventListener('click', ()=> closeModal());
    });
  }
  window.openModal = function(){
    if(!modalRoot) return;
    modalRoot.setAttribute('aria-hidden','false');
  }
  function closeModal(){
    if(!modalRoot) return;
    modalRoot.setAttribute('aria-hidden','true');
  }

  // Form validation visuals: add class .was-validated on submit
  document.querySelectorAll('form').forEach(form=>{
    form.addEventListener('submit', function(e){
      if(!form.checkValidity()){
        e.preventDefault();
        e.stopPropagation();
        form.classList.add('was-validated');
        // Focus first invalid
        const firstInvalid = form.querySelector(':invalid');
        if(firstInvalid) firstInvalid.focus();
      } else {
        e.preventDefault();
        // show success toast
        showToast('Formulário enviado (simulação)');
        form.reset();
        form.classList.remove('was-validated');
      }
    });
  });
});


// expose init hooks for other modules
window.initUI = function(){ /* nothing - UI behaviors already bound on DOMContentLoaded */ };
