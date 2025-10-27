/*
  state.js - simple localStorage helpers
*/
export function stateSaveDraft(key, obj){
  try{
    localStorage.setItem('draft_'+key, JSON.stringify({ts:Date.now(), data:obj}));
    return true;
  }catch(e){ return false; }
}
export function stateLoadDraft(key){
  try{
    const raw = localStorage.getItem('draft_'+key);
    if(!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.data || null;
  }catch(e){ return null; }
}
export function stateClearDraft(key){
  try{ localStorage.removeItem('draft_'+key); return true; }catch(e){ return false; }
}
