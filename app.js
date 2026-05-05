const slides = Array.from(document.querySelectorAll(".slide"));
const slideList = document.querySelector("#slideList");
const progressBar = document.querySelector("#progressBar");
const slideCounter = document.querySelector("#slideCounter");
const toast = document.querySelector("#toast");
let current = 0;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove("show"), 1800);
}

function goTo(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
  document.querySelectorAll(".nav-item").forEach((item, i) => item.classList.toggle("active", i === current));
  const percent = ((current + 1) / slides.length) * 100;
  progressBar.style.width = `${percent}%`;
  slideCounter.textContent = `Slide ${current + 1} / ${slides.length}`;
}

slides.forEach((slide, index) => {
  const button = document.createElement("button");
  button.className = "nav-item";
  button.type = "button";
  button.innerHTML = `<span class="num">${String(index + 1).padStart(2, "0")}</span><span class="label">${slide.dataset.title}</span>`;
  button.addEventListener("click", () => goTo(index));
  slideList.appendChild(button);
});

document.querySelector("#nextBtn").addEventListener("click", () => goTo(current + 1));
document.querySelector("#prevBtn").addEventListener("click", () => goTo(current - 1));

document.addEventListener("keydown", (event) => {
  const tag = document.activeElement?.tagName?.toLowerCase();
  if (tag === "textarea" || tag === "input") return;
  if (["ArrowRight", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    goTo(current + 1);
  }
  if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    goTo(current - 1);
  }
  if (event.key === "Home") goTo(0);
  if (event.key === "End") goTo(slides.length - 1);
});

document.querySelectorAll(".copy").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy || button.parentElement.innerText;
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copiado para a área de transferência");
    } catch {
      showToast("Não consegui copiar neste navegador");
    }
  });
});

document.querySelector("#themeBtn").addEventListener("click", () => {
  const app = document.querySelector(".app");
  const isDark = app.dataset.theme === "dark";
  app.dataset.theme = isDark ? "light" : "dark";
  document.querySelector("#themeBtn").textContent = isDark ? "☾" : "☀";
});

document.querySelector("#printBtn").addEventListener("click", () => window.print());

document.querySelector("#toastDemo").addEventListener("click", () => {
  showToast("Toast: componente acionado com sucesso");
});

document.querySelector("#loginDemo").addEventListener("click", () => {
  const email = document.querySelector("#emailDemo").value.trim();
  const msg = document.querySelector("#loginMsg");
  msg.textContent = email
    ? `Login demo enviado para ${email}`
    : "Digite um e-mail para testar a interação.";
  showToast(email ? "Login demo executado" : "Campo obrigatório: e-mail");
});

document.querySelectorAll(".variant-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const variant = button.dataset.variant;
    document.querySelector("#variantText").textContent = `Variante atual: ${variant}`;
    showToast(`Variante selecionada: ${variant}`);
  });
});

document.querySelector("#copyPrompt").addEventListener("click", async () => {
  const prompt = document.querySelector("#promptText").value;
  try {
    await navigator.clipboard.writeText(prompt);
    showToast("Prompt copiado");
  } catch {
    showToast("Não consegui copiar o prompt");
  }
});

goTo(0);
