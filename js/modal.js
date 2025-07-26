document.addEventListener("DOMContentLoaded", function () {
  const modalTriggers = document.querySelectorAll("[data-modal-for]");
  const body = document.body;
  let activeModal = null;

  function openModal(modalName) {
      const modal = document.querySelector(`[data-modal-name="${modalName}"]`);
      if (!modal) return;

      if (!document.querySelector(".scrim")) {
          const scrim = document.createElement("div");
          scrim.classList.add("scrim");
          scrim.style.zIndex = "1000";
          body.appendChild(scrim);
          requestAnimationFrame(() => {
              body.classList.add("modal-manager-has-modal-active");
          });
          scrim.addEventListener("click", () => closeModal());
      }

      modal.classList.add("modal-active");
      modal.style.zIndex = "1001";
      activeModal = modal;

      trapFocus(modal);
      document.addEventListener("keydown", handleKeydown);

      const cancelBtn = modal.querySelector("[data-modal-cancel]");
      if (cancelBtn) {
          cancelBtn.addEventListener("click", closeModal);
      }
  }

  function closeModal() {
      if (!activeModal) return;
      activeModal.classList.remove("modal-active");
      body.classList.remove("modal-manager-has-modal-active");

      const scrim = document.querySelector(".scrim");
      if (scrim) {
          scrim.classList.add("fade-out");
          setTimeout(() => scrim.remove(), 300);
      }

      document.removeEventListener("keydown", handleKeydown);
      activeModal = null;
  }

  function handleKeydown(event) {
      if (event.key === "Escape") closeModal();
  }

  function trapFocus(modal) {
      const focusable = modal.querySelectorAll("button, input, textarea, select, a, [tabindex]:not([tabindex='-1'])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      modal.addEventListener("keydown", e => {
          if (e.key === "Tab") {
              if (e.shiftKey && document.activeElement === first) {
                  last.focus();
                  e.preventDefault();
              } else if (!e.shiftKey && document.activeElement === last) {
                  first.focus();
                  e.preventDefault();
              }
          }
      });

      first.focus();
  }

  modalTriggers.forEach(trigger => {
      trigger.addEventListener("click", () => {
          const modalName = trigger.getAttribute("data-modal-for");
          if (modalName) openModal(modalName);
      });
  });
});