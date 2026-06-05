// ==========================================================================
// 主题切换模块 - 新增于2026-06-05
// ==========================================================================

(function(){
  window.toggleTheme = function() {
    var root = document.documentElement;
    var isWarm = root.getAttribute('data-theme') === 'warm';
    if (isWarm) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      var btn = document.getElementById('themeToggleBtn');
      if (btn) btn.textContent = '🌙';
    } else {
      root.setAttribute('data-theme', 'warm');
      localStorage.setItem('theme', 'warm');
      var btn = document.getElementById('themeToggleBtn');
      if (btn) btn.textContent = '☀️';
    }
  };
  
  // 加载保存的主题
  (function(){ 
    var t = localStorage.getItem('theme'); 
    if(t==='warm') {
      document.documentElement.setAttribute('data-theme','warm');
    }
  })();
})();