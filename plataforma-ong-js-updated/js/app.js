/*
  app.js - SPA router, content loader, template renderer, localStorage autosave
*/
import {renderProjectsList, renderProjectDetail} from './templates.js';
import {validateFormFields, cpfIsValid} from './validation.js';
import {stateSaveDraft, stateLoadDraft, stateClearDraft} from './state.js';

// Simple router using History API - loads pages via fetch and injects <main>
const containerSelector = 'main';
const navSelector = '.main-nav';

function ajaxLoad(url, push=true){
  fetch(url).then(r=>{
    if(!r.ok) throw new Error('Erro ao carregar conteúdo');
    return r.text();
  }).then(html=>{
    // extract <main> content
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const newMain = doc.querySelector('main');
    const currentMain = document.querySelector(containerSelector);
    if(newMain && currentMain){
      currentMain.innerHTML = newMain.innerHTML;
      // run any after-insert hooks (forms, masks, templates)
      afterContentLoad();
      if(push) history.pushState({url}, '', url);
    }
  }).catch(err=>{
    console.error(err);
    showToast('Não foi possível carregar a página');
  });
}

function onNavClick(e){
  const a = e.target.closest('a');
  if(!a) return;
  const href = a.getAttribute('href');
  if(!href || href.startsWith('http') || href.startsWith('#')) return;
  e.preventDefault();
  ajaxLoad(href);
}

function afterContentLoad(){
  // reattach masks and UI behaviors
  if(window.initMasks) window.initMasks();
  if(window.initUI) window.initUI();
  // If projects container exists, render templates
  const projectsContainer = document.querySelector('.projects-list');
  if(projectsContainer){
    // sample data
    const data = [
      {id:1,title:'Alfabetização Comunitária',status:'Ativo',summary:'Projeto focado em adultos e jovens.',tags:['Educação','Comunidade'],img:'images/projeto-exemplo.jpg'},
      {id:2,title:'Campanha de Inverno',status:'Captação',summary:'Distribuição de agasalhos.',tags:['Solidariedade'],img:'images/projeto-exemplo.jpg'}
    ];
    renderProjectsList(projectsContainer, data);
    // delegate clicks for project details
    projectsContainer.addEventListener('click', (ev)=>{
      const card = ev.target.closest('[data-project-id]');
      if(card){
        const id = card.getAttribute('data-project-id');
        renderProjectDetail(card, data.find(d=>String(d.id)===String(id)) || null);
      }
    });
  }
  // if form present, attach validation and autosave
  const form = document.querySelector('form#cadastroForm');
  if(form){
    // wire validation
    form.addEventListener('input', function(e){
      validateFormFields(e.target);
    }, true);
    // on submit handled by ui.js; add cpf extra check
    form.addEventListener('submit', function(e){
      const cpfEl = form.querySelector('#cpf');
      if(cpfEl && cpfEl.value && !cpfIsValid(cpfEl.value)){
        e.preventDefault();
        showToast('CPF inválido. Verifique os dígitos.');
        cpfEl.focus();
        cpfEl.setAttribute('aria-invalid','true');
        return;
      }
      // clear draft on successful submit (simulation handled in ui.js)
      stateClearDraft('cadastro');
    });
    // autosave draft every 2s when changed
    let timeout;
    form.addEventListener('input', function(){
      clearTimeout(timeout);
      timeout = setTimeout(()=>{
        const data = new FormData(form);
        const obj = {};
        for(const [k,v] of data.entries()) obj[k]=v;
        stateSaveDraft('cadastro', obj);
        showToast('Rascunho salvo localmente', 1200);
      }, 1200);
    });
    // populate draft if exists
    const draft = stateLoadDraft('cadastro');
    if(draft){
      for(const k in draft){
        const el = form.elements[k];
        if(el){
          el.value = draft[k];
        }
      }
      showToast('Rascunho recuperado', 1400);
    }
  }
}

// History navigation
window.addEventListener('popstate', (e)=>{
  const url = (e.state && e.state.url) || location.pathname;
  ajaxLoad(url, false);
});

// init
export function initSPA(){
  document.body.addEventListener('click', function(e){
    // delegate nav clicks
    const nav = e.target.closest('.main-nav');
    if(nav) onNavClick(e);
  });
  // initial run for current page
  afterContentLoad();
}

// auto-init if not using bundler
if(!window.__SPA_INIT__){
  window.__SPA_INIT__ = true;
  initSPA();
}
