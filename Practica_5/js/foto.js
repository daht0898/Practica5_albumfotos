// js/foto.js
document.addEventListener("DOMContentLoaded", () => {
  const vistaAlbum = document.getElementById("album-view");
  const vistaModal = document.getElementById("modal-view");
  const cuerpo = document.body;

  // 1) Detectar si vino la lista desde foto-list.js
  let LISTA = window.PHOTO_LIST;
  if (!Array.isArray(LISTA)) {
    console.warn("PHOTO_LIST no encontrado. Usando LISTA de respaldo definida en foto.js");
    // === RESPALDO (usa tus nombres reales) ===
    LISTA = [
      { src: "images/conejo.jpg",   alt: "Conejo"   },
      { src: "images/gato.jpg",     alt: "Gato"     },
      { src: "images/lobo.jpg",     alt: "Lobo"     },
      { src: "images/mono.jpg",     alt: "Mono"     },
      { src: "images/panda.jpg",    alt: "Panda"    },
      { src: "images/perro.jpeg",   alt: "Perro"    }, // ojo: .jpeg
      { src: "images/suricata.jpg", alt: "Suricata" },
      { src: "images/tigre.jpg",    alt: "Tigre"    },
      { src: "images/zorro.jpg",    alt: "Zorro"    },
    ];
    // Exponerla por si otros scripts la quieren
    window.PHOTO_LIST = LISTA;
  } else {
    console.log("Usando PHOTO_LIST desde foto-list.js. Items:", LISTA.length);
  }

  // 2) Pintar miniaturas
  vistaAlbum.innerHTML = ""; // por si recargas caliente
  LISTA.forEach(({ src, alt }, idx) => {
    const img = document.createElement("img");
    img.className = "thumb";
    img.src = src;
    img.alt = alt || `Foto ${idx + 1}`;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("click", () => abrirModal(src, img.alt));
    vistaAlbum.appendChild(img);
  });

  // 3) Abrir modal
  function abrirModal(src, alt) {
    vistaModal.innerHTML = "";
    const grande = document.createElement("img");
    grande.src = src;
    grande.alt = alt || "Foto grande";
    vistaModal.appendChild(grande);

    vistaModal.style.display = "grid";
    // Pedido del PDF: anclar al desplazamiento del viewport
    vistaModal.style.top = window.pageYOffset + "px";
    // Desactivar scroll de la página
    cuerpo.classList.add("no-scroll");
    // Accesibilidad
    vistaModal.focus();
  }

  // 4) Cerrar modal
  function cerrarModal() {
    vistaModal.style.display = "none";
    vistaModal.innerHTML = ""; // limpiar imagen (como pide el PDF)
    cuerpo.classList.remove("no-scroll");
  }

  vistaModal.addEventListener("click", (e) => {
    if (e.target === vistaModal) cerrarModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && vistaModal.style.display !== "none") cerrarModal();
  });

  window.addEventListener("scroll", () => {
    if (vistaModal.style.display !== "none") {
      vistaModal.style.top = window.pageYOffset + "px";
    }
  }, { passive: true });

  console.log("JS listo ✅ Miniaturas cargadas:", LISTA.length);
});
