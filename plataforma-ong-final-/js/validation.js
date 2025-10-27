\
/*
  validation.js - field-level validation helpers
*/

export function cpfIsValid(cpf){
  if(!cpf) return false;
  cpf = cpf.replace(/\D/g,'');
  if(cpf.length !== 11) return false;
  // Reject same-digit sequences
  if(/^(\d)\1+$/.test(cpf)) return false;
  const nums = cpf.split('').map(n=>parseInt(n,10));
  // first check digit
  let sum=0;
  for(let i=0;i<9;i++) sum += nums[i]*(10-i);
  let rev = 11 - (sum % 11);
  if(rev===10 || rev===11) rev = 0;
  if(rev !== nums[9]) return false;
  // second
  sum=0;
  for(let i=0;i<10;i++) sum += nums[i]*(11-i);
  rev = 11 - (sum % 11);
  if(rev===10 || rev===11) rev = 0;
  return rev === nums[10];
}

export function validateFormFields(el){
  if(!el) return true;
  // simple validation: mark invalid/valid classes and aria-invalid
  if(el.checkValidity()){
    el.classList.remove('invalid');
    el.classList.add('valid');
    el.setAttribute('aria-invalid','false');
    // specific checks
    if(el.id==='cpf'){
      if(!cpfIsValid(el.value)){
        el.classList.remove('valid');
        el.classList.add('invalid');
        el.setAttribute('aria-invalid','true');
        showInlineError(el, 'CPF inválido');
        return false;
      } else {
        clearInlineError(el);
      }
    } else {
      clearInlineError(el);
    }
    return true;
  } else {
    el.classList.remove('valid');
    el.classList.add('invalid');
    el.setAttribute('aria-invalid','true');
    showInlineError(el, el.validationMessage || 'Campo inválido');
    return false;
  }
}

function showInlineError(el, msg){
  let id = el.id || el.name;
  if(!id) return;
  let node = el.parentElement.querySelector('.field-error');
  if(!node){
    node = document.createElement('div');
    node.className = 'field-error';
    node.setAttribute('aria-live','polite');
    el.parentElement.appendChild(node);
  }
  node.textContent = msg;
  node.style.color = 'var(--color-danger)';
  node.style.fontSize = '0.9rem';
  node.style.marginTop = '6px';
}

function clearInlineError(el){
  const node = el.parentElement.querySelector('.field-error');
  if(node) node.remove();
}
