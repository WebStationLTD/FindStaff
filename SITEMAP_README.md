# FindStaff Sitemap и Robots.txt

Този проект включва автоматично генерирани sitemap.xml и robots.txt файлове за SEO оптимизация.

## Файлове

### 1. Sitemap.xml
- **Локация**: `/sitemap.xml`
- **Тип**: Динамично генериран XML
- **Съдържание**: Всички страници, услуги, постове и членове на екипа
- **Обновяване**: Автоматично при всяко заявяване

### 2. Robots.txt
- **Локация**: `/robots.txt`
- **Тип**: Динамично генериран текст
- **Съдържание**: Правила за търсачките
- **Sitemap референции**: Включва линкове към sitemap файловете

### 3. Sitemap Index
- **Локация**: `/sitemap-index.xml`
- **Тип**: Индекс на всички sitemap файлове
- **Цел**: Организация на големи sitemap файлове

## Структура на Sitemap

### Статични страници
- `/` - Начална страница (priority: 1.0, changefreq: daily)
- `/about` - За нас (priority: 0.8, changefreq: weekly)
- `/services` - Услуги (priority: 0.9, changefreq: weekly)
- `/team` - Екип (priority: 0.8, changefreq: weekly)
- `/blog` - Блог (priority: 0.8, changefreq: daily)
- `/contact` - Контакти (priority: 0.7, changefreq: monthly)
- `/privacy-policy` - Политика за поверителност (priority: 0.3, changefreq: yearly)

### Динамични страници
- **Услуги**: `/services/[slug]` (priority: 0.8, changefreq: weekly)
- **Блог постове**: `/blog/[slug]` (priority: 0.6, changefreq: monthly)
- **Членове на екипа**: `/team/[slug]` (priority: 0.6, changefreq: monthly)

## Robots.txt Правила

### Разрешени
- Всички публични страници
- Статични ресурси

### Забранени
- `/api/` - API endpoints
- `/_next/` - Next.js системни файлове
- `/admin/` - Административни страници
- `/wp-admin/` - WordPress администрация
- `/wp-includes/` - WordPress системни файлове

### Crawl Delay
- **Crawl-delay**: 1 секунда между заявките

## Технически детайли

### API Routes
- `app/sitemap.xml/route.js` - Генерира sitemap.xml
- `app/robots.txt/route.js` - Генерира robots.txt
- `app/sitemap-index.xml/route.js` - Генерира sitemap index

### Helper функции
- `services/sitemap.js` - Функции за генериране на sitemap данни
- `services/index.js` - Централен експорт на всички функции

### Кеширане
- **Browser cache**: 1 час
- **CDN cache**: 24 часа
- **Revalidation**: При всяко заявяване

## Използване

### В търсачките
1. Добавете в Google Search Console
2. Добавете в Bing Webmaster Tools
3. Проверете валидността на XML

### В кода
```javascript
import { getAllSitemapUrls, generateSitemapXML } from '../services/sitemap';

// Получаване на всички URL-и
const urls = await getAllSitemapUrls();

// Генериране на XML
const xml = generateSitemapXML(baseUrl, urls);
```

## Поддръжка

### Добавяне на нови страници
1. Добавете в `services/sitemap.js` в `staticPages` масива
2. Задайте правилните priority и changefreq стойности

### Добавяне на нови типове съдържание
1. Създайте нов API route
2. Добавете в `getAllSitemapUrls()` функцията
3. Обновете `generateSitemapXML()` функцията

### Тестване
- Проверете `/sitemap.xml` в браузъра
- Проверете `/robots.txt` в браузъра
- Валидирайте XML с онлайн инструменти

## SEO Предимства

1. **Автоматично обновяване** - Няма нужда от ръчно редактиране
2. **Динамично генериране** - Включва всички нови страници
3. **Правилни приоритети** - Важните страници имат по-висок приоритет
4. **Оптимизирани честоти** - Рационални интервали за обновяване
5. **Кеширане** - Бързо зареждане за търсачките

## Забележки

- Sitemap се генерира динамично при всяко заявяване
- При грешка се връща fallback sitemap само със статичните страници
- Всички URL-и се генерират автоматично според текущия домейн
- Поддържа се както HTTP, така и HTTPS протоколи
