const menuData = [
 ['Первые блюда',[['Кеспе',2100],['Острый из кебаб',2100],['Окрошка на из кефира',2100],['Сумын коянны',1700],['Солянка с борнины',1000],['Шурпа из баранины',2400],['Том мм',2400],['Том мм',3200],['Хашлама',2490],['Уха',2490]]],
 ['Вторые блюда',[['Аюбгинусу',2390],['Лянные ненги',2700],['Казани кебаб (бебаб ке)',2700],['Мазай кебаб баранина',2600],['Манты на пару',2400],['Манты на пару',2400],['Черепные пельмени',1890],['Чекермеки',1890],['Гречка',2990],['Куриная эммят',2990],['Парга болоньезе',2990],['Фетучини Альфредо',2990],['Карофель по-домашнему',2990],['Бефстроганов',2990],['WOK удон с телятиной',3880]]],
 ['Салаты',[['Кимчи',2100],['Пренеский',2100],['Цезарь',2700],['Феварь',2390],['Жареный бараний',2400],['Салат с тунцой',2200],['Салат с говядиной',3300],['Салат SAMRAT',2490]]],
 ['Выпечка',[['Боровский пирог',1490],['Хачапури по-грузински',1790],['Хачапури по-аджарски',3190],['Хачапури по-мегрельски',3190],['Лепёшка печётина',1790],['Блинчики',1290],['Жончий бовлячий',1290],['Жареные корочки',450]]],
 ['Гарниры',[['Картофель фри',1390],['Рис отварной',890],['Гречка',890],['Пюре',890],['Овощи',890]]],
 ['Закуски к пиву',[['Пивной орешки',1090],['Кальмар',1090],['Сырные палочки',1290],['Пряные челюстные',1290],['Ассные колбаны',1290],['Чечные копани',1390],['Чипсы',190],['Арахис',490],['Фисташки',1400],['Бисковые черепашки',2400],['Сосисные корочки',2990],['Бреные корняки',2990],['Охотничьи',1990]]],
 ['Холодные закуски',[['Казах',2800],['Бодаб по-русски',3800],['Рыбное ассорти',1900],['Таборо с сыром',2490]]],
 ['Фастфуд',[['Пельмени',2800],['Сосиска',3000],['Мидии с соусом',2750],['Маргосы',2890],['Пицца с сыром',2490],['Мясной дог',2490],['Хот-дог',2490]]],
 ['Соусы',[['Томатный',400],['Барбекю',400],['Тар-тар',400],['Острый боровки',400],['Острый кю',400],['Огуречный',400],['Чесночный',400],['Сметанный',400]]],
 ['Шашлыки',[['Баранина',3600],['Филе индейка',2400],['Окорочка',2400],['Окорочка',2190],['Филе куриное',2390],['Шашлычки',2390],['Телятина из сочики',2000],['Шашлык из конины',2380],['Люля-кебаб',2390],['Стейк Рибай',7600],['Стейк Нью-Йорк',7500]]],
 ['Блюда на компанию',[['Бешбармак (10–15 человек)',35000],['Жибекши',35000],['Плов на компанию',15000]]]
];
const categoryList=document.getElementById('categoryList'), menuGrid=document.getElementById('menuGrid'), search=document.getElementById('menuSearch');
let activeCategory=menuData[0][0];
function renderCategories(){categoryList.innerHTML=menuData.map(([name])=>`<button class="category-btn ${name===activeCategory?'active':''}" data-category="${name}">${name}</button>`).join('')}
function renderMenu(){const q=search.value.trim().toLocaleLowerCase('ru');let items=menuData.filter(([cat])=>activeCategory==='Все'||cat===activeCategory).flatMap(([category,items])=>items.map(([name,price])=>({category,name,price}))).filter(x=>!q||x.name.toLocaleLowerCase('ru').includes(q)||x.category.toLocaleLowerCase('ru').includes(q));menuGrid.innerHTML=items.length?items.map((item,i)=>`<article class="menu-item" style="animation-delay:${Math.min(i*18,180)}ms"><h4>${item.name}</h4><span class="price">${item.price.toLocaleString('ru-RU')} ₸</span></article>`).join(''):'<div class="menu-empty">Ничего не найдено. Попробуйте другое название.</div>'}
categoryList.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;activeCategory=b.dataset.category;renderCategories();renderMenu()});search.addEventListener('input',renderMenu);renderCategories();renderMenu();
// Reveal sections only when they approach the viewport.
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver'in window&&!reduced){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});document.querySelectorAll('.reveal').forEach(el=>io.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
// Lightweight scroll-driven glass fill: no WebGL, no permanent animation loop.
const liquid=document.getElementById('liquid'),glassStage=document.getElementById('glassStage');let glassVisible=false,scrollQueued=false;
if('IntersectionObserver'in window){new IntersectionObserver(entries=>{glassVisible=entries[0].isIntersecting;if(glassVisible)updateGlass()},{rootMargin:'100px'}).observe(glassStage)}else glassVisible=true;
function updateGlass(){if(!glassVisible||document.hidden)return;const section=document.querySelector('.pour-section');const rect=section.getBoundingClientRect(),vh=window.innerHeight;const travel=Math.max(1,rect.height-vh);const progress=Math.max(0,Math.min(1,(vh-rect.top)/travel));liquid.style.height=`${6+progress*82}%`;glassStage.style.setProperty('--fill-progress',progress.toFixed(3));}
window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(()=>{updateGlass();scrollQueued=false})}},{passive:true});document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateGlass()});
// Mobile navigation
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
// Gallery lightbox and original menu modal
const lightbox=document.getElementById('lightbox'),original=document.getElementById('originalModal');document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{lightbox.querySelector('img').src=item.dataset.full;lightbox.classList.add('open')}));document.getElementById('openOriginal').addEventListener('click',()=>original.classList.add('open'));
function closeModals(){lightbox.classList.remove('open');original.classList.remove('open')}document.querySelectorAll('.lightbox-close').forEach(b=>b.addEventListener('click',closeModals));[lightbox,original].forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModals()}));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModals()});
document.getElementById('year').textContent=new Date().getFullYear();
