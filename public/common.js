// Общий JS для всех публичных страниц: навигация, футер, вспомогательные утилиты.

function esc(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
}
function escAttr(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function escMultiline(str) {
  return esc(str).replace(/\n/g, '<br>');
}

const NAV_LINKS = [
  { href: '/o-kompanii', label: 'О компании' },
  { href: '/uslugi', label: 'Услуги' },
  { href: '/vakciny', label: 'Вакцины и цены' },
  { href: '/dokumenty', label: 'Документы' },
  { href: '/kontakty', label: 'Контакты' },
];

// Логотип-мотив «холодовая цепь»: капля/ампула на фоне температурной дуги
// с делением-«безопасной зоной» — вместо клише ДНК-спирали или пробирки.
const BRAND_MARK_SVG = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="30" fill="#10222C"/>
  <path d="M32 12 A20 20 0 1 1 13.6 24.5" stroke="#EFF5F7" stroke-width="2.4" stroke-linecap="round" fill="none" opacity="0.5"/>
  <path d="M22 20 A20 20 0 0 1 44.6 21.8" stroke="#E8A33D" stroke-width="2.6" stroke-linecap="round" fill="none"/>
  <path d="M32 20c-4.5 5.4-7 9.3-7 12.6A7 7 0 0 0 39 32.6c0-3.3-2.5-7.2-7-12.6Z" fill="#EFF5F7"/>
  <circle cx="13.6" cy="24.5" r="2.1" fill="#EFF5F7" opacity="0.7"/>
  <circle cx="44.6" cy="21.8" r="2.1" fill="#E8A33D"/>
</svg>`;

function renderNav(settings) {
  const brand = settings.brand_name || 'ООО «КрасБиоМед-Иммуно»';
  const path = window.location.pathname;
  const isActive = (href) => path === href || (href !== '/' && path.startsWith(href));
  const html = `
    <header class="site-header">
      <div class="wrap header-inner">
        <a href="/" class="brand" aria-label="${esc(brand)} — на главную">
          <span class="brand-mark">${BRAND_MARK_SVG}</span>
          <span class="brand-name">${esc(brand)}</span>
        </a>
        <nav class="main-nav" aria-label="Основная навигация">
          ${NAV_LINKS.map(l => `<a href="${l.href}" class="${isActive(l.href) ? 'is-active' : ''}">${l.label}</a>`).join('')}
        </nav>
        <a class="nav-cta" href="/zayavka">Оставить заявку</a>
        <button type="button" class="nav-burger" id="navBurger" aria-label="Открыть меню" aria-expanded="false" aria-controls="navMobilePanel">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="wrap">
        <div class="nav-mobile-panel" id="navMobilePanel">
          <ul class="nav-mobile-links">
            ${NAV_LINKS.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
            <li><a href="/zayavka" style="color:var(--amber-deep);">Оставить заявку →</a></li>
          </ul>
        </div>
      </div>
    </header>
  `;
  const placeholder = document.getElementById('navPlaceholder');
  if (placeholder) placeholder.outerHTML = html;

  const burger = document.getElementById('navBurger');
  const panel = document.getElementById('navMobilePanel');
  if (burger && panel) {
    burger.addEventListener('click', () => {
      const isOpen = panel.classList.contains('is-open');
      panel.classList.toggle('is-open', !isOpen);
      burger.setAttribute('aria-expanded', String(!isOpen));
    });
  }
}

function renderFooter(settings) {
  const brand = settings.brand_name || 'ООО «КрасБиоМед-Иммуно»';
  const html = `
    <footer>
      <div class="wrap footer-inner">
        <div>
          <div class="footer-brand">
            <span class="brand-mark">${BRAND_MARK_SVG}</span>
          </div>
          <p style="font-size:0.9rem; max-width:34ch;">${esc(settings.legal_address || '')}</p>
          <p class="footer-license">Лицензия ${esc(settings.license_med_number || '')} от ${esc(settings.license_med_date || '')} на медицинскую деятельность.<br>Лицензия ${esc(settings.license_pharma_number || '')} от ${esc(settings.license_pharma_date || '')} на фармацевтическую деятельность.<br>${esc(settings.legal_name || '')}.</p>
        </div>
        <div>
          <h4>Разделы</h4>
          <div class="footer-links">
            <a href="/o-kompanii">О компании</a>
            <a href="/uslugi">Услуги</a>
            <a href="/vakciny">Вакцины и цены</a>
            <a href="/dokumenty">Документы</a>
          </div>
        </div>
        <div>
          <h4>Контакты</h4>
          <div class="footer-links">
            <a href="/kontakty">Контакты</a>
            <a href="/zayavka">Оставить заявку</a>
            <a href="/privacy">Обработка данных</a>
          </div>
          <p style="margin-top:14px; font-weight:700; color:#fff;">${esc(settings.phone_display || settings.phone || '')}</p>
        </div>
      </div>
      <div class="footer-disclaimer">
        <strong>Имеются противопоказания.</strong> Необходима консультация специалиста.
      </div>
      <div class="footer-bottom">© 2026 ${esc(brand)}. Все права защищены.</div>
    </footer>
  `;
  const placeholder = document.getElementById('footerPlaceholder');
  if (placeholder) placeholder.outerHTML = html;
}

// Фоновый мотив «индикатор холодовой цепи» — вертикальная температурная
// шкала с подсвеченной безопасной зоной (+2…+8°C), как на настоящих
// термоиндикаторах на упаковках вакцин. Отражает специфику дистрибьютора
// иммунобиопрепаратов (в отличие от сети линий/гониометра/дуги рассвета
// у других сайтов очереди).
function renderColdchainField(target, opts = {}) {
  const el = document.querySelector(target);
  if (!el) return;
  const color = opts.color || 'currentColor';
  const dotColor = opts.dotColor || 'var(--amber)';
  el.innerHTML = `
    <svg viewBox="0 0 600 600" fill="none" preserveAspectRatio="xMidYMid slice">
      <rect x="470" y="90" width="14" height="360" rx="7" stroke="${color}" stroke-opacity="0.16" stroke-width="1.2"/>
      <rect x="472" y="230" width="10" height="80" rx="5" fill="${dotColor}" fill-opacity="0.22"/>
      ${Array.from({ length: 14 }).map((_, i) => {
        const y = 100 + i * 24;
        return `<line x1="486" y1="${y}" x2="500" y2="${y}" stroke="${color}" stroke-opacity="0.18" stroke-width="1"/>`;
      }).join('')}
      <circle cx="477" cy="452" r="9" fill="${color}" fill-opacity="0.14"/>
      <circle cx="477" cy="452" r="4" fill="${dotColor}"/>
      <path d="M120 500 L220 500 L220 420 L320 420 L320 500 L420 500" stroke="${color}" stroke-opacity="0.14" stroke-width="1.4" stroke-dasharray="1 9" stroke-linecap="round"/>
      <circle cx="120" cy="500" r="4" fill="${color}" fill-opacity="0.3"/>
      <circle cx="220" cy="420" r="4" fill="${dotColor}" fill-opacity="0.7"/>
      <circle cx="320" cy="420" r="4" fill="${color}" fill-opacity="0.3"/>
      <circle cx="420" cy="500" r="4" fill="${color}" fill-opacity="0.3"/>
    </svg>
  `;
}

function renderServiceCards(services) {
  const icons = {
    'vakcinatsiya-v-kabinete': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M18.5 2.5 21 5l-2 2-1-1-8.5 8.5 1 1-2 2-1-1-2.5 2.5H3v-2.5L5.5 15l-1-1 2-2 1 1L16 4.5l-1-1 2-2Z"/><path d="M14 6l4 4"/></svg>',
    'seroprofilaktika-kleshcha': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3c4 2 7 2 7 2v7c0 5-3 7.5-7 9-4-1.5-7-4-7-9V5s3 0 7-2Z"/><path d="M9.5 12l2 2 3.5-4"/></svg>',
    'vyezdnaya-vakcinatsiya': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M3 17V8a1 1 0 0 1 1-1h9l4 4h2a1 1 0 0 1 1 1v5h-2M8 17h7"/></svg>',
    'optovaya-prodazha': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8l9-5 9 5-9 5-9-5Z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/></svg>',
    'dostavka-holodovaya-tsep': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2v6M9 5h6"/><rect x="5" y="9" width="14" height="13" rx="2"/><path d="M12 13v5M9.5 15.5h5"/></svg>',
  };
  return services.map(s => `
    <a class="service-card" href="/uslugi/${esc(s.slug)}">
      <div class="glyph">${icons[s.slug] || ''}</div>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.short_desc)}</p>
      <span class="go">Подробнее →</span>
    </a>
  `).join('');
}

let cachedSettings = null;
async function loadSettingsGlobal() {
  if (cachedSettings) return cachedSettings;
  const res = await fetch('/api/settings');
  cachedSettings = await res.json();
  return cachedSettings;
}

async function initLayout() {
  try {
    const settings = await loadSettingsGlobal();
    renderNav(settings);
    renderFooter(settings);
  } catch (err) {
    console.error('Не удалось загрузить настройки сайта:', err);
  }
}
initLayout();
