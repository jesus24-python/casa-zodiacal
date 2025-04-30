const toggleBtn = document.getElementById('toggleContact');
const contactOptions = document.getElementById('contactOptions');

toggleBtn.addEventListener('click', () => {
  contactOptions.style.display =
    contactOptions.style.display === 'flex' ? 'none' : 'flex';
});




