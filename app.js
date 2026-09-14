const { profile, experience, education, skills, contact, footer } = window.resumeData;

const arrowIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h13M13 6l6 6-6 6"/></svg>';
const plusIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/></svg>';
const contactIcons = {
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M7 3h3l2 5-2.2 1.7a15 15 0 0 0 4.5 4.5L16 12l5 2v3c0 1.1-.9 2-2 2C10.7 19 5 13.3 5 5c0-1.1.9-2 2-2Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>'
};

const sectionHeading = (number, title, note) => `<div class="section-heading"><div><span class="section-number">${number}</span><h2>${title}</h2></div><p class="section-note">${note}</p></div>`;
const tags = (items) => items.map((tag) => `<span class="tag">${tag}</span>`).join('');

function renderResume() {
  document.title = `${profile.name} · ${profile.role}`;
  document.querySelector('meta[name="description"]').content = `${profile.name}的个人简历 - ${profile.role}`;
  document.querySelector('.availability').innerHTML = `<i></i>${profile.availability}`;

  document.getElementById('top').innerHTML = `
    <section class="shell hero">
      <div class="reveal">
        <div class="eyebrow">${profile.eyebrow}</div>
        <h1>${profile.headline}<em>${profile.headlineAccent}</em></h1>
        <p class="hero-copy">${profile.intro}</p>
        <div class="hero-links">
          <a class="button primary" href="#contact">联系我 ${arrowIcon}</a>
          <a class="button" href="#experience">查看经历 ${plusIcon}</a>
        </div>
      </div>
      <div class="portrait reveal" aria-label="${profile.name}的个人头像占位图">
        <div class="portrait-card"></div>
        <span class="portrait-label">${profile.portraitLabel}</span>
      </div>
    </section>
    <section class="shell section reveal" id="experience">
      ${sectionHeading('01 / EXPERIENCE', experience.title, experience.note)}
      <div class="timeline">${experience.items.map((item) => `
        <article class="timeline-item"><div class="timeline-date">${item.date}</div><div class="timeline-content"><h3>${item.title}</h3><span class="company">${item.company}</span><p>${item.description}</p><div class="tags">${tags(item.tags)}</div></div></article>`).join('')}
      </div>
    </section>
    <section class="shell section reveal" id="education">
      ${sectionHeading('02 / EDUCATION', education.title, education.note)}
      <div class="education-grid">${education.items.map((item) => `<article class="edu-card"><small>${item.date}</small><h3>${item.school}</h3><p>${item.detail}</p></article>`).join('')}</div>
    </section>
    <section class="shell section reveal" id="skills">
      ${sectionHeading('03 / SKILLS', skills.title, skills.note)}
      <div class="skills-layout">
        <div class="skill-intro"><p>${skills.intro}</p><div class="skill-filter" role="group" aria-label="技能筛选">${skills.filters.map((filter, index) => `<button class="filter${index === 0 ? ' active' : ''}" data-filter="${filter.value}">${filter.label}</button>`).join('')}</div></div>
        <div class="skill-list">${skills.items.map((item) => `<div class="skill-item" data-type="${item.type}"><div class="skill-top"><span>${item.name}</span><span>${item.level}%</span></div><div class="meter"><i style="--level:${item.level}%"></i></div></div>`).join('')}</div>
      </div>
    </section>
    <section class="shell app-embed reveal" id="app">
      <div class="app-embed-head"><div><span class="section-number">04 / APP</span><h2 class="app-embed-title">把饭，放进嘴里。</h2></div><p class="app-embed-note">这是 Gao Ke 的 APP 产品设计页面，保留在当前作品集布局中。</p></div>
      <iframe class="app-frame" src="app.html" title="Gao Ke APP 产品设计页面" loading="lazy"></iframe>
    </section>
    <section class="shell section contact reveal" id="contact">
      <div><div class="eyebrow">${contact.eyebrow}</div><h2>${contact.title}<br><em>${contact.titleAccent}</em></h2><p class="contact-copy">${contact.description}</p></div>
      <div class="contact-list">${contact.links.map((link) => `<a class="contact-link" href="${link.href}"${link.external ? ' target="_blank" rel="noreferrer"' : ''}>${contactIcons[link.type]}${link.label}</a>`).join('')}</div>
    </section>`;
  document.getElementById('footer').innerHTML = `<span>${footer.copyright}</span><span>${footer.note}</span>`;
}

function initInteractions() {
  const progressBar = document.getElementById('progressBar');
  const themeToggle = document.getElementById('themeToggle');
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${scrollable ? (window.scrollY / scrollable) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☼' : '◐';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: .14 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  document.querySelectorAll('.filter').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      document.querySelectorAll('.skill-item').forEach((item) => { item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.type !== filter); });
    });
  });
}

renderResume();
initInteractions();
