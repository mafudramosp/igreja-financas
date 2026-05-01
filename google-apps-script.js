// ============================================================
//  Google Apps Script — Gestão Financeira Igreja
//  Cole este código em: script.google.com → Novo Projeto
// ============================================================

// ID da planilha (pegue da URL da sua planilha Google)
const SHEET_ID = "COLE_O_ID_DA_SUA_PLANILHA_AQUI";

function doGet(e) {
  const action = e.parameter.action;
  const callback = e.parameter.callback || "callback";

  if (action === "save") {
    return salvar(e, callback);
  } else if (action === "load") {
    return carregar(callback);
  }

  return jsonpResponse(callback, { success: false, error: "Ação inválida" });
}

function salvar(e, callback) {
  try {
    const rawData = e.parameter.data;
    if (!rawData) {
      return jsonpResponse(callback, { success: false, error: "Sem dados" });
    }

    const data = JSON.parse(decodeURIComponent(rawData));
    const ss = SpreadsheetApp.openById(SHEET_ID);

    // ── Aba ENTRADAS ──
    let shEnt = ss.getSheetByName("Entradas");
    if (!shEnt) {
      shEnt = ss.insertSheet("Entradas");
    }
    shEnt.clear();
    shEnt.appendRow(["ID", "Tipo", "Valor", "Descrição", "Dia", "Mês", "Ano"]);
    if (data.ent && data.ent.length > 0) {
      const rows = data.ent.map(e => [e.id, e.tipo, e.valor, e.descricao, e.dia, e.mes, e.ano]);
      shEnt.getRange(2, 1, rows.length, 7).setValues(rows);
    }

    // ── Aba GASTOS ──
    let shGas = ss.getSheetByName("Gastos");
    if (!shGas) {
      shGas = ss.insertSheet("Gastos");
    }
    shGas.clear();
    shGas.appendRow(["ID", "Categoria", "Valor", "Descrição", "Dia", "Mês", "Ano"]);
    if (data.gas && data.gas.length > 0) {
      const rows = data.gas.map(g => [g.id, g.categoria, g.valor, g.descricao, g.dia, g.mes, g.ano]);
      shGas.getRange(2, 1, rows.length, 7).setValues(rows);
    }

    // ── Aba BACKUP (JSON completo) ──
    let shBkp = ss.getSheetByName("Backup");
    if (!shBkp) {
      shBkp = ss.insertSheet("Backup");
    }
    shBkp.clear();
    shBkp.appendRow(["Data", "JSON"]);
    shBkp.appendRow([new Date().toISOString(), JSON.stringify(data)]);

    return jsonpResponse(callback, { success: true, message: "Dados salvos com sucesso" });

  } catch (error) {
    return jsonpResponse(callback, { success: false, error: error.message });
  }
}

function carregar(callback) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const shBkp = ss.getSheetByName("Backup");

    if (!shBkp || shBkp.getLastRow() < 2) {
      return jsonpResponse(callback, { success: false, error: "Sem dados" });
    }

    const json = shBkp.getRange(2, 2).getValue();
    const data = JSON.parse(json);

    return jsonpResponse(callback, { success: true, data: data });

  } catch (error) {
    return jsonpResponse(callback, { success: false, error: error.message });
  }
}

function jsonpResponse(callback, data) {
  const output = callback + "(" + JSON.stringify(data) + ")";
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

// ============================================================
//  INSTRUÇÕES DE CONFIGURAÇÃO:
//
//  1. Crie uma planilha nova no Google Sheets
//     → Copie o ID da URL (entre /d/ e /edit)
//     → Cole no SHEET_ID acima
//
//  2. Vá em script.google.com → Novo Projeto
//     → Cole todo este código
//     → Salve (Ctrl+S)
//
//  3. Clique em "Implantar" → "Nova implantação"
//     → Tipo: "App da Web"
//     → Executar como: "Eu"
//     → Quem tem acesso: "Qualquer pessoa"
//     → Clique em "Implantar"
//     → Autorize o acesso quando solicitado
//     → Copie a URL gerada
//
//  4. Abra o index.html do seu site
//     → Encontre: const SCRIPT_URL = "";
//     → Cole a URL entre as aspas
//     → Salve e faça push para o GitHub
//
//  5. Pronto! Os dados serão sincronizados com a planilha.
// ============================================================
