import 'core-js';
import 'regenerator-runtime';

const labelDateEl = document.querySelector('.date');
const btnAddTaskEl = document.querySelector('.btn');
const modalTaskEl = document.querySelector('.section-modal-task');
const btnModalCloseTaskEl = document.querySelector('.modal-task__close');
const btnModalAddTaskEl = document.querySelector('.modal-task__btn');
const overlayEl = document.querySelector('.overlay');

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

// Showing the modal window

const openModal = function () {
  modalTaskEl.classList.remove('hidden');
  overlayEl.classList.remove('hidden');
};

// Closing the modal window

const closeModal = function () {
  modalTaskEl.classList.add('hidden');
  overlayEl.classList.add('hidden');
};

btnAddTaskEl.addEventListener('click', openModal);
btnModalCloseTaskEl.addEventListener('click', closeModal);
overlayEl.addEventListener('click', closeModal);
