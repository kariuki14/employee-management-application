function submitForm() {
  const firstName = document.getElementById("firstName")?.value.trim();
  const lastName = document.getElementById("lastName")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const dept = document.getElementById("department")?.value;
  const position = document.getElementById("position")?.value;

  if (!firstName || !lastName || !email || !phone || !dept || !position) {
    showToast("⚠️ Please fill in all required fields.", "info");
    return;
  }

  showToast("✅ Contact saved successfully!", "success");

  setTimeout(() => {
    resetForm();
  }, 1500);
}

function resetForm() {
  const inputs = document.querySelectorAll(
    "#contactForm input, #contactForm select, #contactForm textarea",
  );
  inputs.forEach((el) => {
    if (el.type === "radio" || el.type === "checkbox") {
      el.checked = false;
    } else {
      el.value = "";
    }
  });
}

function viewDetails(name, email, phone, dept, position) {
  const modal = document.getElementById("detailsModal");
  const content = document.getElementById("detailsContent");

  if (!modal || !content) return;

  const rows = [
    ["👤 Full Name", name],
    ["📧 Email", email],
    ["📞 Phone", phone],
    ["🏢 Department", dept],
    ["🏷️ Position", position],
  ];

  content.innerHTML = rows
    .map(
      ([label, value]) => `
    <div style="display:flex; gap:12px; align-items:baseline;">
      <span style="color:var(--text-muted); font-size:12px; min-width:110px;">${label}</span>
      <span style="font-weight:500;">${value}</span>
    </div>
  `,
    )
    .join("");

  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("detailsModal");
  if (modal) modal.style.display = "none";
}

document.addEventListener("click", function (e) {
  const modal = document.getElementById("detailsModal");
  if (modal && e.target === modal) closeModal();
});

function editContact(name) {
  alert(
    `Edit: ${name}\n\nIn a full application, this would open an edit form for this employee.`,
  );
}

function deleteContact(name) {
  const confirmed = confirm(`Are you sure you want to delete "${name}"?`);
  if (confirmed) {
    showToast(`🗑️ "${name}" has been deleted.`, "info");
  }
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toastMsg");

  if (!toast || !msg) return;

  msg.textContent = message;
  toast.className = `toast ${type}`;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });
  });

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
