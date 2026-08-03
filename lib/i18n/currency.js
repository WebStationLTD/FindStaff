/**
 * Display-layer BGN → EUR conversion for content HTML.
 * Official fixed rate (Bulgaria euro adoption): 1 EUR = 1.95583 BGN.
 */

export const BGN_PER_EUR = 1.95583;

export function bgnToEur(amountBgn) {
  if (!Number.isFinite(amountBgn)) return null;
  return Math.round(amountBgn / BGN_PER_EUR);
}

/** Locale-appropriate EUR display (whole euros). */
export function formatEur(amountEur, locale = "bg") {
  if (!Number.isFinite(amountEur)) return "";
  const n = new Intl.NumberFormat(locale === "it" ? "it-IT" : "bg-BG", {
    maximumFractionDigits: 0,
  }).format(amountEur);
  // Consistent suffix form for both locales
  return `${n} €`;
}

function parseAmount(raw) {
  if (raw == null) return null;
  const cleaned = String(raw)
    .replace(/\s+/g, "")
    .replace(",", ".");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function convertAmountToken(raw, locale) {
  const bgn = parseAmount(raw);
  if (bgn == null) return null;
  return formatEur(bgnToEur(bgn), locale);
}

/**
 * Convert BGN-denominated prices in HTML to EUR for display.
 * - Explicit "100 лв." / "50 BGN" / "BGN 100" patterns
 * - Salary table columns headed "Заплата (лв)" / "Stipendio (BGN)"
 * Leaves non-price numbers (percentages, counts, years) untouched.
 */
export function convertBgnPricesInHtml(html, locale = "bg") {
  if (!html || typeof html !== "string") return html;
  if (!/(?:лв\.?|лева|\bBGN\b)/i.test(html)) return html;

  let out = html;

  // Explicit amount + currency (and currency + amount).
  // Avoid \b after "лв." — the period is non-word, so \b fails before </td>.
  const amount = String.raw`(\d{1,3}(?:[\s\u00a0]\d{3})*(?:[.,]\d+)?|\d+(?:[.,]\d+)?)`;
  const afterCurrency = String.raw`(?=\s|<|<\/|$|[.,;:!?)\]\}])`;

  out = out.replace(
    new RegExp(`${amount}\\s*(?:лв\\.?|лева)${afterCurrency}`, "gi"),
    (full, num) => convertAmountToken(num, locale) || full
  );
  out = out.replace(
    new RegExp(`${amount}\\s*BGN${afterCurrency}`, "gi"),
    (full, num) => convertAmountToken(num, locale) || full
  );
  out = out.replace(
    new RegExp(`(?:^|[^\\w])BGN\\s*${amount}`, "gi"),
    (full, num) => {
      const eur = convertAmountToken(num, locale);
      if (!eur) return full;
      return full.replace(/BGN\s*[\d\s.,]+/i, eur);
    }
  );
  out = out.replace(
    new RegExp(`(?:лв\\.?|лева)\\s*${amount}${afterCurrency}`, "gi"),
    (full, num) => convertAmountToken(num, locale) || full
  );

  // Currency-only labels in headers / parentheses
  out = out.replace(/Заплата\s*\(\s*лв\.?\s*\)/gi, "Заплата (€)");
  out = out.replace(/Stipendio\s*\(\s*BGN\s*\)/gi, "Stipendio (€)");
  out = out.replace(/\(\s*лв\.?\s*\)/gi, "(€)");
  out = out.replace(/\(\s*BGN\s*\)/gi, "(€)");

  // Salary tables: convert numeric cells in the salary column
  out = out.replace(/<table\b[\s\S]*?<\/table>/gi, (table) =>
    convertSalaryTable(table, locale)
  );

  return out;
}

function convertSalaryTable(tableHtml, locale) {
  // Only touch tables that still mention BGN/лв in headers, or already
  // converted (€) salary headers with bare BGN-scale numbers from WP.
  const headerHasSalaryCurrency =
    /Заплата\s*\(\s*(?:лв\.?|€|EUR)\s*\)|Stipendio\s*\(\s*(?:BGN|€|EUR)\s*\)/i.test(
      tableHtml
    );
  if (!headerHasSalaryCurrency && !/(?:лв\.?|\bBGN\b)/i.test(tableHtml)) {
    return tableHtml;
  }

  // Parse rows loosely via <tr>
  const rows = [...tableHtml.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];
  if (!rows.length) return tableHtml;

  let salaryCol = -1;
  const rowCells = rows.map((rowMatch) => {
    const inner = rowMatch[1];
    const cells = [
      ...inner.matchAll(/<(t[hd])\b([^>]*)>([\s\S]*?)<\/\1>/gi),
    ].map((m) => ({
      tag: m[1],
      attrs: m[2] || "",
      html: m[3],
      full: m[0],
    }));
    return { fullRow: rowMatch[0], cells };
  });

  // Find salary column from first row that looks like a header
  for (const row of rowCells) {
    row.cells.forEach((cell, idx) => {
      const text = cell.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (
        /Заплата/i.test(text) ||
        /Stipendio/i.test(text) ||
        (/^salary$/i.test(text) && /€|EUR|лв|BGN/i.test(text))
      ) {
        if (/лв|BGN|€|EUR/i.test(text) || /Заплата|Stipendio/i.test(text)) {
          salaryCol = idx;
        }
      }
    });
    if (salaryCol >= 0) break;
  }

  if (salaryCol < 0) return tableHtml;

  let result = tableHtml;
  for (const row of rowCells) {
    if (salaryCol >= row.cells.length) continue;
    const cell = row.cells[salaryCol];
    const text = cell.html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

    // Header label cleanup
    if (/Заплата|Stipendio|лв|BGN/i.test(text) && !/^\d/.test(text)) {
      const nextHtml = cell.html
        .replace(/Заплата\s*\(\s*лв\.?\s*\)/gi, "Заплата (€)")
        .replace(/Stipendio\s*\(\s*BGN\s*\)/gi, "Stipendio (€)")
        .replace(/\(\s*лв\.?\s*\)/gi, "(€)")
        .replace(/\(\s*BGN\s*\)/gi, "(€)");
      if (nextHtml !== cell.html) {
        const nextCell = `<${cell.tag}${cell.attrs}>${nextHtml}</${cell.tag}>`;
        result = result.replace(cell.full, nextCell);
      }
      continue;
    }

    // Bare salary number (typical WP table body cell)
    if (/^\d{3,5}([.,]\d+)?$/.test(text)) {
      const eur = convertAmountToken(text, locale);
      if (!eur) continue;
      const nextCell = `<${cell.tag}${cell.attrs}>${eur}</${cell.tag}>`;
      result = result.replace(cell.full, nextCell);
    }
  }

  return result;
}
