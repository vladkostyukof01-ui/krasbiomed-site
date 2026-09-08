// Прейскурант на услуги по вакцинации — перенесён дословно из документа
// «Прейскурант на услуги по вакцинации» ООО «КрасБиоМед-Иммуно»,
// утверждён директором Климовой З.А. «12» января 2026 года
// (файл /wp-content/uploads/2026/03/Прайс-для-Сайта-26.docx на krasbiomed.ru).
// Цены — в рублях за одну дозу, если не указано иное. «Нет в наличии» —
// перенесено как есть, честно показывает временное отсутствие препарата.

const categories = [
  { slug: 'kleshchevoy-encefalit', title: 'Вакцинопрофилактика клещевого энцефалита', intro: 'Красноярский край — эндемичный по клещевому энцефалиту регион. Прививаться рекомендуется заранее, до начала сезона активности клещей.', sort_order: 1 },
  { slug: 'pnevmokokkovaya-infektsiya', title: 'Пневмококковая инфекция', intro: '', sort_order: 2 },
  { slug: 'difteriya-koklyush-stolbnyak', title: 'Дифтерия, коклюш, столбняк', intro: '', sort_order: 3 },
  { slug: 'dkspv-gemofilnaya', title: 'Дифтерия, коклюш, столбняк, полиомиелит, гемофильная инфекция типа В', intro: '', sort_order: 4 },
  { slug: 'dkspv-gepatit-v-gemofilnaya', title: 'Дифтерия, коклюш, столбняк, полиомиелит, гепатит В, гемофильная инфекция типа В', intro: '', sort_order: 5 },
  { slug: 'gepatit-v', title: 'Гепатит В', intro: '', sort_order: 6 },
  { slug: 'gepatit-a', title: 'Гепатит А', intro: '', sort_order: 7 },
  { slug: 'vetryanaya-ospa', title: 'Ветряная оспа', intro: '', sort_order: 8 },
  { slug: 'meningokokkovaya-infektsiya', title: 'Менингококковая инфекция', intro: '', sort_order: 9 },
  { slug: 'rotavirusnaya-infektsiya', title: 'Ротавирусная инфекция', intro: '', sort_order: 10 },
  { slug: 'kor-parotit-krasnuha', title: 'Корь, паротит, краснуха', intro: '', sort_order: 11 },
  { slug: 'bryushnoy-tif-dizenteriya', title: 'Брюшной тиф и дизентерия', intro: '', sort_order: 12 },
  { slug: 'vpch', title: 'Вирус папилломы человека', intro: '', sort_order: 13 },
  { slug: 'beshenstvo', title: 'Бешенство', intro: '', sort_order: 14 },
  { slug: 'gerpeticheskaya-infektsiya', title: 'Герпетическая инфекция', intro: '', sort_order: 15 },
];

const items = {
  'kleshchevoy-encefalit': [
    { title: '«Энцевир» взрослым с 18 лет', dose_note: '1 ампула / 1 доза / 0,5 мл №10', manufacturer: 'АО «НПО «Микроген», Россия', price_note: '1100,00 ₽', in_stock: 1, sort_order: 1 },
    { title: '«Клещ-Э-Вак» дети с 1 года и взрослые', dose_note: '1 ампула / 1 доза / 0,25 мл №10 (детям от 1 года до 16 лет), 1 ампула / 1 доза / 0,5 мл (от 16 лет)', manufacturer: 'ФГУП «ФНЦИРИП им. М.П. Чумакова РАН», Россия', price_note: '1100,00 ₽', in_stock: 1, sort_order: 2 },
    { title: 'Вакцина клещевого энцефалита культуральная очищенная концентрированная инактивированная сухая, с 3 лет', dose_note: '1 ампула / 1 доза / 0,5 мл', manufacturer: 'ФГУП «ФНЦИРИП им. М.П. Чумакова РАН», Россия', price_note: '1100,00 ₽', in_stock: 1, sort_order: 3 },
  ],
  'pnevmokokkovaya-infektsiya': [
    { title: '«Пневмовакс 23» дети с 2 лет и взрослые', dose_note: '1 шприц / 1 доза / 0,5 мл', manufacturer: '«Мерк Шарп и Доум Корп», Нидерланды', price_note: '2800,00 ₽', in_stock: 1, sort_order: 1 },
    { title: '«Превенар 13» дети с 2 месяцев и взрослые', dose_note: '1 шприц / 1 доза / 0,5 мл', manufacturer: 'ООО НПО «Петровакс Фарм», Россия', price_note: '3200,00 ₽', in_stock: 1, sort_order: 2 },
  ],
  'difteriya-koklyush-stolbnyak': [
    { title: '«Адасель» (дифтерия, коклюш, столбняк) дети с 4 лет и взрослые до 64 лет', dose_note: 'суспензия для инъекций 0,5 мл (1 доза) во флаконе 2 мл №1', manufacturer: '«Санофи Пастер Лимитед», Канада', price_note: '3800,00 ₽', in_stock: 1, sort_order: 1 },
    { title: '«АДС-М» (дифтерия, столбняк) дети с 6 лет и взрослые', dose_note: '', manufacturer: 'Россия', price_note: '600,00 ₽', in_stock: 1, sort_order: 2 },
  ],
  'dkspv-gemofilnaya': [
    { title: '«Пентаксим» дети с 3 месяцев', dose_note: '1 шприц / 1 доза / 0,5 мл', manufacturer: '«Санофи Пастер С.А», Франция', price_note: '2700,00 ₽', in_stock: 1, sort_order: 1 },
  ],
  'dkspv-gepatit-v-gemofilnaya': [
    { title: '«Инфанрикс Гекса» от 2 месяцев до 2 лет', dose_note: '1 шприц / 1 доза / 0,5 мл', manufacturer: 'АО «Глаксо Смит Кляйн Трейдинг», Россия', price_note: 'Нет в наличии', in_stock: 0, sort_order: 1 },
  ],
  'gepatit-v': [
    { title: '«Регевак» детям с рождения и взрослым', dose_note: '1 ампула / 1 доза / 0,5 мл (дети 0–18 лет), 1 ампула / 1 доза / 1 мл (взрослые с 18 лет)', manufacturer: 'ЗАО НПК «Комбиотех», Россия', price_note: '700,00 ₽', in_stock: 1, sort_order: 1 },
  ],
  'gepatit-a': [
    { title: '«Альгавак М» дети с 3 лет', dose_note: '1 ампула / 1 доза / 0,5 мл (детская доза)', manufacturer: 'АО «Вектор-БиАльгам», Россия', price_note: '1300,00 ₽', in_stock: 1, sort_order: 1 },
    { title: '«Альгавак М» взрослые с 18 лет и старше', dose_note: '1 ампула / 1 доза / 1 мл', manufacturer: 'АО «Вектор-БиАльгам», Россия', price_note: '1300,00 ₽', in_stock: 1, sort_order: 2 },
    { title: '«Хаврикс 1440» с 16 лет', dose_note: '1 шприц / 1 доза / 1 мл', manufacturer: 'АО «Глаксо Смит Кляйн Трейдинг», Россия', price_note: 'Нет в наличии', in_stock: 0, sort_order: 3 },
    { title: '«Хаврикс 720» с 1 года до 16 лет', dose_note: '1 шприц / 1 доза / 0,5 мл', manufacturer: 'АО «Глаксо Смит Кляйн Трейдинг», Россия', price_note: 'Нет в наличии', in_stock: 0, sort_order: 4 },
  ],
  'vetryanaya-ospa': [
    { title: '«Варилрикс» дети с 12 месяцев и взрослые', dose_note: '1 флакон / 1 доза / 0,5 мл + шприц с растворителем', manufacturer: 'Бельгия', price_note: 'Нет в наличии', in_stock: 0, sort_order: 1 },
    { title: '«Варивакс» дети с 12 месяцев и взрослые', dose_note: '1 флакон / 1 доза / 0,5 мл', manufacturer: 'США', price_note: 'Нет в наличии', in_stock: 0, sort_order: 2 },
  ],
  'meningokokkovaya-infektsiya': [
    { title: '«Менактра» дети с 9 месяцев до 55 лет', dose_note: '1 флакон / 1 доза / 0,5 мл', manufacturer: 'Санофи Пастер Инк., США', price_note: '5000,00 ₽', in_stock: 1, sort_order: 1 },
    { title: '«МенКвадфи» — вакцина против менингококковых инфекций серогрупп A, C, W, Y, полисахаридная конъюгированная, дети с 12 месяцев и взрослые', dose_note: '', manufacturer: 'Sanofi Pasteur, Inc., США', price_note: '5000,00 ₽', in_stock: 1, sort_order: 2 },
  ],
  'rotavirusnaya-infektsiya': [
    { title: '«Ротатек» от 6 до 32 недель', dose_note: '1 туба / 1 доза / 2 мл', manufacturer: '«Мерк Шарп и Доум Корп», США', price_note: 'Нет в наличии', in_stock: 0, sort_order: 1 },
    { title: '«Рота-V-Эйд» от 6 до 32 недель', dose_note: '2,5 мл / доза / 1 доза', manufacturer: 'Индия', price_note: '2000,00 ₽', in_stock: 1, sort_order: 2 },
  ],
  'kor-parotit-krasnuha': [
    { title: '«Вактривир» — комбинированная вакцина против кори, краснухи и паротита культуральная живая', dose_note: '', manufacturer: 'АО «НПО «Микроген», Россия', price_note: '1200,00 ₽', in_stock: 1, sort_order: 1 },
    { title: '«Вакцина коревая» дети с 1 года, взрослые', dose_note: '1 ампула / 1 доза / 0,5 мл', manufacturer: 'Россия', price_note: '650,00 ₽', in_stock: 1, sort_order: 2 },
    { title: '«Вакцина против краснухи» дети с 1 года и взрослые', dose_note: '1 ампула / 1 доза / 0,5 мл', manufacturer: 'Россия', price_note: 'Нет в наличии', in_stock: 0, sort_order: 3 },
  ],
  'bryushnoy-tif-dizenteriya': [
    { title: '«Вианвак» — против брюшного тифа, дети с 3 лет и взрослые', dose_note: '1 ампула / 1 доза / 0,5 мл', manufacturer: 'ООО «Гритвак», Россия', price_note: '1200,00 ₽', in_stock: 1, sort_order: 1 },
    { title: '«Шигеллвак» — против дизентерии, дети с 3 лет и взрослые', dose_note: '1 ампула / 1 доза / 0,5 мл', manufacturer: 'ООО «Гритвак», Россия', price_note: '1200,00 ₽', in_stock: 1, sort_order: 2 },
  ],
  'vpch': [
    { title: '«Гардасил» с 9 до 45 лет', dose_note: '1 флакон / 1 доза / 0,5 мл', manufacturer: 'Нидерланды', price_note: '11 000,00 ₽', in_stock: 1, sort_order: 1 },
    { title: '«Церварикс» с 9 до 45 лет', dose_note: '', manufacturer: 'АО «Глаксо Смит Кляйн», Бельгия', price_note: 'Нет в наличии', in_stock: 0, sort_order: 2 },
  ],
  'beshenstvo': [
    { title: 'Вакцина антирабическая', dose_note: '1 доза / 1 мл', manufacturer: 'Россия', price_note: '1000,00 ₽', in_stock: 1, sort_order: 1 },
    { title: '«Кокав»', dose_note: '1 доза / 1 мл', manufacturer: 'Россия', price_note: '1000,00 ₽', in_stock: 1, sort_order: 2 },
  ],
  'gerpeticheskaya-infektsiya': [
    { title: '«Витагерпавак» взрослые с 18 лет', dose_note: 'флакон / 0,3 мл №5 (одна прививочная доза 0,2 мл)', manufacturer: 'ЗАО «Фирма «Витафарма», Россия', price_note: '2000,00 ₽', in_stock: 1, sort_order: 1 },
  ],
};

module.exports = { categories, items };
