/*
  templates.js - simple JS template functions for projects listing and detail rendering
*/
export function renderProjectsList(container, data){
  const listEl = container.querySelector('.grid') || container;
  // clear stub content if any
  listEl.innerHTML = '';
  data.forEach(item=>{
    const col = document.createElement('article');
    col.className = 'project card col-4';
    col.setAttribute('data-project-id', item.id);
    col.innerHTML = `
      <div class="card-media"><img src="${item.img}" alt="${item.title}"></div>
      <div class="card-body">
        <h3>${escapeHtml(item.title)} <span class="badge">${escapeHtml(item.status)}</span></h3>
        <p>${escapeHtml(item.summary)}</p>
        <div class="meta">${item.tags.map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join(' ')}</div>
        <div class="card-actions mt-2">
          <button class="btn btn-primary small" data-action="detail" aria-label="Ver ${escapeHtml(item.title)}">Saber mais</button>
          <button class="btn btn-ghost small" data-action="join" data-toast="Inscrição para ${escapeHtml(item.title)} enviada">Quero ajudar</button>
        </div>
      </div>
    `;
    listEl.appendChild(col);
  });
}

export function renderProjectDetail(hostEl, item){
  if(!item) return;
  // expand host element into detail (simple toggle)
  let detail = hostEl.querySelector('.project-detail');
  if(detail){
    detail.remove();
    return;
  }
  detail = document.createElement('div');
  detail.className = 'project-detail mt-2';
  detail.innerHTML = `
    <div class="card">
      <h3>${escapeHtml(item.title)} — Detalhes</h3>
      <p><strong>Status:</strong> ${escapeHtml(item.status)}</p>
      <p>${escapeHtml(item.summary)} Conteúdo expandido com objetivos, indicadores e planos.</p>
      <div class="mt-2"><button class="btn btn-primary" data-toast="Obrigado por se interessar!">Inscrever-se</button></div>
    </div>
  `;
  hostEl.appendChild(detail);
}

// small helper
function escapeHtml(str){ return String(str).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]; }); }
