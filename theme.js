// theme.js — 라이트/다크 테마 공통 토글

function applyAppTheme(isLight) {
  document.body.classList.toggle('light', isLight);
  const btn = document.getElementById('themeToggleBtn');
  if (btn) btn.textContent = isLight ? '🌙 다크' : '☀️ 라이트';
}

function toggleAppTheme() {
  const willBeLight = !document.body.classList.contains('light');
  localStorage.setItem('app_theme', willBeLight ? 'light' : 'dark');
  applyAppTheme(willBeLight);
}

document.addEventListener('DOMContentLoaded', function () {
  applyAppTheme(localStorage.getItem('app_theme') === 'light');
});
