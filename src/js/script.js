'use strict';

import 'core-js';
import 'regenerator-runtime';

const labelDateEl = document.querySelector('.date');
const incompleteLabelEl = document.querySelector('.incomplete-label');
const completedLabelEl = document.querySelector('.complete-label');

const btnAddTaskEl = document.querySelector('.btn');
const btnModalCloseTaskEl = document.querySelector('.modal-task__close');
const btnModalAddTaskEl = document.querySelector('.modal-task__btn');

const modalTaskEl = document.querySelector('.section-modal-task');
const overlayEl = document.querySelector('.overlay');

const inputEl = document.querySelector('.modal-task__input');
const inputErrorMsgEl = document.querySelector('.input-error-message');

const tasksIncompleteContainerEl = document.querySelector('.section-tasks');
const tasksCompletedContainerEl = document.querySelector('.section-completed');

const errorEl = document.querySelector('.error');

// Implementing date functionality
const now = new Date();
const locale = navigator.language;

const options = {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
};

labelDateEl.textContent = new Intl.DateTimeFormat(locale, options).format(now);

// Showing the modal window
const openModal = function () {
  modalTaskEl.classList.remove('hidden');
  overlayEl.classList.remove('hidden');
  inputEl.focus();
};

// Closing the modal window
const closeModal = function () {
  modalTaskEl.classList.add('hidden');
  overlayEl.classList.add('hidden');
  inputErrorMsgEl.classList.add('hidden');
};

// Listening for modal window clicks
btnAddTaskEl.addEventListener('click', openModal);
btnModalCloseTaskEl.addEventListener('click', closeModal);
overlayEl.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Rendering inputed tasks to incomplete task section
btnModalAddTaskEl.addEventListener('click', function (e) {
  e.preventDefault();
  const inputData = inputEl.value;
  inputEl.focus();

  // Creating a dynamic id
  let check = Math.random().toString();

  const taskIncompleteHtml = `
    <div class="tasks tasks--incomplete">
      <input type="checkbox" value="${inputData}" id="${check}" class="tasks__check" />
      <label for="${check}" class="tasks__label tasks--completed-label"
        ><span class="tasks__button"></span>${inputData}</label
      >
      <div class="tasks-btn">
        <button class="tasks-btn__edit">Edit</button>
        <button class="tasks-btn__delete">Delete</button>
      </div>
    </div>
    `;

  // Validating form input
  if (inputData === '') {
    // Displaying error message
    inputErrorMsgEl.classList.remove('hidden');
    return;
  }

  // Hiding error message
  inputErrorMsgEl.classList.add('hidden');

  // Deleting error message
  errorEl.remove();

  // Rendering inputed tasks
  tasksIncompleteContainerEl.insertAdjacentHTML(
    'afterbegin',
    taskIncompleteHtml
  );

  // Resetting inputed value
  inputEl.value = '';

  // Closing the add task modal
  closeModal();

  // Rendering the incomplete label heading
  incompleteLabelEl.classList.remove('hidden');

  // Adding checked tasks to completed tasks section
  const myCheckEl = document.getElementById(check);
  const tasksIncompleteHiddenEl = document.querySelector('.tasks--incomplete');

  myCheckEl.addEventListener('click', function (e) {
    console.log('Will it work?');
    console.log(e);

    // When checked
    if (myCheckEl.checked) {
      console.log('Checked');

      const tasksCompletedHtml = `
      <div class="tasks tasks--completed">
        <input type="checkbox" value="${inputData}" id="${check}" class="tasks__check" />
        <label for="${check}" class="tasks__label tasks--completed-label"
          ><span class="tasks__button"></span>${inputData}</label
        >
        <div class="tasks-btn">
          <button class="tasks-btn__edit">Edit</button>
          <button class="tasks-btn__delete">Delete</button>
        </div>
      </div>
    `;

      setTimeout(() => {
        // Rendering checked task
        tasksCompletedContainerEl.insertAdjacentHTML(
          'afterbegin',
          tasksCompletedHtml
        );

        // Rendering the completed label heading
        completedLabelEl.classList.remove('hidden');

        // Removing incomplete task
        tasksIncompleteHiddenEl.classList.add('hidden');
      }, 500);

      const tasksCompletedHiddenEl =
        document.querySelector('.tasks--completed');
    } else {
      // When unchecked
      console.log('Unchecked');

      // Rendering incomplete task
      tasksIncompleteHiddenEl.classList.remove('hidden');

      if (tasksCompletedHiddenEl) console.log('It is here!');
    }
  });
});
