// ── Utilities ────────────────────────────────────────────────────────────────

function submitForm(event, formData, successId) {
  event.preventDefault();

  const email = '{{EMAIL}}';
  const subject = formData.subject;
  const body = formData.body || '';

  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const successMsg = document.getElementById(successId);
  if (successMsg) {
    successMsg.classList.add('show');
    setTimeout(() => successMsg.classList.remove('show'), 3000);
  }

  event.target.reset();
}

function formatDate(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

function getTodayDate() {
  return formatDate(new Date());
}

function toggleChip(element) {
  element.classList.toggle('selected');
}

function getSelectedChips(containerSelector) {
  const chips = document.querySelectorAll(`${containerSelector} .chip.selected`);
  return Array.from(chips).map(chip => chip.textContent.trim());
}

function initializeDateTimeInputs() {
  document.querySelectorAll('input[type="date"]').forEach(input => {
    if (!input.value) input.value = getTodayDate();
  });
  document.querySelectorAll('input[type="time"]').forEach(input => {
    if (!input.value) {
      const now = new Date();
      input.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }
  });
}

// ── SPA Router ───────────────────────────────────────────────────────────────

function navigateTo(hash) {
  const target = hash.replace(/^#/, '') || 'home';
  const pageId = `page-${target}`;

  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));

  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add('active');
  } else {
    document.getElementById('page-home').classList.add('active');
  }

  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', () => navigateTo(window.location.hash));

// ── Form Handlers ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initializeDateTimeInputs();
  navigateTo(window.location.hash);

  // Mood Tracking
  document.getElementById('moodForm').addEventListener('submit', function(e) {
    submitForm(e, {
      subject: `Mood ${document.getElementById('mood').value}`,
      body: document.getElementById('moodNotes').value
    }, 'moodSuccess');
  });

  // Spend Tracking
  document.getElementById('spendForm').addEventListener('submit', function(e) {
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('spendDescription').value;
    const category = document.getElementById('spendCategory').value;
    const account = document.getElementById('accountAlias').value;
    const date = document.getElementById('spendDate').value;
    submitForm(e, {
      subject: `Spend ${amount}, ${description}, ${category}, ${account}, ${date}`,
      body: document.getElementById('spendNotes').value
    }, 'spendSuccess');
  });

  // Idea Bucket
  document.getElementById('ideaForm').addEventListener('submit', function(e) {
    const idea = document.getElementById('idea').value;
    const category = document.getElementById('ideaCategory').value;
    submitForm(e, {
      subject: `idea ${idea} @${category}`,
      body: document.getElementById('ideaNotes').value
    }, 'ideaSuccess');
  });

  // Weight Tracking
  document.getElementById('weightForm').addEventListener('submit', function(e) {
    const weight = document.getElementById('weight').value;
    const bodyFat = document.getElementById('bodyFat').value || 'N/A';
    const bodyWater = document.getElementById('bodyWater').value || 'N/A';
    const muscleMass = document.getElementById('muscleMass').value || 'N/A';
    const visceralFat = document.getElementById('visceralFat').value || 'N/A';
    const calorieIntake = document.getElementById('calorieIntake').value || 'N/A';
    const date = document.getElementById('weightDate').value;
    submitForm(e, {
      subject: `Weight ${weight}kg, BF${bodyFat}%, BW${bodyWater}%, MM${muscleMass}kg, VF${visceralFat}, Cals${calorieIntake}, ${date}`,
      body: ''
    }, 'weightSuccess');
  });

  // Health Metrics
  document.getElementById('healthForm').addEventListener('submit', function(e) {
    const heartRate = document.getElementById('heartRate').value;
    const systolic = document.getElementById('systolic').value;
    const diastolic = document.getElementById('diastolic').value;
    const datetime = document.getElementById('healthDatetime').value;
    submitForm(e, {
      subject: `Health: HR${heartRate}bpm, BP${systolic}/${diastolic}mmHg, ${datetime}`,
      body: document.getElementById('healthComments').value
    }, 'healthSuccess');
  });

  // Time Tracking
  document.getElementById('timeForm').addEventListener('submit', function(e) {
    const task = document.getElementById('timeTask').value;
    const project = document.getElementById('timeProject').value;
    submitForm(e, {
      subject: `Time: ${task}${project ? ' - ' + project : ''}`
    }, 'timeSuccess');
  });

  // Todos
  document.getElementById('taskForm').addEventListener('submit', function(e) {
    const task = document.getElementById('taskText').value;
    const category = document.getElementById('taskCategory').value;
    submitForm(e, {
      subject: `TODO: ${task}${category ? ' [' + category + ']' : ''}`
    }, 'taskSuccess');
  });

  // App Triggers
  document.getElementById('triggerForm').addEventListener('submit', function(e) {
    submitForm(e, {
      subject: `trigger ${document.getElementById('trigger').value}`,
      body: ''
    }, 'triggerSuccess');
  });

  // Create Account
  document.getElementById('accountForm').addEventListener('submit', function(e) {
    const alias = document.getElementById('accountAliasInput').value;
    const name = document.getElementById('accountName').value;
    const type = document.getElementById('accountType').value;
    const balance = document.getElementById('balance').value;
    const interestRate = document.getElementById('interestRate').value;
    const limit = document.getElementById('limit').value || 'N/A';
    const accountNumber = document.getElementById('accountNumber').value;
    const sortCode = document.getElementById('sortCode').value;
    submitForm(e, {
      subject: `Create Account: ${name} (${alias})`,
      body: `Account Alias: ${alias}\nAccount Name: ${name}\nType: ${type}\nBalance: £${balance}\nInterest Rate: ${interestRate}%\nLimit: £${limit}\nAccount Number: ${accountNumber}\nSort Code: ${sortCode}`
    }, 'accountSuccess');
  });

  // Add Book
  document.getElementById('bookForm').addEventListener('submit', function(e) {
    const bookSearch = document.getElementById('bookSearch').value;
    const isbn = document.getElementById('isbn').value || 'N/A';
    const mainShelf = document.getElementById('mainShelf').value;
    const position = document.getElementById('position').value || 'N/A';
    const additionalShelves = getSelectedChips('#shelvesChips').join(', ') || 'None';
    submitForm(e, {
      subject: `Add Book: ${bookSearch}`,
      body: `Query: ${bookSearch}\nISBN: ${isbn}\nMain Shelf: ${mainShelf}\nAdditional Shelves: ${additionalShelves}\nPosition: ${position}`
    }, 'bookSuccess');
  });

  // Car Cost Calculator
  document.getElementById('carForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const mileage = parseFloat(document.getElementById('mileage').value);
    const fuelCost = parseFloat(document.getElementById('fuelCost').value);
    const urbanMpg = parseFloat(document.getElementById('urbanMpg').value);

    const gallonsPerYear = mileage / urbanMpg;
    const litresPerYear = gallonsPerYear * 4.54609;
    const yearlyFuelSpend = litresPerYear * fuelCost;
    const maintenanceEstimate = 500;
    const totalYearlyCost = yearlyFuelSpend + maintenanceEstimate;

    document.getElementById('yearlyFuelSpend').textContent = '£' + yearlyFuelSpend.toFixed(2);
    document.getElementById('totalYearlyCost').textContent = '£' + totalYearlyCost.toFixed(2);
    document.getElementById('carResults').style.display = 'block';

    submitForm(e, {
      subject: `Car Cost: £${yearlyFuelSpend.toFixed(2)}/year fuel, £${totalYearlyCost.toFixed(2)}/year total`,
      body: `Yearly Mileage: ${mileage} miles\nFuel Cost: £${fuelCost}/litre\nUrban MPG: ${urbanMpg}\n\nCalculation Results:\nYearly Fuel Spend: £${yearlyFuelSpend.toFixed(2)}\nMaintenance Estimate: £${maintenanceEstimate.toFixed(2)}\nTotal Yearly Cost: £${totalYearlyCost.toFixed(2)}`
    }, 'carSuccess');
  });
});
