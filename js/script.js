  document.addEventListener("DOMContentLoaded", function () {
    // === MODO OSCURO ===
    const checkbox = document.querySelector(".toggle-checkbox");

    const applyTheme = (darkMode) => {
      document.body.classList.toggle("dark-mode", darkMode);
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    };

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      checkbox.checked = savedTheme === "dark";
    }
    applyTheme(checkbox.checked);

    checkbox.addEventListener("change", function () {
      applyTheme(this.checked);
    });

    // === SISTEMA DE COMENTARIOS // Opiniones ===
    const commentForm = document.getElementById("comentarioForm");
    const commentsContainer = document.getElementById("comentariosContainer");

    const badWords = [
      "puta", "mierda", "cabron", "pendejo",
      "estúpido", "idiota", "imbécil", "maldito",
      "perra"
    ];

    const containsBadWords = (text) => {
      const cleanText = text.toLowerCase();
      return badWords.some(word => cleanText.includes(word));
    };

    if (commentForm) {
      commentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("nombre").value.trim() || "Anónimo";
        const comment = document.getElementById("comentario").value.trim();

        if (comment === "") return;

        if (containsBadWords(comment)) {
          Swal.fire({
            icon: 'error',
            title: 'Comentario bloqueado',
            text: 'Este comentario no puede ser publicado por contener lenguaje inapropiado.',
            confirmButtonText: 'Entendido',
          });
          return;
        }

        const commentDiv = document.createElement("div");
        commentDiv.className = "card mb-3";
        commentDiv.innerHTML = `
          <div class="card-body" style="margin-left: 20px;">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${comment}</p>
            <p class="card-subtitle text-muted small">${new Date().toLocaleString()}</p>
          </div>
        `;

        commentsContainer.appendChild(commentDiv);
        commentForm.reset();
      });
    }

    // === FORMULARIO DE EVALUACIÓN DENTAL ===
    const dentalForm = document.getElementById("dentalForm");
    
    if (dentalForm) {
      dentalForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const form = e.target;
        let score = 0;
// obtener valores del usuario
        score += parseInt(form.cepillado.value) === 0 ? 2 : parseInt(form.cepillado.value) === 1 ? 1 : 0;
        score += parseInt(form.azucar.value);
        score += parseInt(form.dentista.value);
        score += parseInt(form.sangrado.value);
        score += parseInt(form.caries.value);

        let title = '';
        let message = '';
        let icon = '';
        let recommendation = '';
// la suma de los valores obtenidos, dependiendo del total sale una ventana emergente que da el resultado del test. Además, en esta
//ventana está un botón que te direge a la ventana de servicios
        if (score >= 8) {
          title = "🔴 Riesgo ALTO";
          message = "Necesitas mejorar tus hábitos de higiene oral.";
          icon = "error";
          recommendation = "Agenda una cita lo antes posible para evitar complicaciones.";
        } else if (score >= 2) {
          title = "🟡 Riesgo MEDIO";
          message = "Tienes algunos hábitos que podrías mejorar.";
          icon = "warning";
          recommendation = "Considera visitar al odontólogo para una evaluación preventiva.";
        } else {
          title = "🟢 Riesgo BAJO";
          message = "¡Excelente! Tu salud bucal está en buen estado.";
          icon = "success";
          recommendation = "Sigue con tus buenos hábitos y realiza chequeos regulares.";
        }
// código de la ventana emergente con sus botones de Agendar cita y cerrar.
        Swal.fire({
          title: title,
          html: `
            <p class="mb-2">${message}</p>
            <p class="fw-medium">${recommendation}</p>
          `,
          icon: icon,
          showCancelButton: true,
          confirmButtonText: 'Agendar cita',
          cancelButtonText: 'Cerrar',
          confirmButtonColor: '#0d6efd',
          cancelButtonColor: '#6c757d'
        }).then((result) => {
          if (result.isConfirmed) {
            window.open('servicios.html', '_blank');
          }
        });
      });
    }
  });
