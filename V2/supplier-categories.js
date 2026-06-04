// ==========================================================================
// 供应商分类管理模块 v2
// ==========================================================================

function getAllSupplierCategories() {
  var cats = [];
  var seen = {};
  suppliers.forEach(function(s) {
    if (s.category && !seen[s.category]) {
      cats.push(s.category);
      seen[s.category] = true;
    }
  });
  return cats;
}

window._openCategoryModal = function() {
  var currentCats = getAllSupplierCategories();
  var catOptions = currentCats.map(function(c) {
    return '<div style=""display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border-light);"">' +
      '<span style=""flex:1;"">' + escHtml(c) + '</span>' +
      '<button onclick=""window._renameCategory('"'"'' + c + '"'"')" style=""padding:4px 8px;font-size:11px;"">重命名</button>' +
      '<button onclick=""window._deleteCategory('"'"'' + c + '"'"')" style=""background:var(--danger-bg);color:var(--danger);padding:4px 8px;font-size:11px;"">删除</button>' +
      '</div>';
  }).join('');
  var html = '<button class=""close-btn"" onclick=""window.closeModal()"">✕</button>';
  html += '<h3>供应商分类管理</h3>';
  html += '<div style=""margin-bottom:12px;"">';
  html += '<input type=""text"" id=""newCategoryInput"" placeholder=""输入新分类名称"" style=""padding:6px 10px;width:200px;font-size:12px;"">';
  html += '<button class=""btn btn-accent btn-sm"" onclick=""window._addCategory()"">+ 添加</button>';
  html += '</div>';
  html += '<div style=""max-height:300px;overflow-y:auto;"">' + catOptions + '</div>';
  html += '<div class=""modal-save-bar""><button class=""btn btn-outline"" onclick=""window.closeModal()"">关闭</button></div>';
  document.getElementById('modalBox').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('show');
};

window._addCategory = function() {
  var input = document.getElementById('newCategoryInput');
  var cat = input.value.trim();
  if (!cat) return;
  var exists = suppliers.find(function(s) { return s.category === cat; });
  if (exists) { showToast('分类已存在'); return; }
  suppliers.forEach(function(s) { if (!s.category) s.category = cat; });
  saveSuppliers();
  renderSuppliers();
  input.value = '';
  window.closeModal();
  showToast('✅ 已添加分类: ' + cat);
};

window._renameCategory = function(oldCat) {
  var newCat = prompt('输入新分类名称:', oldCat);
  if (!newCat || !newCat.trim()) return;
  suppliers.forEach(function(s) { if (s.category === oldCat) s.category = newCat.trim(); });
  saveSuppliers();
  renderSuppliers();
  showToast('✅ 已重命名: ' + oldCat + ' → ' + newCat);
};

window._deleteCategory = function(cat) {
  if (!confirm('确定删除分类 ""' + cat + '""？所有属于该分类的供应商将移动到""其他""')) return;
  suppliers.forEach(function(s) { if (s.category === cat) s.category = '其他'; });
  saveSuppliers();
  renderSuppliers();
  showToast('✅ 已删除分类: ' + cat);
};

window.closeModal = function() {
  var overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.remove('show');
};