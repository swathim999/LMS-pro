// Toggle FAQ Answers
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.question');
    const answer = item.querySelector('.answer');
    const icon = item.querySelector('.toggle-icon');
  
    question.addEventListener('click', () => {
      // Toggle answer visibility
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  
      // Toggle icon +/-
      icon.textContent = icon.textContent === '+' ? '-' : '+';
    });
  });
  