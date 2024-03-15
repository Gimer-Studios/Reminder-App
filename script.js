// script.js
const reminderList = document.getElementById('reminder-list');
const newReminderInput = document.getElementById('new-reminder');

// Initialize reminders (Add local storage saving)
let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

// Adds logic and function to add reminders
function addReminder() {
    const newReminderText = newReminderInput.value.trim();
    if (newReminderText) {
        reminders.push(newReminderText);
        localStorage.setItem('reminders', JSON.stringify(reminders));
        displayReminders();
        newReminderInput.value = '';
    }
}

// Adds logic and function to display reminders 
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

// Adds logic and function to edit reminders
function editReminder(index) {
    const updatedReminder = prompt('Edit reminder:', reminders[index]);
    if (updatedReminder !== null) {
        reminders[index] = updatedReminder.trim();
        localStorage.setItem('reminders', JSON.stringify(reminders));
        displayReminders();
    }
}

// Adds logic and function to remove reminders
function removeReminder(index) {
    reminders.splice(index, 1);
    localStorage.setItem('reminders', JSON.stringify(reminders));
    displayReminders();
}

// Allow reminders to get displayed
displayReminders();
