const jobs = [
  { id: 1, title: "MERN Stack Developer Intern", company: "TechNova Solutions", location: "Chennai", type: "Internship", salary: 15000, icon: "💻", description: "Work with React, Node.js, Express and MongoDB on real web application features." },
  { id: 2, title: "Frontend Developer", company: "PixelCraft Labs", location: "Coimbatore", type: "Full-time", salary: 28000, icon: "🎨", description: "Build responsive interfaces using HTML, CSS, JavaScript and modern UI practices." },
  { id: 3, title: "Junior JavaScript Developer", company: "CodeBridge", location: "Trichy", type: "Full-time", salary: 25000, icon: "⚡", description: "Develop and maintain JavaScript-based web applications with a collaborative team." },
  { id: 4, title: "Web Developer Intern", company: "StartUp Hub", location: "Remote", type: "Internship", salary: 12000, icon: "🌐", description: "Learn practical frontend development and contribute to production-ready website features." },
  { id: 5, title: "React Developer", company: "CloudPeak Technologies", location: "Bengaluru", type: "Full-time", salary: 42000, icon: "⚛️", description: "Create reusable React components and integrate REST APIs for business applications." },
  { id: 6, title: "UI Developer Intern", company: "DesignStack", location: "Chennai", type: "Internship", salary: 14000, icon: "🖥️", description: "Convert UI designs into accessible and responsive web pages." },
  { id: 7, title: "Full Stack Developer", company: "NextGen Systems", location: "Coimbatore", type: "Full-time", salary: 38000, icon: "🚀", description: "Develop frontend and backend features and work with databases and APIs." },
  { id: 8, title: "Web Designer", company: "BrightWorks", location: "Trichy", type: "Full-time", salary: 22000, icon: "✨", description: "Design and implement clean, responsive layouts for business websites." },
  { id: 9, title: "Node.js Intern", company: "DevSphere", location: "Remote", type: "Internship", salary: 13000, icon: "🟢", description: "Assist with Express APIs, database integration and backend development." },
  { id: 10, title: "Software Developer", company: "Innovate IT", location: "Bengaluru", type: "Full-time", salary: 45000, icon: "🧩", description: "Work across frontend, backend and API integrations in a software development team." }
];

let saved = JSON.parse(localStorage.getItem("careerhubSaved") || "[]");
const $ = id => document.getElementById(id);
const money = n => `₹${n.toLocaleString("en-IN")}`;

function render() {
  const q = $("searchInput").value.toLowerCase().trim(), loc = $("locationFilter").value, type = $("typeFilter").value, sort = $("sortFilter").value;
  let list = jobs.filter(j => (loc === "all" || j.location === loc) && (type === "all" || j.type === type) && (j.title + " " + j.company + " " + j.description).toLowerCase().includes(q));
  if (sort === "salaryHigh") list.sort((a, b) => b.salary - a.salary);
  if (sort === "salaryLow") list.sort((a, b) => a.salary - b.salary);
  if (sort === "company") list.sort((a, b) => a.company.localeCompare(b.company));
  $("resultText").textContent = `${list.length} job${list.length !== 1 ? "s" : ""} found`;
  $("emptyState").hidden = list.length > 0;
  $("jobGrid").innerHTML = list.map(j => `
  <article class="job-card">
    <div class="company-logo">${j.icon}</div>
    <h3>${j.title}</h3><div class="company">${j.company}</div>
    <div class="job-meta"><span class="badge">📍 ${j.location}</span><span class="badge">${j.type}</span></div>
    <p class="muted">${j.description}</p><div class="salary">${money(j.salary)} / month</div>
    <div class="card-actions">
      <button class="save ${saved.includes(j.id) ? "active" : ""}" data-save="${j.id}">${saved.includes(j.id) ? "♥ Saved" : "♡ Save"}</button>
      <button class="apply" data-view="${j.id}">View & Apply</button>
    </div>
  </article>`).join("");
  document.querySelectorAll("[data-save]").forEach(b => b.onclick = () => toggleSave(+b.dataset.save));
  document.querySelectorAll("[data-view]").forEach(b => b.onclick = () => openJob(+b.dataset.view));
  $("savedCount").textContent = saved.length;
}

function toggleSave(id) {
  if (saved.includes(id)) saved = saved.filter(x => x !== id), showToast("Removed from saved jobs");
  else saved.push(id), showToast("Job saved");
  localStorage.setItem("careerhubSaved", JSON.stringify(saved)); render();
}

function openJob(id) {
  const j = jobs.find(x => x.id === id);
  $("modalContent").innerHTML = `<p class="eyebrow">${j.type.toUpperCase()}</p><h2>${j.title}</h2><h3>${j.company}</h3><p>📍 ${j.location}</p><p>💰 ${money(j.salary)} / month</p><p>${j.description}</p><button class="primary" id="applyNow">Apply Now</button>`;
  $("modal").classList.add("show");
  $("applyNow").onclick = () => { showToast("Application submitted successfully!"); closeModal() };
}
function closeModal() { $("modal").classList.remove("show") }
function showToast(msg) { const t = $("toast"); t.textContent = msg; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 1800) }

["searchInput", "locationFilter", "typeFilter", "sortFilter"].forEach(id => $(id).addEventListener(id === "searchInput" ? "input" : "change", render));
$("closeModal").onclick = closeModal;
$("modal").onclick = e => { if (e.target.id === "modal") closeModal() };
$("menuBtn").onclick = () => $("navLinks").classList.toggle("show");
document.querySelectorAll(".nav-links a").forEach(a => a.onclick = () => $("navLinks").classList.remove("show"));
$("savedBtn").onclick = () => { $("searchInput").value = ""; $("locationFilter").value = "all"; $("typeFilter").value = "all"; render(); document.getElementById("jobs").scrollIntoView(); };
$("contactForm").onsubmit = e => { e.preventDefault(); showToast("Thank you! Your message was sent."); e.target.reset() };
render();
