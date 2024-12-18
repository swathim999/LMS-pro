// Optional: Add interaction to course cards
document.querySelectorAll(".course-card").forEach((card) => {
    card.addEventListener("click", () => {
        alert("Course Selected!");
    });
});

const cards = document.querySelectorAll('.testimonial-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});


// Get all FAQ items
const faqItems = document.querySelectorAll('.faq-item');

// Loop through each FAQ item to add event listeners
faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');

    question.addEventListener('click', () => {
        // Toggle answer visibility
        answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';

        // Toggle '+' and '−' symbols
        toggle.textContent = (toggle.textContent === '+') ? '−' : '+';

        // Rotate toggle symbol
        toggle.style.transform = (toggle.textContent === '−') ? 'rotate(180deg)' : 'rotate(0deg)';
    });
});
