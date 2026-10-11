import {buildDetailerSite} from './generator.mjs';
// Set this after the owner creates and verifies a free business Gmail inbox.
const CONTACT_EMAIL = '';
const form = document.querySelector('#builder');
const frame = document.querySelector('#site-preview');
const status = document.querySelector('#builder-status');
let currentInput;
let currentHtml;
function collect(){
  const data = Object.fromEntries(new FormData(form));
  data.packages = [1,2,3].map(i=>({name:data[`package${i}`],price:data[`price${i}`],detail:'Confirm the service inclusions for this package before publishing.'}));
  return data;
}
function update(){currentInput=collect();currentHtml=buildDetailerSite(currentInput);frame.srcdoc=currentHtml;}
form.addEventListener('submit',event=>{event.preventDefault();update();status.textContent='Preview updated. Check the package descriptions and contact details before publishing.';});
document.querySelector('#download').addEventListener('click',()=>{
  if(!form.reportValidity())return;
  update();
  const blob=new Blob([currentHtml],{type:'text/html;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const link=document.createElement('a');link.href=url;link.download='detailing-website-draft.html';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
  status.textContent='Draft downloaded. This file is not hosted yet. Confirm the details before launch.';
});
document.querySelector('#brief').addEventListener('click',async()=>{
  if(!form.reportValidity())return;update();
  const brief=`QuotePage business brief\nBusiness: ${currentInput.name}\nService area: ${currentInput.city}\nEmail: ${currentInput.email||'Not supplied'}\nPhone: ${currentInput.phone||'Not supplied'}\nColor: ${currentInput.theme}\nPackages:\n${currentInput.packages.map(p=>`${p.name}: ${p.price}`).join('\n')}\nRequested offer: $249 one-page site. Optional care: $49/month.\nPhotos, package inclusions, and business details need owner approval.\n`;
  try{await navigator.clipboard.writeText(brief);status.textContent='Business brief copied. No inquiry has been sent.';}
  catch{const blob=new Blob([brief],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='quotepage-business-brief.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);status.textContent='Clipboard unavailable. Your business brief was downloaded instead. No inquiry has been sent.';}
});
document.querySelectorAll('.width-button').forEach(button=>button.addEventListener('click',()=>{
  document.querySelector('#frame-holder').classList.toggle('mobile',button.dataset.size==='mobile');
  document.querySelectorAll('.width-button').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});
}));
if(CONTACT_EMAIL){const link=document.querySelector('#inquiry-link');link.href=`mailto:${CONTACT_EMAIL}?subject=QuotePage%20website%20inquiry`;link.hidden=false;document.querySelector('#inquiry-note').textContent='Use the studio, copy your brief, then include it in your inquiry email. Sending opens your email app.';document.querySelector('.preview-note').textContent='Website service pilot. No payment is collected on this page.';}
update();
