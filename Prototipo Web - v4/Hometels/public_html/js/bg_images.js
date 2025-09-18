document.querySelectorAll('.matriz-botones button').forEach(button => {
  const img = button.getAttribute('data-img');
  if (img) {
    button.style.backgroundImage = `url('${img}')`;
  }
});