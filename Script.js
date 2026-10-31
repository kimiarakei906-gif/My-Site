 // ============================================================
//  محتوای صفحه از همین‌جا ساخته می‌شود. فقط این دو آرایه را عوض کن.
//
//  status مهارت‌ها:  "advanced" = پیشرفته  |  "intermediate" = متوسط  |  "learning" = در حال یادگیری
//  وضعیت‌ها حدس اولیه‌اند؛ طبق واقعیت خودت درستشان کن.
// ============================================================

const skills = [
  { icon: "</>", title: "HTML",       status: "advanced",     text: "ساختار صفحه‌ها و محتوا را می‌چینم." },
  { icon: "{ }", title: "CSS",        status: "advanced",     text: "رنگ، فونت و چیدمان صفحه را طراحی می‌کنم." },
  { icon: "JS",  title: "JavaScript", status: "intermediate", text: "صفحه‌ها را زنده و تعاملی می‌کنم." },
  { icon: "B",   title: "Bootstrap",  status: "intermediate", text: "چیدمان‌های ریسپانسیو را سریع می‌سازم." },
  { icon: "WP",  title: "WordPress",  status: "advanced",     text: "سایت را با قالب و افزونه راه می‌اندازم." },
  { icon: "N",   title: "Node.js",    status: "learning", text: "نصبش کردم و تازه شروع کرده‌ام." },
];

// url اختیاری است: اگر بگذاری، کارت پروژه لینک می‌شود.
const projects = [
  { title: "رد استور",                  tech: "در دست ساخت", label: "Red Store" },
  { title: "کیمی بیوتی (در حال تکمیل)", tech: "WordPress",   label: "kimibeauty.ir", url: "https://kimibeauty.ir" },
  { title: "پروژه‌ی سوم",   tech: "به‌زودی",       label: "Soon" },
];

const STATUS_LABEL = { advanced: "پیشرفته", intermediate: "متوسط", learning: "در حال یادگیری" };

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// ---------- کارت‌های مهارت ----------
const skillGrid = document.getElementById("skill-grid");
skills.forEach((s) => {
  const card = el("article", "skill card");
  card.append(
    el("div", "icon", s.icon),
    el("h3", "", s.title),
    el("p", "", s.text),
    el("span", "badge " + s.status, STATUS_LABEL[s.status] ?? s.status)
  );
  skillGrid.append(card);
});

// ---------- کارت‌های پروژه ----------
const projectGrid = document.getElementById("project-grid");
projects.forEach((p) => {
  const card = el("article", "project card");
  const thumb = el("div", "thumb");
  thumb.append(el("span", "", p.label));
  const body = el("div", "body");
  body.append(el("h3", "", p.title), el("p", "", p.tech));
  card.append(thumb, body);

  if (p.url) {
    const link = el("a", "project-link");
    link.href = p.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", p.title + " (باز شدن در تب جدید)");
    link.append(card);
    projectGrid.append(link);
  } else {
    projectGrid.append(card);
  }
});

// ---------- منوی موبایل ----------
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// ---------- لینک فعال منو هنگام اسکرول ----------
const links = [...menu.querySelectorAll("a:not(.btn)")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href")));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => s && observer.observe(s));

// ---------- سال فوتر ----------
document.getElementById("year").textContent = new Date().getFullYear().toLocaleString("fa-IR", { useGrouping: false });
