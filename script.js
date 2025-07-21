document.addEventListener("DOMContentLoaded", function () {
  // === MODO OSCURO ===
  const checkbox = document.querySelector(".toggle-checkbox");

  const applyTheme = (darkMode) => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  };

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) checkbox.checked = savedTheme === "dark";
  applyTheme(checkbox.checked);

  checkbox.addEventListener("change", function () {
    applyTheme(this.checked);
  });

  // === SISTEMA DE COMENTARIOS // Opiniones ===
  const form = document.getElementById("comentarioForm");
  const container = document.getElementById("comentariosContainer");

  const malasPalabras = [
    "puta", "mierda", "cabron", "pendejo",
    "estúpido", "idiota", "imbécil", "maldito",
    "perra"
  ];

  const contieneMalasPalabras = (texto) => {
    const textoLimpio = texto.toLowerCase();
    return malasPalabras.some(palabra => textoLimpio.includes(palabra));
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim() || "Anónimo";
    const comentario = document.getElementById("comentario").value.trim();

    if (comentario === "") return;

    if (contieneMalasPalabras(comentario)) {
      Swal.fire({
        icon: 'error',
        title: 'Comentario bloqueado',
        text: 'Este comentario no puede ser publicado por contener lenguaje inapropiado.',
        confirmButtonText: 'Entendido',
      });
      return;
    }

    const comentarioDiv = document.createElement("div");
    comentarioDiv.className = "card mb-3";
    comentarioDiv.innerHTML = `
      <div class="card-body" style="margin-left: 20px;">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">${comentario}</p>
        <p class="card-subtitle text-muted small"> ${new Date().toLocaleString()}</p>
      </div>
    `;

    container.appendChild(comentarioDiv);
    form.reset();
  });
});
