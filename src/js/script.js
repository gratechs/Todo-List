'use strict';

import 'core-js';
import 'regenerator-runtime';

const labelDateEl = document.querySelector('.date');

const btnAddTaskEl = document.querySelector('.btn');
const btnModalCloseTaskEl = document.querySelector('.modal-task__close');
const btnModalAddTaskEl = document.querySelector('.modal-task__btn');

const modalTaskEl = document.querySelector('.section-modal-task');
const overlayEl = document.querySelector('.overlay');

const inputEl = document.querySelector('.modal-task__input');
const inputErrorMsg = document.querySelector('.input-error-message');

const tasksContainerEl = document.querySelector('.section-tasks');
const error = document.querySelector('.error');

/////////////////////////////////////////
// Implementing date functionality

const now = new Date();
const locale = navigator.language;

const options = {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
};

labelDateEl.textContent = new Intl.DateTimeFormat(locale, options).format(now);
console.log(labelDateEl.textContent);

/////////////////////////////////////////
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
};

btnAddTaskEl.addEventListener('click', openModal);
btnModalCloseTaskEl.addEventListener('click', closeModal);
overlayEl.addEventListener('click', closeModal);

/////////////////////////////////////////
// Rendering inputed tasks to incomplete task section

btnModalAddTaskEl.addEventListener('click', function (e) {
  e.preventDefault();
  const inputData = inputEl.value;
  inputEl.focus();

  const taskHtml = ` 
    <div class="tasks">
      <input type="checkbox" id="t1" class="tasks__check" />
      <label for="t1" class="tasks__label tasks--completed-label"
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
    inputErrorMsg.classList.remove('hidden');
    return;
  }

  inputErrorMsg.classList.add('hidden');
  error.remove();
  tasksContainerEl.insertAdjacentHTML('afterbegin', taskHtml);
  inputEl.value = '';
  closeModal();
});
