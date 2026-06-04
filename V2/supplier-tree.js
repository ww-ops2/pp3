// ==========================================================================
// 供应商树形结构展示模块 v3
// 实现：一级层级（供应类型） → 二级层级（供应商名称）
// ==========================================================================

window.TreeSupplierManager = (function() {
  'use strict';
  
  function groupSuppliersByCategory() {
    var groups = {};
    suppliers.forEach(function(s) {
      var cat = s.category || '其他';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(s);
    });
    return groups;
  }

  function renderTreeSuppliers() {
    var groups = groupSuppliersByCategory();
    var allCats = Object.keys(groups).sort();
    var html = '<div style="margin-bottom:12px;">';
    html += '<button id="supplierTableViewBtn" class="btn btn-sm" style="font-size:12px;" onclick="window.TreeSupplierManager.switchToTable()">列表视图</button> ';
    html += '<button id="supplierTreeViewBtn" class="btn btn-sm btn-accent" style="font-size:12px;" onclick="window.TreeSupplierManager.switchToTree()">树形视图</button>';
    html += '</div>';
    html += '<div id="supplierTreeContainer" style="max-height:500px;overflow-y:auto;">';
    allCats.forEach(function(cat) {
      var catSuppliers = groups[cat];
      var catTotalPayable = 0, catTotalPaid = 0;
      catSuppliers.forEach(function(s) {
        catTotalPayable += s.totalPayable || 0;
        catTotalPaid += s.totalPaid || 0;
      });
      html += '<div class="supplier-category-row" style="border-bottom:1px solid var(--border);margin-bottom:4px;">';
      html += '<div class="supplier-category-header" style="display:flex;align-items:center;gap:8px;padding:8px;background:var(--bg-secondary);border-radius:6px;cursor:pointer;" onclick="window.TreeSupplierManager.toggleCategory(\\'' + cat + '\\')">';
      html += '<span class="toggle-icon" id="toggle_' + cat + '" style="font-size:14px;">+</span>';
      html += '<span style="font-weight:600;font-size:14px;">' + escHtml(cat) + '</span>';
      html += '<span style="font-size:12px;color:var(--text-muted);">(' + catSuppliers.length + '个供应商)</span>';
      html += '<span style="flex:1;text-align:right;font-size:12px;color:var(--danger);">应付: ' + fmt(catTotalPayable) + '</span>';
      html += '<span style="font-size:12px;color:var(--success);margin-left:8px;">已付: ' + fmt(catTotalPaid) + '</span>';
      html += '</div>';
      html += '<div id="supplierList_' + cat + '" class="supplier-child-list" style="display:none;margin-left:24px;padding:8px 0;">';
      catSuppliers.forEach(function(s) {
        var unpaid = (s.totalPayable || 0) - (s.totalPaid || 0);
        var pct = s.totalPayable ? fmtPct(s.totalPaid || 0, s.totalPayable) : '0%';
        html += '<div class="supplier-item-row" style="display:flex;align-items:center;gap:8px;padding:6px 12px;border-radius:4px;cursor:pointer;" onclick="window._selectSupplier(\\'' + s.id + '\\')" data-sid="' + s.id + '">';
        html += '<span style="font-weight:500;">' + escHtml(s.name) + '</span>';
        html += '<span style="font-size:11px;color:var(--text-muted);">' + (s.projects ? s.projects.size + '个团期' : '0个团期') + '</span>';
        html += '<span class="amount-cost" style="margin-left:auto;font-size:12px;">' + fmt(s.totalPayable || 0) + '</span>';
        html += '<span style="font-size:11px;color:var(--success);margin-left:6px;">' + fmt(s.totalPaid || 0) + '</span>';
        html += '<span class="status-chip" style="font-size:10px;padding:2px 6px;margin-left:6px;">' + pct + '</span>';
        html += '</div>';
      });
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';
    document.getElementById('supplierTable').innerHTML = html;
  }

  function toggleCategory(cat) {
    var list = document.getElementById('supplierList_' + cat);
    var icon = document.getElementById('toggle_' + cat);
    if (list && icon) {
      if (list.style.display === 'none') {
        list.style.display = 'block';
        icon.textContent = '−';
      } else {
        list.style.display = 'none';
        icon.textContent = '+';
      }
    }
  }

  function switchToTable() {
    if (typeof renderSuppliers === 'function') renderSuppliers();
  }

  function switchToTree() {
    renderTreeSuppliers();
  }

  return {
    groupSuppliersByCategory: groupSuppliersByCategory,
    renderTreeSuppliers: renderTreeSuppliers,
    toggleCategory: toggleCategory,
    switchToTable: switchToTable,
    switchToTree: switchToTree
  };
})();