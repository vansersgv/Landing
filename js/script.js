document.getElementById('formulario').addEventListener('submit', function(e) {
  e.preventDefault(); 

  const feedbackDiv = document.getElementById('feedback');
  feedbackDiv.style.display = 'none'; 

  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const email = document.getElementById('email').value.trim();
  const localidad = document.getElementById('localidad').value.trim();
  if (!nombre || !telefono) {
    feedbackDiv.textContent = 'Por favor completá Nombre y Teléfono.';
    feedbackDiv.className = 'feedback-message error';
    feedbackDiv.style.display = 'block';
    return;
  }

  const numeroWhatsApp = '5491180591305';

  let mensajeWA = `*Nuevo Lead de Prepaga (TuPrepaga):*\n\n`;
  mensajeWA += `*Nombre:* ${nombre}\n`;
  mensajeWA += `*Teléfono:* ${telefono}\n`;
  if (email) {
    mensajeWA += `*Email:* ${email}\n`;
  }
  if (localidad) {
    mensajeWA += `*Localidad:* ${localidad}\n`;
  }
  mensajeWA += `\nEnviado desde la Landing Page.`;

  const mensajeCodificado = encodeURIComponent(mensajeWA);
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

  feedbackDiv.textContent = '¡Gracias! Serás redirigido a WhatsApp para enviar tu consulta.';
  feedbackDiv.className = 'feedback-message success';
  feedbackDiv.style.display = 'block';

  setTimeout(() => {
    window.open(urlWhatsApp, '_blank');
    document.getElementById('formulario').reset();
    setTimeout(() => {
        feedbackDiv.style.display = 'none';
    }, 5000);
  }, 1500); 
});

// NUEVO: Script para el botón CTA del Hero con scroll y foco en el input de nombre
document.querySelectorAll('a.hero-cta-button[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevenir el comportamiento de anclaje por defecto para controlarlo nosotros

        const targetId = this.getAttribute('href').substring(1); // Obtener el ID sin el '#'
        const targetElement = document.getElementById(targetId); // El formulario en sí
        const nombreInput = document.getElementById('nombre'); // El input de nombre
            if (targetElement) {
                targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Puedes usar 'center' o 'start' para la alineación vertical del scroll
                });

            // Hacemos foco en el input de nombre DESPUÉS de que el scroll haya tenido tiempo de completarse.
            // Un pequeño delay puede ayudar a asegurar que el elemento sea visible y enfocable.
            setTimeout(() => {
                if (nombreInput) {
                    nombreInput.focus();
            }
            }, 500); // 500ms de delay, puedes ajustar este valor o incluso probar sin delay
    }
});
});

// NUEVO/MODIFICADO: Scroll y foco para los botones "Me interesa este plan"
document.querySelectorAll('a.plan-cta-button[href^="#formulario"], a.hero-cta-button[href^="#formulario"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 

        // Asegurarse que la pestaña "Personas" esté activa antes de hacer scroll y foco
        const heroFormContainer = document.getElementById('hero-form'); // Contenedor del formulario con pestañas
        const personasTabLink = heroFormContainer ? heroFormContainer.querySelector('.tab-link[data-tab="personas"]') : null;
        const personasTabContent = document.getElementById('personas');
        
        // Seleccionar todos los links y contenidos de pestañas para poder desactivarlos si es necesario
        const allTabLinks = heroFormContainer ? heroFormContainer.querySelectorAll('.tab-link') : [];
        const allTabContents = heroFormContainer ? heroFormContainer.querySelectorAll('.tab-content') : [];

        // 1. Asegurarse que la pestaña "Personas" esté activa
        if (personasTabLink && !personasTabLink.classList.contains('active')) {
            // Quitar active de todas las pestañas (botones y contenido)
            allTabLinks.forEach(item => item.classList.remove('active'));
            allTabContents.forEach(item => item.classList.remove('active'));
            // Activar pestaña personas (botón y contenido)
            personasTabLink.classList.add('active');
            if (personasTabContent) {
                personasTabContent.classList.add('active');
            }
        }

        // 2. Obtener el input "nombre" para hacer scroll y foco
        const nombreInputElement = document.getElementById('nombre'); 

        if (nombreInputElement) {
            // Hacer scroll para que el input "nombre" quede visible en la parte superior
            nombreInputElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // 'start' intenta alinear la parte superior del elemento con la parte superior del viewport
                               // Puedes probar con 'center' si 'start' no te gusta.
            });

            // 3. Hacer foco en el input "nombre" después de un breve delay
            setTimeout(() => {
                nombreInputElement.focus();
            }, 650); // Aumentamos ligeramente el delay para asegurar que el scroll se complete bien
        }
    });
});

// Funcionalidad para Pestañas del Formulario del Hero
const tabLinks = document.querySelectorAll('.hero-form-container .tab-link');
const tabContents = document.querySelectorAll('.hero-form-container .tab-content');

tabLinks.forEach(link => {
  link.addEventListener('click', () => {
    const tabId = link.getAttribute('data-tab');

    // Quitar clase 'active' de todos los links y contenidos
    tabLinks.forEach(item => item.classList.remove('active'));
    tabContents.forEach(item => item.classList.remove('active'));

    // Añadir clase 'active' al link clickeado y al contenido correspondiente
    link.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});

// Lógica para el formulario de EMPRESAS (similar al de personas)
const formularioEmpresas = document.getElementById('formulario-empresas');
if (formularioEmpresas) {
  formularioEmpresas.addEventListener('submit', function(e) {
    e.preventDefault();
    const feedbackDivEmpresas = document.getElementById('feedback-empresas');
    feedbackDivEmpresas.style.display = 'none';

    const nombreEmpresa = document.getElementById('empresa-nombre').value.trim();
    const cuitEmpresa = document.getElementById('empresa-cuit').value.trim();
    const contactoNombre = document.getElementById('empresa-contacto-nombre').value.trim();
    const telefonoEmpresa = document.getElementById('empresa-telefono').value.trim();
    const emailEmpresa = document.getElementById('empresa-email').value.trim();
    const cantidadEmpleados = document.getElementById('empresa-cantidad-empleados').value.trim();

    if (!nombreEmpresa || !cuitEmpresa || !contactoNombre || !telefonoEmpresa) {
      feedbackDivEmpresas.textContent = 'Por favor completá los campos obligatorios de empresa.';
      feedbackDivEmpresas.className = 'feedback-message error';
      feedbackDivEmpresas.style.display = 'block';
      return;
    }

    const numeroWhatsApp = '5491180591305'; // Mismo número de WhatsApp

    let mensajeWA = `*Nuevo Lead EMPRESA (TuPrepaga):*\n\n`;
    mensajeWA += `*Empresa:* ${nombreEmpresa}\n`;
    mensajeWA += `*CUIT:* ${cuitEmpresa}\n`;
    mensajeWA += `*Contacto:* ${contactoNombre}\n`;
    mensajeWA += `*Teléfono Contacto:* ${telefonoEmpresa}\n`;
    if (emailEmpresa) {
      mensajeWA += `*Email Contacto:* ${emailEmpresa}\n`;
    }
    if (cantidadEmpleados) {
      mensajeWA += `*Cantidad Empleados (aprox.):* ${cantidadEmpleados}\n`;
    }
    mensajeWA += `\nEnviado desde la Landing Page (Pestaña Empresas).`;

    const mensajeCodificado = encodeURIComponent(mensajeWA);
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    feedbackDivEmpresas.textContent = '¡Gracias! Serás redirigido a WhatsApp para enviar tu consulta de empresa.';
    feedbackDivEmpresas.className = 'feedback-message success';
    feedbackDivEmpresas.style.display = 'block';

    setTimeout(() => {
      window.open(urlWhatsApp, '_blank');
      this.reset(); // Usar this.reset() para el formulario actual
      setTimeout(() => {
          feedbackDivEmpresas.style.display = 'none';
      }, 5000);
    }, 1500);
  });
}
// Acordeón para la sección de Planes
const planHeaders = document.querySelectorAll('.plan-header');

planHeaders.forEach(header => {
  header.addEventListener('click', function() {
    const currentContent = this.nextElementSibling;
    const isActive = this.classList.contains('active');

    // Cerrar todos los paneles antes de abrir el actual (si no es el que ya está activo y se va a cerrar)
    planHeaders.forEach(otherHeader => {
      if (otherHeader !== this) { // No procesar el header clickeado en este bucle
        otherHeader.classList.remove('active');
        const otherContent = otherHeader.nextElementSibling;
        otherContent.style.maxHeight = null;
        otherContent.style.paddingTop = null;
        otherContent.style.paddingBottom = null;
      }
    });

    // Alternar el panel clickeado
    if (isActive) { // Si estaba activo, ahora se cierra
      this.classList.remove('active');
      currentContent.style.maxHeight = null;
      currentContent.style.paddingTop = null;
      currentContent.style.paddingBottom = null;
    } else { // Si estaba cerrado, ahora se abre
      this.classList.add('active');
      currentContent.style.paddingTop = '15px';
      currentContent.style.paddingBottom = '15px';
      currentContent.style.maxHeight = currentContent.scrollHeight + "px";
    }
  });
});
