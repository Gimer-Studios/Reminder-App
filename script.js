// script.js
const reminderList = document.getElementById('reminder-list');
const newReminderInput = document.getElementById('new-reminder');
const themeToggle = document.getElementById('theme-toggle-checkbox');

let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
let isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;

// Function to save reminders to local storage
function saveReminders() {
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

// Function to add a new reminder
function addReminder() {
    const newReminderText = newReminderInput.value.trim();
    if (newReminderText) {
        reminders.push(newReminderText);
        saveReminders();
        displayReminders();
        newReminderInput.value = '';
    }
}

// Function to display reminders
function displayReminders() {
    reminderList.innerHTML = '';
    reminders.forEach((reminder, index) => {
        const reminderItem = document.createElement('div');
        reminderItem.classList.add('reminder-item');
        reminderItem.innerHTML = `
            <span>${reminder}</span>
            <button onclick="editReminder(${index})">Edit</button>
            <button onclick="removeReminder(${index})">Remove</button>
        `;
        reminderList.appendChild(reminderItem);
    });
}

// Function to edit a reminder
function editReminder(index) {
    const updatedReminder = prompt('Edit reminder:', reminders[index]);
    if (updatedReminder !== null) {
        reminders[index] = updatedReminder.trim();
        saveReminders();
        displayReminders();
    }
}

// Function to remove a reminder
function removeReminder(index) {
    reminders.splice(index, 1);
    saveReminders();
    displayReminders();
}

// Function to toggle dark mode
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    updateTheme();
}

// Function to create dots
function createDot() {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.left = Math.random() * window.innerWidth + 'px';
    dot.style.top = Math.random() * window.innerHeight + 'px';
    
    // Check if dot is within header or reminder list area, and adjust position if necessary
    if (dot.offsetTop < 100 || dot.offsetTop > window.innerHeight - 100) {
        dot.style.top = Math.random() * (window.innerHeight - 200) + 100 + 'px';
    }
    if (dot.offsetLeft < 100 || dot.offsetLeft > window.innerWidth - 100) {
        dot.style.left = Math.random() * (window.innerWidth - 200) + 100 + 'px';
    }
    
    document.body.appendChild(dot);
    
    // Animation for moving dots
    dot.animate([
        { transform: 'translate(0, 0)' },
        { transform: 'translate(' + (Math.random() * 20 - 10) + 'px, ' + (Math.random() * 20 - 10) + 'px)' }
    ], {
        duration: Math.random() * 4000 + 2000, // Random duration between 2 to 6 seconds
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    });
}

// Function to create multiple dots
function createDots(numDots) {
    for (let i = 0; i < numDots; i++) {
        createDot();
    }
}

// Function to update theme based on the mode
function updateTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    
    if (isDarkMode) {
        body.classList.add('dark-theme');
        body.style.backgroundColor = '#111'; // Set dark mode background color directly
        themeToggle.checked = true; // Set toggle switch to 'on' for dark mode
    } else {
        body.classList.remove('dark-theme');
        body.style.backgroundColor = '#f0f0f0'; // Set light mode background color directly
        themeToggle.checked = false; // Set toggle switch to 'off' for light mode
    }
}
// Call displayReminders() when the page loads
window.onload = () => {
    displayReminders();
    updateTheme();
    createDots(60);
};

// Call toggleDarkMode() when the theme toggle is changed
themeToggle.addEventListener('change', toggleDarkMode);
