const STORAGE_PREFIX = 'userProgress_';
let currentListName = "";
let currentIndex = 0;
let questions = [];

function loadProgress(listName) {
  currentIndex = parseInt(localStorage.getItem(STORAGE_PREFIX + listName)) || 0;
}

function saveProgress() {
  localStorage.setItem(STORAGE_PREFIX + currentListName, currentIndex);
}

function updateUI() {
  document.getElementById('questionText').textContent = questions[currentIndex];
  document.getElementById('prevBtn').disabled = currentIndex === 0;
  document.getElementById('nextBtn').disabled = currentIndex === questions.length - 1;
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    saveProgress();
    updateUI();
  }
}

function nextQuestion() {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    saveProgress();
    updateUI();
  }
}

function populateSelect() {
  const select = document.getElementById('listSelect');
  Object.keys(lists).forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });
  select.addEventListener('change', () => {
    currentListName = select.value;
    questions = lists[currentListName];
    loadProgress(currentListName);
    updateUI();
  });
}

window.onload = () => {
  populateSelect();
  const defaultList = Object.keys(lists)[0];
  document.getElementById('listSelect').value = defaultList;
  currentListName = defaultList;
  questions = lists[currentListName];
  loadProgress(currentListName);
  updateUI();
};
