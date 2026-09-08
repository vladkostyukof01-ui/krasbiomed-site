const bcrypt = require('bcryptjs');
const db = require('./db');
const { settings } = require('./seed_settings');
const { services } = require('./seed_services');
const { categories, items } = require('./seed_prices');
const { licenses } = require('./seed_licenses');

function seedSettings() {
  const upsert = db.prepare(`INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO NOTHING`);
  const tx = db.transaction(() => {
    Object.entries(settings).forEach(([k, v]) => upsert.run(k, String(v)));
  });
  tx();
  console.log('Настройки сайта инициализированы.');
}

function seedServices() {
  const count = db.prepare('SELECT COUNT(*) AS c FROM services').get().c;
  if (count > 0) {
    console.log('Направления уже загружены, пропускаю.');
    return;
  }
  const insert = db.prepare(`
    INSERT INTO services (slug, title, short_desc, body, icon, sort_order) VALUES (@slug, @title, @short_desc, @body, @icon, @sort_order)
  `);
  const tx = db.transaction(() => { services.forEach(s => insert.run(s)); });
  tx();
  console.log(`Загружено направлений: ${services.length}.`);
}

function seedPrices() {
  const count = db.prepare('SELECT COUNT(*) AS c FROM price_categories').get().c;
  if (count > 0) {
    console.log('Прайс-лист уже загружен, пропускаю.');
    return;
  }
  const insertCat = db.prepare(`
    INSERT INTO price_categories (slug, title, intro, sort_order) VALUES (@slug, @title, @intro, @sort_order)
  `);
  const insertItem = db.prepare(`
    INSERT INTO price_items (category_id, title, dose_note, manufacturer, price_note, in_stock, sort_order)
    VALUES (@category_id, @title, @dose_note, @manufacturer, @price_note, @in_stock, @sort_order)
  `);
  const tx = db.transaction(() => {
    categories.forEach(cat => {
      const result = insertCat.run(cat);
      const categoryId = result.lastInsertRowid;
      const list = items[cat.slug] || [];
      list.forEach(item => {
        insertItem.run({
          category_id: categoryId,
          title: item.title,
          dose_note: item.dose_note || '',
          manufacturer: item.manufacturer || '',
          price_note: item.price_note,
          in_stock: item.in_stock === false ? 0 : (item.in_stock ?? 1),
          sort_order: item.sort_order,
        });
      });
    });
  });
  tx();
  const total = Object.values(items).reduce((sum, list) => sum + list.length, 0);
  console.log(`Загружено разделов прейскуранта: ${categories.length}, позиций: ${total}.`);
}

function seedLicenses() {
  const count = db.prepare('SELECT COUNT(*) AS c FROM licenses').get().c;
  if (count > 0) {
    console.log('Лицензии уже загружены, пропускаю.');
    return;
  }
  const insert = db.prepare(`
    INSERT INTO licenses (title, caption, image, sort_order) VALUES (@title, @caption, @image, @sort_order)
  `);
  const tx = db.transaction(() => { licenses.forEach(l => insert.run(l)); });
  tx();
  console.log(`Загружено документов: ${licenses.length}.`);
}

function seedAdmin() {
  const count = db.prepare('SELECT COUNT(*) AS c FROM admins').get().c;
  if (count > 0) {
    console.log('Админ уже существует, пропускаю.');
    return;
  }
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'krasbiomed2026';
  const hash = bcrypt.hashSync(password, 12);
  db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run(username, hash);
  console.log(`Создан админ: логин "${username}", пароль "${password}" (смените после первого входа!).`);
}

seedSettings();
seedServices();
seedPrices();
seedLicenses();
seedAdmin();
console.log('Готово.');
