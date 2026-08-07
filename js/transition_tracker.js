document.addEventListener('DOMContentLoaded', function() {
  const direction = sessionStorage.getItem('direction');
  if (direction) {
    document.documentElement.dataset.direction = direction;
  }
});

function rightDirection() {
  document.documentElement.dataset.direction = 'right';
  sessionStorage.setItem('direction', 'right');
}

function noneDirection() {
  document.documentElement.dataset.direction = 'none';
  sessionStorage.setItem('direction', 'none');
}

function leftDirection() {
  document.documentElement.dataset.direction = 'left';
  sessionStorage.setItem('direction', 'left');
}

function downDirection() {
  document.documentElement.dataset.direction = 'down';
  sessionStorage.setItem('direction', 'down');
}

function upDirection() {
  document.documentElement.dataset.direction = 'up';
  sessionStorage.setItem('direction', 'up');
}