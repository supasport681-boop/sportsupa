document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('click', () => {
    const link = box.getAttribute('data-link');
    navigator.clipboard.writeText(link).then(() => {
      box.classList.add('clicked');
      box.style.backgroundColor = 'red';  
    });
  });
});

function filterBoxes(league, element) {
  document.querySelectorAll('.league-bar span').forEach(span => {
    span.classList.remove('active');
  });
  element.classList.add('active');

  document.querySelectorAll('.box').forEach(box => {
    const matchLeague = box.getAttribute('data-league');
    box.classList.toggle('hidden', matchLeague !== league);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggle = document.getElementById('themeSwitcher');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light');
    body.classList.remove('dark');
    toggle.checked = true;
  } else {
    body.classList.add('dark');
    body.classList.remove('light');
    toggle.checked = false;
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      body.classList.add('light');
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.add('dark');
      body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  });

  const filterButtons = document.querySelectorAll('.league-bar span');
  filterButtons.forEach(btn => btn.classList.remove('active'));

  const nflButton = Array.from(filterButtons).find(btn =>
    btn.textContent.trim().toUpperCase() === 'NFL'
  );

  if (nflButton) {
    filterBoxes('NFL', nflButton); 
  } else {
    document.querySelectorAll('.box').forEach(box => box.classList.remove('hidden'));
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const league = btn.textContent.trim();
      filterBoxes(league, btn);
    });
  });
});
