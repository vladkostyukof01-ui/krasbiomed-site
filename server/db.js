const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'krasbiomed.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  -- Направления деятельности компании (розница/прививочный кабинет,
  -- опт, серопрофилактика при укусе клеща, выездная вакцинация и т.д.)
  -- — карточки на главной и странице «Услуги».
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_desc TEXT NOT NULL DEFAULT '',
    body TEXT NOT NULL DEFAULT '',
    icon TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  -- Разделы прейскуранта на вакцинацию (клещевой энцефалит,
  -- пневмококковая инфекция, ДКС и т.д. — перенесены из
  -- «Прайс-для-Сайта-26.docx» с оригинального сайта).
  CREATE TABLE IF NOT EXISTS price_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    intro TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  -- Позиция прейскуранта: конкретный препарат с производителем,
  -- формой выпуска и ценой (или отметкой «нет в наличии»).
  CREATE TABLE IF NOT EXISTS price_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL REFERENCES price_categories(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    dose_note TEXT NOT NULL DEFAULT '',
    manufacturer TEXT NOT NULL DEFAULT '',
    price_note TEXT NOT NULL DEFAULT '',
    in_stock INTEGER NOT NULL DEFAULT 1,
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  -- Лицензии и сертификаты — сканы страниц лицензий (медицинская,
  -- фармацевтическая) для страницы «Документы».
  CREATE TABLE IF NOT EXISTS licenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    caption TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  -- Заявки с формы «Оставить заявку» / «Запросить прайс».
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    organization TEXT,
    request_type TEXT,
    message TEXT,
    source TEXT NOT NULL DEFAULT 'zayavka-form',
    consent_given INTEGER NOT NULL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    status TEXT NOT NULL DEFAULT 'new'
  );
`);

module.exports = db;
