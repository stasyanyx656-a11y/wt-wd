const fs = require('fs');
const path = require('path');

// ANSI Escape Codes for coloring output
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m"
};

console.log(`${colors.blue}=== Запуск автоматизованого аудиту коду (Лабораторна № 6) ===${colors.reset}\n`);

// Шляхи до файлів Лабораторної 18
const htmlPath = path.resolve(__dirname, '../lab18/index_optimized.html');
const cssPath = path.resolve(__dirname, '../lab18/styles_optimized.css');

let errors = 0;
let warnings = 0;
let passed = 0;

function assertCheck(condition, successMsg, errorMsg) {
    if (condition) {
        console.log(`${colors.green}✅ PASSED: ${successMsg}${colors.reset}`);
        passed++;
    } else {
        console.log(`${colors.red}❌ FAILED: ${errorMsg}${colors.reset}`);
        errors++;
    }
}

function warnCheck(condition, successMsg, warningMsg) {
    if (condition) {
        console.log(`${colors.green}✅ PASSED: ${successMsg}${colors.reset}`);
        passed++;
    } else {
        console.log(`${colors.yellow}⚠️ WARNING: ${warningMsg}${colors.reset}`);
        warnings++;
    }
}

try {
    // === АУДИТ HTML ===
    console.log(`\n${colors.blue}--- Перевірка HTML файлу (${htmlPath}) ---${colors.reset}`);
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    assertCheck(
        htmlContent.toLowerCase().includes('<!doctype html>'),
        "Документ містить валідний <!DOCTYPE html>",
        "Відсутній <!DOCTYPE html>"
    );

    assertCheck(
        /<html[^>]*lang=["']uk["'][^>]*>/i.test(htmlContent),
        "Використовується правильна мова документа (lang='uk')",
        "Атрибут lang='uk' відсутній у тегу <html>"
    );

    const h1Matches = htmlContent.match(/<h1[^>]*>.*?<\/h1>/gi) || [];
    assertCheck(
        h1Matches.length === 1,
        "На сторінці присутній рівно один заголовок <h1>",
        `Знайдено ${h1Matches.length} заголовків <h1> (має бути рівно один)`
    );

    const imgMatches = htmlContent.match(/<img[^>]+>/gi) || [];
    let imagesWithoutAlt = 0;
    imgMatches.forEach(img => {
        if (!/alt=["'][^"']*["']/i.test(img)) {
            imagesWithoutAlt++;
        }
    });
    assertCheck(
        imagesWithoutAlt === 0,
        "Усі зображення мають атрибут alt",
        `Знайдено ${imagesWithoutAlt} зображень без атрибута alt`
    );

    warnCheck(
        htmlContent.includes('<!--'),
        "Код містить HTML коментарі (добра практика структурування)",
        "Не знайдено коментарів у коді"
    );

    // === АУДИТ CSS ===
    console.log(`\n${colors.blue}--- Перевірка CSS файлу (${cssPath}) ---${colors.reset}`);
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    assertCheck(
        cssContent.length > 0,
        "CSS файл успішно завантажено та він не порожній",
        "CSS файл порожній"
    );

    const importantMatches = cssContent.match(/!important/g) || [];
    warnCheck(
        importantMatches.length === 0,
        "Не використовується !important (чудова практика!)",
        `Знайдено ${importantMatches.length} використань !important`
    );

} catch (err) {
    console.error(`${colors.red}❌ КРИТИЧНА ПОМИЛКА: Не вдалося прочитати файли проекту. Перевірте, чи існують файли lab18/index_optimized.html та lab18/styles_optimized.css${colors.reset}`);
    console.error(err);
    process.exit(1);
}

// === ПІДСУМКИ ===
console.log(`\n${colors.blue}=== Підсумок аудиту ===${colors.reset}`);
console.log(`${colors.green}Успішних перевірок: ${passed}${colors.reset}`);
console.log(`${colors.yellow}Попереджень: ${warnings}${colors.reset}`);
console.log(`${colors.red}Помилок: ${errors}${colors.reset}`);

if (errors > 0) {
    console.log(`\n${colors.red}Аудит провалено. Виправте помилки та запустіть знову.${colors.reset}`);
    process.exit(1);
} else {
    console.log(`\n${colors.green}🎉 АУДИТ УСПІШНО ПРОЙДЕНО! Код відповідає високим стандартам якості. 🎉${colors.reset}`);
}
