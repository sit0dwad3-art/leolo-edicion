// PAGE NAVIGATION
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}

// PARTICLES
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    container.appendChild(p);
  }
}

// CALENDAR
let calYear = 2025, calMonth = 2;
const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const days = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
const eventDays = { '2025-2': [15, 28], '2025-3': [12], '2025-4': [3] };

function renderCalendar() {
  document.getElementById('calMonthTitle').textContent = months[calMonth] + ' ' + calYear;
  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';
  days.forEach(d => {
    const h = document.createElement('div');
    h.className = 'cal-day-header'; h.textContent = d;
    grid.appendChild(h);
  });
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const key = calYear + '-' + calMonth;
  const evDays = eventDays[key] || [];
  for (let i = 0; i < offset; i++) {
    const e = document.createElement('div'); e.className = 'cal-day empty'; grid.appendChild(e);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement('div');
    el.className = 'cal-day';
    el.textContent = d;
    if (evDays.includes(d)) el.classList.add('has-event');
    if (calYear === 2025 && calMonth === 2 && d === 1) el.classList.add('today');
    el.onclick = () => { if (evDays.includes(d)) openModal(); };
    grid.appendChild(el);
  }
}

function changeMonth(dir) {
  calMonth += dir;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
}

// MODAL
function openModal() {
  document.getElementById('registerModal').classList.add('open');
}

function closeModal() {
  document.getElementById('registerModal').classList.remove('open');
}

function confirmRegister() {
  closeModal();
  alert('¡Perfecto! Tu plaza está reservada. Te llegará un correo de confirmación. ✨');
}

// EMOTION TAGS
function toggleEmotion(el) {
  el.classList.toggle('selected');
}

// SUBMIT COMMENT
function submitComment() {
  alert('¡Gracias por compartir tu experiencia! Tu testimonio será revisado y publicado pronto. 🙏');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  renderCalendar();
  
  // Modal close on overlay click
  document.getElementById('registerModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
  
  // Filter tags click handling
  document.querySelectorAll('.filter-tag').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
});