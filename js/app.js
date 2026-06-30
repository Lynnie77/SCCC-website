import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

// ---------------------------
// Small helpers
// ---------------------------
const $ = (sel) => document.querySelector(sel);
const toast = $("#toast");
function showToast(text = "Copied ✅") {
  if (!toast) return;
  toast.textContent = text;
  toast.style.display = "block";
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => (toast.style.display = "none"), 1400);
}

 
// ---------------------------
// Mobile menu START
// ---------------------------
const mobileMenuBtn = $("#mobileMenuBtn");
const siteNav = $("#siteNav");

function closeMobileMenu() {
  siteNav?.classList.remove("is-open");
  mobileMenuBtn?.setAttribute("aria-expanded", "false");
}

mobileMenuBtn?.addEventListener("click", () => {
  const isOpen = siteNav?.classList.toggle("is-open");
  mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 780) closeMobileMenu();
});
// ---------------------------
// Mobile menu END
// ---------------------------

// ---------------------------
// Theme toggle START
// ---------------------------
const themeBtn = $("#themeBtn");
const savedTheme = localStorage.getItem("sacred_theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

// NOTE: setMaterialForTheme is defined later, but that's fine.
// It only runs on click (after everything has loaded).
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "dark";
    const next = cur === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("sacred_theme", next);
    showToast(next === "light" ? "Still Mode 🌿" : "Sacred Mode ✨");

    // tweak 3D colors on theme change
    if (typeof setMaterialForTheme === "function") setMaterialForTheme(next);
  });
}

// ---------------------------
// Theme toggle END
// ---------------------------
// Copy buttons START
// ---------------------------
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied ✅");
  } catch (e) {
    // fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    showToast("Copied ✅");
  }
}

$("#copyAddr")?.addEventListener("click", () => copyText("810 W 3rd Ave, Eugene, OR 97402"));
$("#copyPhone")?.addEventListener("click", () => copyText("(510) 701-2028"));
$("#copyEmail")?.addEventListener("click", () => copyText("sacredconnections810@gmail.com"));

// ---------------------------
// Copy buttons END
// ---------------------------
// Dynamic intention START (simple + fun)
// ---------------------------
const intentions = [
  { text: "I breathe in peace, and I breathe out worry.", vibe: "Calm + Grounded", moon: "Gentle" },
  { text: "I choose love in my words, my actions, and my thoughts.", vibe: "Open-hearted", moon: "Bright" },
  { text: "I am supported by community. I am never alone.", vibe: "Connected", moon: "Steady" },
  { text: "I trust the next step. I don’t need the whole map.", vibe: "Courage", moon: "Mystic" },
  { text: "Today I return to joy — simple, real, and present.", vibe: "Joyful", moon: "Soft" },
];

const pick = intentions[Math.floor(Math.random() * intentions.length)];
if ($("#intentionText")) $("#intentionText").textContent = pick.text;
if ($("#moonTag")) $("#moonTag").textContent = "Moon: " + pick.moon;
if ($("#vibeTag")) $("#vibeTag").textContent = "Vibe: " + pick.vibe;

// ---------------------------
// Dynamic intention END
// ---------------------------

// ---------------------------
// Events START (dynamic JS data + click for details)
// ---------------------------
const events = [
/*  {
    id: "worship-gathering",
    title: "Worship + Community Gathering",
    date: "2026-03-01",
    time: "10:00 AM",
    endTime: "11:30 AM",
    location: "810 W 3rd Ave, Eugene",
    type: "Gathering",
    teacher: "Sacred Community Team",
    description:
      "A welcoming community gathering with worship, prayer, and time to connect. Come as you are—quietly listen, join in, or just soak in the peace.",
    bring: "A water bottle. A notebook if you like taking notes.",
    cost: "Free / donation welcome",
    contact: "sacredconnections810@gmail.com",
    tags: ["Worship", "Community", "All welcome"]
  },
  {
    id: "authentic-relating",
    title: "Authentic Relating",
    date: "2026-03-03",
    time: "5:00 PM",
    endTime: "7:00 PM",
    location: "810 W 3rd Ave, Eugene",
    type: "Gathering",
    teacher: "Fox & Friends🦊",
    description:
      "Fox & Friends teach a Vinyasa Fusion which incorporates elements of vinyasa, yin, hatha, and pranayama. These beginner to intermediate sessions will include modifications, challenges, and surprises for ALL LEVELS. Through practicing yoga asanas and pranayama (breathing techniques) one can organically improve focus, flexibility, and balance, while decreasing anxiety, depression, and overall levels of stress in the body.",
    bring: "A water bottle. A notebook if you like taking notes.",
    cost: "Free / donation welcome",
    contact: "sacredconnections810@gmail.com",
    tags: ["Relating", "Communication", "Talk"]
  },
  {
    id: "scm-yoga-meditation-07-06-2026",
    title: "Elevated Yoga 🧘🏼‍♀️", 
    date: "2026-07-06",
    time: "5:30 PM",
    endTime: "6:30 PM",
    location: "810 W 3rd Ave, Eugene",
    type: "ElevatedYoga",
    teacher: "Elayne Quirin 🌿",
    description:
      "Third Monday of every month we offer Elevated Yoga & Meditation w/ Elayne Quirin. Social time ...Tea & snacks.",
    bring: "A water bottle & yoga mat, maybe snacks",
    cost: "Free / donation welcome",
    contact: "sacredconnections810@gmail.com",
    tags: ["Yoga", "Elayne Quirin 🌿", "Elevated Yoga"]
  },
  {
    id: "chanting-circle",
    title: "Chanting Circle (Beginner-Friendly)",
    date: "2026-03-05",
    time: "6:30 PM",
    endTime: "7:45 PM",
    location: "Sanctuary Room",
    type: "Circle",
    teacher: "Guest Guide (TBA)",
    description:
      "Chanting is repeating a simple sound or phrase together. It’s calming and can help you feel grounded. Beginner-friendly—no experience needed.",
    bring: "Comfortable clothes. Optional: a cushion or small blanket.",
    cost: "$10 suggested donation",
    contact: "sacredconnections810@gmail.com",
    tags: ["Chanting", "Meditation", "Relaxing"]
  },
  {
    id: "sacred-geometry-night",
    title: "Sacred Geometry Night",
    date: "2026-03-12",
    time: "6:00 PM",
    endTime: "7:30 PM",
    location: "Workshop Space",
    type: "Class",
    teacher: "Facilitator (TBA)",
    description:
      "Learn the basics of sacred geometry—simple shapes and patterns that many people find meaningful and healing. We’ll explore a few designs and create something together.",
    bring: "Notebook + pen. Optional: ruler/compass if you have one.",
    cost: "$15 suggested donation",
    contact: "sacredconnections810@gmail.com",
    tags: ["Sacred geometry", "Learning", "Creative"]
  },
  {
    id: "art-walk-06-25-2026",
    title: "Art Walk",
    date: "2026-06-26",
    time: "5:00 PM",
    endTime: "9:00 PM",
    location: "810 W 3rd Ave, Eugene",
    type: "ArtWalk",
    teacher: "Community ArtWalk",
    description:
      "Whiteaker Last Friday Artwalk, Food.. Music & Art!",
    bring: "A water bottle & your walking shoes along with smiles",
    cost: "Free / donation welcome",
    contact: "sacredconnections810@gmail.com",
    tags: ["Art", "Community", "Gathering"]
  },
  */
    {
    id: "food-pantry-06-28-2026",
    title: "Food Pantry + Community Share",
    date: "2026-06-28",
    time: "1:00 PM",
    endTime: "3:00 PM",
    location: "Front Hall",
    type: "Service",
    teacher: "Community Volunteers",
    description:
      "Support and sharing for our neighbors. If you’d like to help, we can always use friendly hands and warm hearts.",
    bring: "If donating: shelf-stable food, toiletries, or clean bags.",
    cost: "Free",
    contact: "sacredconnections810@gmail.com",
    tags: ["Food pantry", "Support", "Service"]
  },
    {
    id: "yoga-meditation-07-01-2026",
    title: "Yoga Meditation",
    date: "2026-07-01",
    time: "5:30 PM",
    endTime: "7:00 PM",
    location: "810 W 3rd Ave, Eugene",
    type: "Yoga",
    teacher: "Fox & Friends🦊",
    description:
      "Fox & Friends teach a Vinyasa Fusion which incorporates elements of vinyasa, yin, hatha, and pranayama. These beginner to intermediate sessions will include modifications, challenges, and surprises for ALL LEVELS. Through practicing yoga asanas and pranayama (breathing techniques) one can organically improve focus, flexibility, and balance, while decreasing anxiety, depression, and overall levels of stress in the body.",
    bring: "A water bottle & yoga mat, maybe a notebook if you like taking notes.",
    cost: "Free / donation welcome",
    contact: "sacredconnections810@gmail.com",
    tags: ["Yoga", "Fox & Friends 🦊", "Energy work"]
  },
      {
    id: "food-pantry-07-05-2026",
    title: "Food Pantry + Community Share",
    date: "2026-07-05",
    time: "1:00 PM",
    endTime: "3:00 PM",
    location: "Front Hall",
    type: "Service",
    teacher: "Community Volunteers",
    description:
      "Support and sharing for our neighbors. If you’d like to help, we can always use friendly hands and warm hearts.",
    bring: "If donating: shelf-stable food, toiletries, or clean bags.",
    cost: "Free",
    contact: "sacredconnections810@gmail.com",
    tags: ["Food pantry", "Support", "Service"]
  },
  {
    id: "scm-yoga-meditation-07-06-2026",
    title: "Elevated Yoga 🧘🏼‍♀️", 
    date: "2026-07-06",
    time: "5:30 PM",
    endTime: "6:30 PM",
    location: "810 W 3rd Ave, Eugene",
    type: "ElevatedYoga",
    teacher: "Elayne Quirin 🌿",
    description:
      "Third Monday of every month we offer Elevated Yoga & Meditation w/ Elayne Quirin. Social time ...Tea & snacks.",
    bring: "A water bottle & yoga mat, maybe snacks",
    cost: "Free / donation welcome",
    contact: "sacredconnections810@gmail.com",
    tags: ["Yoga", "Elayne Quirin 🌿", "Elevated Yoga"]
  },
      {
    id: "yoga-meditation-07-08-2026",
    title: "Yoga Meditation",
    date: "2026-07-08",
    time: "5:30 PM",
    endTime: "7:00 PM",
    location: "810 W 3rd Ave, Eugene",
    type: "Yoga",
    teacher: "Fox & Friends🦊",
    description:
      "Fox & Friends teach a Vinyasa Fusion which incorporates elements of vinyasa, yin, hatha, and pranayama. These beginner to intermediate sessions will include modifications, challenges, and surprises for ALL LEVELS. Through practicing yoga asanas and pranayama (breathing techniques) one can organically improve focus, flexibility, and balance, while decreasing anxiety, depression, and overall levels of stress in the body.",
    bring: "A water bottle & yoga mat, maybe a notebook if you like taking notes.",
    cost: "Free / donation welcome",
    contact: "sacredconnections810@gmail.com",
    tags: ["Yoga", "Meditation", "Fox & Friends 🦊"]
  },
        {
    id: "food-pantry-07-12-2026",
    title: "Food Pantry + Community Share",
    date: "2026-07-12",
    time: "1:00 PM",
    endTime: "3:00 PM",
    location: "Front Hall",
    type: "Service",
    teacher: "Community Volunteers",
    description:
      "Support and sharing for our neighbors. If you’d like to help, we can always use friendly hands and warm hearts.",
    bring: "If donating: shelf-stable food, toiletries, or clean bags.",
    cost: "Free",
    contact: "sacredconnections810@gmail.com",
    tags: ["Food pantry", "Support", "Service"]
  },
        {
    id: "yoga-meditation-07-15-2026",
    title: "Yoga Meditation",
    date: "2026-07-15",
    time: "5:30 PM",
    endTime: "7:00 PM",
    location: "810 W 3rd Ave, Eugene",
    type: "Yoga",
    teacher: "Fox & Friends🦊",
    description:
      "Fox & Friends teach a Vinyasa Fusion which incorporates elements of vinyasa, yin, hatha, and pranayama. These beginner to intermediate sessions will include modifications, challenges, and surprises for ALL LEVELS. Through practicing yoga asanas and pranayama (breathing techniques) one can organically improve focus, flexibility, and balance, while decreasing anxiety, depression, and overall levels of stress in the body.",
    bring: "A water bottle & yoga mat, maybe a notebook if you like taking notes.",
    cost: "Free / donation welcome",
    contact: "sacredconnections810@gmail.com",
    tags: ["Yoga", "Fox & Friends 🦊", "Energy work"]
  },
        {
    id: "food-pantry-07-19-2026",
    title: "Food Pantry + Community Share",
    date: "2026-07-19",
    time: "1:00 PM",
    endTime: "3:00 PM",
    location: "Front Hall",
    type: "Service",
    teacher: "Community Volunteers",
    description:
      "Support and sharing for our neighbors. If you’d like to help, we can always use friendly hands and warm hearts.",
    bring: "If donating: shelf-stable food, toiletries, or clean bags.",
    cost: "Free",
    contact: "sacredconnections810@gmail.com",
    tags: ["Food pantry", "Support", "Service"]
  },
          {
    id: "mystery-of-jazz-07-19-2026",
    title: "Mystery of Jazz",
    date: "2026-07-19",
    time: "6:00 PM",
    endTime: "8:00 PM",
    location: "Front Hall",
    type: "Music",
    teacher: "Eric Richardson",
    description:
      "Eric Richardson Explores Jazz",
    bring: "You & a friend!",
    cost: "Free / donation welcome",
    contact: "sacredconnections810@gmail.com",
    tags: ["Music", "Jazz", "Performance"]
  },
        {
    id: "yoga-meditation-07-22-2026",
    title: "Yoga Meditation",
    date: "2026-07-22",
    time: "5:30 PM",
    endTime: "7:00 PM",
    location: "810 W 3rd Ave, Eugene",
    type: "Yoga",
    teacher: "Fox & Friends🦊",
    description:
      "Fox & Friends teach a Vinyasa Fusion which incorporates elements of vinyasa, yin, hatha, and pranayama. These beginner to intermediate sessions will include modifications, challenges, and surprises for ALL LEVELS. Through practicing yoga asanas and pranayama (breathing techniques) one can organically improve focus, flexibility, and balance, while decreasing anxiety, depression, and overall levels of stress in the body.",
    bring: "A water bottle & yoga mat, maybe a notebook if you like taking notes.",
    cost: "Free / donation welcome",
    contact: "sacredconnections810@gmail.com",
    tags: ["Yoga", "Meditation", "Fox & Friends 🦊"]
  },
    {
    id: "food-pantry-07-26-2026",
    title: "Food Pantry + Community Share",
    date: "2026-07-26",
    time: "1:00 PM",
    endTime: "3:00 PM",
    location: "Front Hall",
    type: "Service",
    teacher: "Community Volunteers",
    description:
      "Support and sharing for our neighbors. If you’d like to help, we can always use friendly hands and warm hearts.",
    bring: "If donating: shelf-stable food, toiletries, or clean bags.",
    cost: "Free",
    contact: "sacredconnections810@gmail.com",
    tags: ["Food pantry", "Support", "Service"]
  },
    {
    id: "authentic-relating-07-27-2026",
    title: "Authentic Relating",
    date: "2026-07-27",
    time: "5:00 PM",
    endTime: "7:00 PM",
    location: "810 W 3rd Ave, Eugene",
    type: "Gathering",
    teacher: "Fox & Friends🦊",
    description:
      "AR is a set of Principles and Practices designed to cultivate trustable, empowering and nourishing connections and relationships with everyone in your life. ",
    bring: "A water bottle. A notebook if you like taking notes.",
    cost: "Suggested donation is 3-10$",
    contact: "sacredconnections810@gmail.com",
    tags: ["Relating", "Communication", "Talk"]
  },
        {
    id: "yoga-meditation-07-29-2026",
    title: "Yoga Meditation",
    date: "2026-07-29",
    time: "5:30 PM",
    endTime: "7:00 PM",
    location: "810 W 3rd Ave, Eugene",
    type: "Yoga",
    teacher: "Fox & Friends🦊",
    description:
      "Fox & Friends teach a Vinyasa Fusion which incorporates elements of vinyasa, yin, hatha, and pranayama. These beginner to intermediate sessions will include modifications, challenges, and surprises for ALL LEVELS. Through practicing yoga asanas and pranayama (breathing techniques) one can organically improve focus, flexibility, and balance, while decreasing anxiety, depression, and overall levels of stress in the body.",
    bring: "A water bottle & yoga mat, maybe a notebook if you like taking notes.",
    cost: "Free / donation welcome",
    contact: "sacredconnections810@gmail.com",
    tags: ["Yoga", "Meditation", "Fox & Friends 🦊"]
  },  
];

function fmtBadge(iso) {
  const d = new Date(iso + "T12:00:00");
  const mo = d.toLocaleString(undefined, { month: "short" });
  const day = d.getDate();
  return { mo, day, full: d.toLocaleDateString(undefined, { weekday:"long", year:"numeric", month:"long", day:"numeric" }) };
}

const grid = $("#eventsGrid");

function renderEvents() {
  if (!grid) return;

  grid.innerHTML = "";
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

  for (const ev of sorted) {
    const b = fmtBadge(ev.date);
    const el = document.createElement("article");
    el.className = "event";
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", `Open details for ${ev.title}`);
    el.dataset.eventId = ev.id;

    el.innerHTML = `
      <div class="badge" aria-hidden="true">
        <div class="mo">${b.mo}</div>
        <div class="day">${b.day}</div>
      </div>
      <div>
        <h4>${ev.title}</h4>
        <div class="meta">
          <div><strong>When:</strong> ${ev.time}${ev.endTime ? `–${ev.endTime}` : ""}</div>
          <div><strong>Where:</strong> ${ev.location}</div>
        </div>
        <div class="tagrow">
          ${ev.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
    `;

    // Click + keyboard open
    el.addEventListener("click", () => openEventModal(ev.id));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openEventModal(ev.id);
      }
    });

    grid.appendChild(el);
  }
}

// -------- Modal logic --------
const modal = $("#eventModal");
const modalCloseBtn = $("#modalCloseBtn");

function openEventModal(eventId) {
  const ev = events.find(e => e.id === eventId);
  if (!ev || !modal) return;

  const b = fmtBadge(ev.date);

  $("#modalDate").textContent = b.full;
  $("#modalTitle").textContent = ev.title;
  $("#modalMeta").textContent = `${ev.type} • ${ev.time}${ev.endTime ? `–${ev.endTime}` : ""} • ${ev.location}`;
  $("#modalDesc").textContent = ev.description || "";

  $("#modalTeacher").textContent = ev.teacher || "TBA";
  $("#modalBring").textContent = ev.bring || "Just bring yourself 😊";
  $("#modalCost").textContent = ev.cost || "Free";
  $("#modalContact").textContent = ev.contact || "sacredconnections810@gmail.com";

  const tagsWrap = $("#modalTags");
  tagsWrap.innerHTML = (ev.tags || []).map(t => `<span class="tag">${t}</span>`).join("");

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeEventModal() {
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalCloseBtn?.addEventListener("click", closeEventModal);
modal?.addEventListener("click", (e) => {
  if (e.target?.dataset?.close === "true") closeEventModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeEventModal();
});

renderEvents();


// ---------------------------
// Events END
// ---------------------------
// Rentals estimator START
// ---------------------------
const rentalRates = {
  main: 50,
  side: 30,
  outdoor: 25
};

const addonRates = {
  tables: 10,
  chairs: 10,
  tents: 15
};

function money(n){ return `$${n.toFixed(0)}`; }

function calcRental(){
  const hoursEl = document.getElementById("hours");
  const totalEl = document.getElementById("rentalTotal");
  const breakdownEl = document.getElementById("rentalBreakdown");

  if(!hoursEl || !totalEl || !breakdownEl) return;

  const selectedSpaces = [...document.querySelectorAll('input[name="space"]:checked')];

  if (selectedSpaces.length === 0) {
    totalEl.textContent = "$0";
    breakdownEl.textContent = " — Please choose at least one space.";
    return;
  }

  let hours = parseFloat(hoursEl.value || "2");
  if (Number.isNaN(hours) || hours < 2) hours = 2;
  hoursEl.value = hours;

  const baseRate = selectedSpaces.reduce((sum, item) => {
    return sum + (rentalRates[item.value] ?? 0);
  }, 0);

  const spaceNames = selectedSpaces.map((item) => {
    if (item.value === "main") return "Main Space";
    if (item.value === "side") return "Workshop / Side Room";
    if (item.value === "outdoor") return "Outdoor Area";
    return "Space";
  });

  const spaceName = spaceNames.join(" + ");

  const tables = document.getElementById("tables")?.checked ? addonRates.tables : 0;
  const chairs = document.getElementById("chairs")?.checked ? addonRates.chairs : 0;
  const tents  = document.getElementById("tents")?.checked  ? addonRates.tents  : 0;

  const addonPerHour = tables + chairs + tents;
  const perHour = baseRate + addonPerHour;
  const total = perHour * hours;

  totalEl.textContent = money(total);
  breakdownEl.textContent = ` — ${spaceName}: ${money(baseRate)}/hr + add-ons ${money(addonPerHour)}/hr × ${hours} hr`;
}

// Wire up listeners
["change", "input"].forEach(evt => {
  document.addEventListener(evt, (e) => {
    if (
      e.target?.name === "space" ||
      e.target?.id === "hours" ||
      e.target?.id === "tables" ||
      e.target?.id === "chairs" ||
      e.target?.id === "tents"
    ) {
      calcRental();
    }
  });
});

// Run once on load
calcRental();

// ---------------------------
// Rentals estimator END

// RENTAL HOURS BUTTONS START
const rentalHoursInput = document.getElementById("hours");
const hoursMinus = document.getElementById("hoursMinus");
const hoursPlus = document.getElementById("hoursPlus");

function setRentalHours(nextValue) {
  if (!rentalHoursInput) return;

  const min = Number(rentalHoursInput.min || 1);
  const max = Number(rentalHoursInput.max || 24);
  const cleanValue = Math.min(max, Math.max(min, Number(nextValue) || min));

  rentalHoursInput.value = cleanValue;

  rentalHoursInput.dispatchEvent(new Event("input", { bubbles: true }));
  rentalHoursInput.dispatchEvent(new Event("change", { bubbles: true }));
}

hoursMinus?.addEventListener("click", () => {
  setRentalHours(Number(rentalHoursInput.value || 1) - 1);
});

hoursPlus?.addEventListener("click", () => {
  setRentalHours(Number(rentalHoursInput.value || 1) + 1);
});

rentalHoursInput?.addEventListener("focus", () => {
  rentalHoursInput.select();
});
// RENTAL HOURS BUTTONS END



// ---------------------------
// Contact form START (Formspree)
// ---------------------------
$("#contactForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const status = $("#formStatus");
  const submitBtn = form.querySelector('button[type="submit"]');

  if (submitBtn) submitBtn.disabled = true;
  if (status) status.textContent = "Sending your message...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      form.reset();
      if (status) status.textContent = "Message sent. Thank you 💖";
      showToast("Message sent 💖");
    } else {
      if (status) status.textContent = "Message did not send. Please try again.";
      showToast("Message did not send");
    }
  } catch (error) {
    if (status) status.textContent = "Connection issue. Please try again.";
    showToast("Connection issue");
  }

  if (submitBtn) submitBtn.disabled = false;
});

// MESSAGE CHARACTER COUNTER START
const msg = $("#msg");
const msgCount = $("#msgCount");

if (msg && msgCount) {
  const updateCount = () => {
    msgCount.textContent = msg.value.length;
  };

  msg.addEventListener("input", updateCount);
  updateCount();
}
// MESSAGE CHARACTER COUNTER END
// ---------------------------
// Contact form END
// ---------------------------

// Scroll reveal START
// ---------------------------
const obs = new IntersectionObserver(
  (entries) => {
    for (const en of entries) {
      if (en.isIntersecting) en.target.classList.add("show");
    }
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

// ---------------------------
// Scroll reveal END
// ---------------------------
// Footer year START
// ---------------------------
if ($("#year")) $("#year").textContent = new Date().getFullYear();

// ---------------------------
// Footer year END
// ---------------------------
// THREE.JS Sacred Geometry Background START
// ---------------------------
const canvas = document.getElementById("bg3d");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.5 : 2));

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
camera.position.set(0, 0.4, 7.4);

// Lights
const ambient = new THREE.AmbientLight(0xffffff, 0.55);
scene.add(ambient);

const key = new THREE.DirectionalLight(0xffffff, 0.9);
key.position.set(4, 3, 6);
scene.add(key);

// ---------------------------
// Geometry: swap-able sacred shapes + ring halo + orbiters
// ---------------------------
const group = new THREE.Group();
scene.add(group);

// Halo ring
const ringGeo = new THREE.RingGeometry(2.1, 2.35, 96);
ringGeo.rotateX(Math.PI / 2);

let knotMat, ringMat;

// Rebuilt objects
let core; // center object (Mesh OR LineSegments)
const orbiters = []; // smaller orbiting meshes

// Create halo once
const halo = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial());
group.add(halo);

function setMaterialForTheme(theme) {
  const isLight = theme === "light";

  // Center + orbiters material
knotMat = new THREE.MeshStandardMaterial({
  color: isLight ? 0xaa1166 : 0xff4fd8,
  metalness: 0.25,
  roughness: isLight ? 0.65 : 0.55,
  emissive: isLight ? 0xff4fd8 : 0x2a0b1f,
  emissiveIntensity: isLight ? 0.06 : 0.10,
  transparent: true,
  opacity: isLight ? 0.28 : 0.22,
});

  // Halo material
  ringMat = new THREE.MeshStandardMaterial({
    color: isLight ? 0x111122 : 0xffffff,
    metalness: 0.35,
    roughness: isLight ? 0.62 : 0.42,
    transparent: true,
    opacity: isLight ? 0.22 : 0.18,
    emissive: isLight ? 0x8a5cff : 0x170d2a,
    emissiveIntensity: isLight ? 0.1 : 0.22,
    side: THREE.DoubleSide,
  });

  // Apply halo material
  halo.material = ringMat;

  // Apply to core (Mesh OR LineSegments)
  if (core) {
    if (core.isMesh) {
      core.material = knotMat;
    } else {
      // LineSegments material
      core.material.color.setHex(isLight ? 0x111122 : 0xffffff);
      core.material.opacity = isLight ? 0.65 : 0.85;
    }
  }

  // Apply to orbiters
  orbiters.forEach((o) => (o.material = knotMat));
}

function makeCoreGeometry(type) {
  switch (type) {
    case "ico":
      return new THREE.IcosahedronGeometry(1.35, 2);
    case "dode":
      return new THREE.DodecahedronGeometry(1.35, 1);
    case "sphere":
      return new THREE.SphereGeometry(1.25, 64, 64);
    case "torus":
      return new THREE.TorusGeometry(1.15, 0.32, 32, 160);
    default:
      return new THREE.TorusKnotGeometry(1.2, 0.22, 240, 18, 2, 3);
  }
}

function buildCore(type) {
  // Clean up old core
  if (core) {
    group.remove(core);
    core.geometry?.dispose?.();
    core.material?.dispose?.();
    core = null;
  }

  const geo = makeCoreGeometry(type);

  // "edges" = line-art core
  if (type === "edges") {
    const edges = new THREE.EdgesGeometry(geo, 15);
    core = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ transparent: true, opacity: 0.85 }));
  } else {
    core = new THREE.Mesh(geo, knotMat || new THREE.MeshStandardMaterial());
  }

  group.add(core);
}

function makeOrbiterGeometry(type) {
  switch (type) {
    case "ico":
      return new THREE.IcosahedronGeometry(0.38, 1);
    case "dode":
      return new THREE.DodecahedronGeometry(0.38, 0);
    case "sphere":
      return new THREE.SphereGeometry(0.35, 24, 24);
    case "torus":
      return new THREE.TorusGeometry(0.34, 0.1, 16, 80);
    default:
      return new THREE.TorusKnotGeometry(0.38, 0.09, 180, 14, 2, 3);
  }
}

function rebuildOrbiters(type) {
  orbiters.forEach((o) => {
    group.remove(o);
    o.geometry?.dispose?.();
    o.material?.dispose?.();
  });
  orbiters.length = 0;

  for (let i = 0; i < 6; i++) {
    const g = makeOrbiterGeometry(type);
    const o = new THREE.Mesh(g, knotMat || new THREE.MeshStandardMaterial());
    const angle = (i / 6) * Math.PI * 2;

    o.position.set(Math.cos(angle) * 2.2, Math.sin(angle) * 0.35, Math.sin(angle) * 0.5);
    o.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);

    orbiters.push(o);
    group.add(o);
  }
}

// Start default shape
let currentShape = "sphere"; // knot, ico, dode, sphere, torus, edges
buildCore(currentShape);
rebuildOrbiters(currentShape);
// Shape keyboard controls START
// ---------------------------
// Lets keyboard numbers change sacred shapes,
// but NOT while someone is typing in forms.
window.addEventListener("keydown", (e) => {
  const typingTags = ["INPUT", "TEXTAREA", "SELECT"];
  const isTyping = typingTags.includes(e.target?.tagName);

  // Do not change shapes while user is using rental hours or forms
  if (isTyping || e.target?.isContentEditable) return;

  // Do not change shapes in Still / Light Mode
  const theme = document.documentElement.getAttribute("data-theme") || "dark";
  if (theme === "light") return;

  const map = {
    "1": "knot",
    "2": "ico",
    "3": "dode",
    "4": "sphere",
    "5": "torus",
    "6": "edges",
  };

  const next = map[e.key];
  if (!next) return;

  currentShape = next;
  buildCore(currentShape);
  rebuildOrbiters(currentShape === "edges" ? "knot" : currentShape);
  setMaterialForTheme(theme);

  showToast(`Shape: ${currentShape} ✨`);
});
// ---------------------------
// Shape keyboard controls END
// ---------------------------
// Particles field START
// ---------------------------
const pCount = 1200;
const pGeo = new THREE.BufferGeometry();
const pos = new Float32Array(pCount * 3);
for (let i = 0; i < pCount; i++) {
  const r = 10 * Math.random();
  const t = Math.random() * Math.PI * 2;
  const u = (Math.random() * 2 - 1) * 1.4;
  pos[i * 3 + 0] = Math.cos(t) * r;
  pos[i * 3 + 1] = u * r * 0.18;
  pos[i * 3 + 2] = Math.sin(t) * r;
}
pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
const pMat = new THREE.PointsMaterial({ size: 0.02, transparent: true, opacity: 0.85 });
const points = new THREE.Points(pGeo, pMat);
scene.add(points);

// Theme init (IMPORTANT: do this AFTER we created halo/core/orbiters)
const initialTheme = document.documentElement.getAttribute("data-theme") || "dark";
setMaterialForTheme(initialTheme);

// ---------------------------
// Particles field END
// ---------------------------
// Interactions START (mouse/touch)
// ---------------------------
let targetX = 0,
  targetY = 0;
let wow = 1.0;

function onMove(x, y) {
  const nx = (x / window.innerWidth) * 2 - 1;
  const ny = (y / window.innerHeight) * 2 - 1;
  targetX = nx;
  targetY = ny;
}

window.addEventListener("mousemove", (e) => onMove(e.clientX, e.clientY));
window.addEventListener(
  "touchmove",
  (e) => {
    const t = e.touches[0];
    if (t) onMove(t.clientX, t.clientY);
  },
  { passive: true }
);

// Buttons for extra effects
$("#wowBtn")?.addEventListener("click", () => {
  wow = Math.min(2.3, wow + 0.25);
  showToast("Wow boosted ✨");
});

$("#pulseBtn")?.addEventListener("click", () => {
  wow = 2.4;
  showToast("Pulsing 🌀");
  setTimeout(() => (wow = Math.max(1.0, wow - 0.7)), 900);
});

// ---------------------------
// Interactions END
// ---------------------------
// Resize START
// ---------------------------
function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener("resize", resize);
resize();

// ---------------------------
// Resize END
// ---------------------------
// Animate START
// ---------------------------
const clock = new THREE.Clock();

function tick() {
  const t = clock.getElapsedTime();

  // subtle parallax camera
  camera.position.x += (targetX * 0.55 - camera.position.x) * 0.04;
  camera.position.y += (-targetY * 0.25 + 0.35 - camera.position.y) * 0.04;
  camera.lookAt(0, 0, 0);

  // rotate group
  group.rotation.y = t * 0.28;
  group.rotation.x = Math.sin(t * 0.33) * 0.18;

  // orbiters (small shapes)
  orbiters.forEach((o, i) => {
    const a = t * 0.65 + (i / orbiters.length) * Math.PI * 2;
    o.position.x = Math.cos(a) * (2.2 + Math.sin(t * 0.4) * 0.12);
    o.position.z = Math.sin(a) * (2.2 + Math.cos(t * 0.4) * 0.12);
    o.position.y = Math.sin(a * 1.6) * 0.26;
    o.rotation.x += 0.007 + i * 0.0005;
    o.rotation.y += 0.006;
  });

  // glow "wow" (core + halo)
  const pulse = (1 + Math.sin(t * 1.7) * 0.08) * wow;

  if (core) {
    core.scale.setScalar(1.0 * pulse);

    // If core is a Mesh, it has emissiveIntensity
    if (core.isMesh && core.material && "emissiveIntensity" in core.material) {
      core.material.emissiveIntensity =
        (document.documentElement.getAttribute("data-theme") === "light" ? 0.12 : 0.22) * wow;
    }
  }

  halo.scale.setScalar(1.0 + (wow - 1) * 0.15);

  // particles drift
  points.rotation.y = -t * 0.05;
  points.rotation.x = Math.sin(t * 0.08) * 0.05;

  // gently decay wow back to normal
  wow += (1.0 - wow) * 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();

// ---------------------------
// THREE.JS Sacred Geometry Background END
// ---------------------------
