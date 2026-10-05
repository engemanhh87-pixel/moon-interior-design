let language = 'ar';
const form = document.querySelector('#booking');
const dialog = document.querySelector('#preview');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const today = new Date();
const localDate = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
form.elements.date.min = localDate;
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-ar]').forEach(el => {
    if (el.tagName === 'H1' || el.tagName === 'H2') el.innerHTML = el.dataset[next];
    else el.textContent = el.dataset[next];
  });
  document.querySelector('#language').textContent = next === 'ar' ? 'EN' : 'عربي';
  document.querySelector('#language').setAttribute('aria-label', next === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  document.title = next === 'ar' ? 'moon | للتصميم الداخلي' : 'moon | Interior Design';
  document.querySelector('#form-status').textContent = '';
}
document.querySelector('#language').addEventListener('click', () => setLanguage(language === 'ar' ? 'en' : 'ar'));
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {nav.classList.remove('open');menu.setAttribute('aria-expanded', 'false');}));
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { form.elements.service.value = link.dataset.service; }));
form.addEventListener('submit', event => {
  event.preventDefault();
  const details = document.querySelector('#request-details');
  details.replaceChildren();
  const names = language === 'ar' ? ['الاسم', 'البريد الإلكتروني', 'الخدمة', 'الموعد المفضل', 'عن المساحة'] : ['Name', 'Email', 'Service', 'Preferred date', 'About your space'];
  const values = [form.elements.name.value.trim(), form.elements.email.value, form.elements.service.selectedOptions[0].textContent, form.elements.date.value, form.elements.message.value.trim()];
  if (!values[0] || !values[4]) { document.querySelector('#form-status').textContent = language === 'ar' ? 'يرجى كتابة الاسم ووصف المساحة.' : 'Please enter your name and a description.'; return; }
  names.forEach((name, index) => {const dt = document.createElement('dt');const dd = document.createElement('dd');dt.textContent = name;dd.textContent = values[index];details.append(dt,dd);});
  dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
