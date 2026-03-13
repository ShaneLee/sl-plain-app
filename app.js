// Email submission handler
function submitForm(event, formData, formTitle) {
  event.preventDefault();

  const email = '{{EMAIL}}';
  const subject = formData.subject;
  const body = formData.body;

  // Create mailto link
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Open email client
  window.location.href = mailtoLink;

  // Show success message
  const successMsg = document.getElementById('successMessage');
  if (successMsg) {
    successMsg.classList.add('show');
    setTimeout(() => {
      successMsg.classList.remove('show');
    }, 3000);
  }

  // Clear form
  event.target.reset();
}

// Format date to YYYY-MM-DD
function formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
  return formatDate(new Date());
}

// Toggle chip selection
function toggleChip(element) {
  element.classList.toggle('selected');
}

// Get all selected chips
function getSelectedChips(containerSelector) {
  const chips = document.querySelectorAll(`${containerSelector} .chip.selected`);
  return Array.from(chips).map(chip => chip.textContent.trim());
}

// Initialize form with default values
function initializeForm() {
  // Set today's date on load
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    if (!input.value) {
      input.value = getTodayDate();
    }
  });

  // Set current time on load
  const timeInputs = document.querySelectorAll('input[type="time"]');
  timeInputs.forEach(input => {
    if (!input.value) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      input.value = `${hours}:${minutes}`;
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeForm);
