// reveal.js — плавное появление элементов при прокрутке (IntersectionObserver).
// Деловой B2B/B2C медицинский контекст: умеренный тайминг (0.6-0.8s), без
// игривости. Уважает prefers-reduced-motion. Часть контента на сайте
// подгружается через fetch уже после первого прохода (карточки услуг,
// прайс-аккордеон, лицензии, реквизиты) — для них используется
// MutationObserver, чтобы вновь вставленные узлы тоже получили анимацию
// и не остались навсегда с opacity:0.

(function () {
  'use strict';

  var REDUCED_MOTION = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Селекторы контента, который генерируется через innerHTML уже после
  // начальной разметки (см. common.js/index.html/uslugi.html/vakciny.html/
  // dokumenty.html) и поэтому не может получить класс reveal-* заранее —
  // помечаем его сразу, как только узел появляется в DOM.
  var AUTO_TAG_SELECTORS = [
    '#servicesGrid > .service-card',
    '#licenseGrid > .license-item',
    '#priceList > .accordion',
    '#requisitesTable > tr',
  ];

  function autoTagDynamicCards(root) {
    AUTO_TAG_SELECTORS.forEach(function (sel) {
      root.querySelectorAll(sel).forEach(function (el, i) {
        if (!el.classList.contains('reveal') && !el.hasAttribute('data-reveal-done')) {
          el.classList.add('reveal', 'reveal-stagger');
          el.style.setProperty('--reveal-delay', Math.min(i, 8) * 60 + 'ms');
        }
      });
    });
  }

  if (REDUCED_MOTION) {
    // Мгновенно показать всё — включая то, что появится позже динамически.
    document.documentElement.classList.add('reveal-disabled');
    var showAll = function () {
      autoTagDynamicCards(document);
      document.querySelectorAll('.reveal, .chain-step').forEach(function (el) {
        el.classList.add('is-visible');
      });
    };
    showAll();
    new MutationObserver(showAll).observe(document.body, { childList: true, subtree: true });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  function observeNew(root) {
    root.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
      if (el.dataset.revealObserved) return;
      el.dataset.revealObserved = '1';
      io.observe(el);
    });
    // Цепочка контрольных точек — последовательное появление (stagger),
    // усиливает уже существующий мотив «холодовой цепи» вместо отдельного
    // декора.
    root.querySelectorAll('.chain-steps:not([data-chain-tagged])').forEach(function (chain) {
      chain.setAttribute('data-chain-tagged', '1');
      var steps = chain.querySelectorAll('.chain-step');
      steps.forEach(function (step, i) {
        step.classList.add('reveal', 'reveal-stagger');
        step.style.setProperty('--reveal-delay', i * 90 + 'ms');
        if (!step.dataset.revealObserved) {
          step.dataset.revealObserved = '1';
          io.observe(step);
        }
      });
    });
  }

  function scan(root) {
    autoTagDynamicCards(root);
    observeNew(root);
  }

  document.addEventListener('DOMContentLoaded', function () {
    scan(document);
  });
  // На случай если скрипт выполняется после DOMContentLoaded (defer-подобный
  // порядок при кэшировании) — сканируем и сразу.
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    scan(document);
  }

  // Динамически вставленный контент (fetch → innerHTML): следим за body и
  // пере-сканируем добавленные узлы, чтобы не оставить их с opacity:0.
  var mo = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (node.nodeType !== 1) return;
        scan(node.parentNode && node.parentNode.querySelectorAll ? node.parentNode : document);
      });
    });
  });
  mo.observe(document.body, { childList: true, subtree: true });
})();
