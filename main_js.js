// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 250) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const menuIcon = document.getElementById('menuIcon');
const navMenu = document.querySelector('header nav ul');
let isActive = false;

menuToggle.addEventListener('click', () => {
    isActive = !isActive;
    
    if (isActive) {
        menuIcon.src = 'aktiv.svg';
        menuIcon.classList.add('active');
        navMenu.classList.add('active');
    } else {
        menuIcon.src = 'nicht aktiv.svg';
        menuIcon.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Quiz Data
const quizQuestions = [
    {
        question: "What is the minimum recommended length for a strong password?",
        answers: [
            { text: "6 characters", correct: false },
            { text: "8 characters", correct: false },
            { text: "12 characters", correct: true },
            { text: "16 characters", correct: false }
        ],
        explanation: "Security experts recommend passwords of at least 12 characters for adequate protection."
    },
    {
        question: "Which of the following is a sign of a phishing email?",
        answers: [
            { text: "Urgent language demanding immediate action", correct: true },
            { text: "Professional looking company logo", correct: false },
            { text: "Personalized greeting with your name", correct: false },
            { text: "Long detailed message", correct: false }
        ],
        explanation: "Phishing emails often create a sense of urgency to pressure you into making quick decisions without thinking."
    },
    {
        question: "What should you do if you receive a suspicious email asking for your password?",
        answers: [
            { text: "Reply with your password if it looks official", correct: false },
            { text: "Click the link to verify it's legitimate", correct: false },
            { text: "Delete it and report it to IT", correct: true },
            { text: "Forward it to colleagues for their opinion", correct: false }
        ],
        explanation: "Never provide passwords via email. Delete suspicious emails and report them to your IT security team."
    },
    {
        question: "What is two-factor authentication (2FA)?",
        answers: [
            { text: "Using two different passwords", correct: false },
            { text: "An additional verification step beyond password", correct: true },
            { text: "Logging in twice to confirm identity", correct: false },
            { text: "Having two security questions", correct: false }
        ],
        explanation: "2FA adds an extra layer of security by requiring a second form of verification, like a code sent to your phone."
    },
    {
        question: "Which type of information should you avoid posting on social media?",
        answers: [
            { text: "Your vacation plans and dates", correct: true },
            { text: "Your favorite hobbies", correct: false },
            { text: "Photos of your pets", correct: false },
            { text: "Your opinions on movies", correct: false }
        ],
        explanation: "Posting vacation plans can alert criminals that your home will be empty, making it a target for burglary."
    },
    {
        question: "What is the safest way to use public Wi-Fi?",
        answers: [
            { text: "Use it freely for all activities", correct: false },
            { text: "Only check email and social media", correct: false },
            { text: "Use a VPN for encrypted connection", correct: true },
            { text: "Disable firewall for faster connection", correct: false }
        ],
        explanation: "A VPN encrypts your internet traffic, protecting your data from being intercepted on public networks."
    },
    {
        question: "How often should you update your passwords?",
        answers: [
            { text: "Never, if it's strong enough", correct: false },
            { text: "Every month", correct: false },
            { text: "Every 3-6 months, or immediately after a breach", correct: true },
            { text: "Every year", correct: false }
        ],
        explanation: "Regular password updates and immediate changes after suspected breaches help maintain security."
    },
    {
        question: "What should you do before clicking a link in an email?",
        answers: [
            { text: "Click it immediately if it looks important", correct: false },
            { text: "Hover over it to check the actual URL", correct: true },
            { text: "Forward it to friends first", correct: false },
            { text: "Open it in incognito mode", correct: false }
        ],
        explanation: "Hovering reveals the true destination URL, helping you identify malicious links that may look legitimate."
    },
    {
        question: "What is the best practice for handling company data on personal devices?",
        answers: [
            { text: "Store it anywhere for convenience", correct: false },
            { text: "Share it via personal email", correct: false },
            { text: "Only use approved company applications and encryption", correct: true },
            { text: "Save it on public cloud services", correct: false }
        ],
        explanation: "Company data should only be accessed through approved, secure channels with proper encryption."
    },
    {
        question: "What makes a website secure for entering sensitive information?",
        answers: [
            { text: "It has lots of images", correct: false },
            { text: "The URL starts with 'https://' and shows a padlock", correct: true },
            { text: "It has a modern design", correct: false },
            { text: "It loads quickly", correct: false }
        ],
        explanation: "HTTPS encrypts data between your browser and the website, and the padlock indicates a valid security certificate."
    }
];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// DOM Elements
const questionText = document.getElementById('questionText');
const answerOptions = document.getElementById('answerOptions');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const results = document.getElementById('results');
const currentQuestionSpan = document.getElementById('currentQuestion');
const totalQuestionsSpan = document.getElementById('totalQuestions');
const questionCard = document.getElementById('questionCard');

// Initialize Quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    totalQuestionsSpan.textContent = quizQuestions.length;
    showQuestion();
}

// Show Question
function showQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    answerOptions.innerHTML = '';
    feedback.className = 'feedback';
    feedback.textContent = '';
    nextBtn.className = 'next-btn';
    selectedAnswer = null;
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('div');
        button.className = 'answer-option';
        button.textContent = answer.text;
        button.onclick = () => selectAnswer(index);
        answerOptions.appendChild(button);
    });
}

// Select Answer
function selectAnswer(index) {
    if (selectedAnswer !== null) return;
    
    selectedAnswer = index;
    const question = quizQuestions[currentQuestionIndex];
    const options = answerOptions.children;
    
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add('disabled');
        if (question.answers[i].correct) {
            options[i].classList.add('correct');
        }
    }
    
    options[index].classList.add('selected');
    
    if (question.answers[index].correct) {
        score++;
        feedback.className = 'feedback correct show';
        feedback.textContent = '✓ Correct! ' + question.explanation;
    } else {
        options[index].classList.add('incorrect');
        feedback.className = 'feedback incorrect show';
        feedback.textContent = '✗ Incorrect. ' + question.explanation;
    }
    
    nextBtn.classList.add('show');
}

// Next Question
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

// Show Results
function showResults() {
    questionCard.style.display = 'none';
    nextBtn.style.display = 'none';
    feedback.style.display = 'none';
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    let message = '';
    
    if (percentage >= 90) {
        message = 'Excellent! You have a strong understanding of internet security!';
    } else if (percentage >= 70) {
        message = 'Good job! You understand most security concepts, but review the areas you missed.';
    } else if (percentage >= 50) {
        message = 'Not bad, but there is room for improvement. Review the security guidelines.';
    } else {
        message = 'You should review all security topics carefully to better protect yourself online.';
    }
    
    results.innerHTML = `
        <h3>Quiz Complete!</h3>
        <p>You scored ${score} out of ${quizQuestions.length} (${percentage}%)</p>
        <p>${message}</p>
        <button class="restart-btn" onclick="restartQuiz()">Restart Quiz</button>
    `;
    results.classList.add('show');
}

// Restart Quiz
function restartQuiz() {
    questionCard.style.display = 'block';
    nextBtn.style.display = 'none';
    feedback.style.display = 'none';
    results.classList.remove('show');
    results.innerHTML = '';
    initQuiz();
}

// Start Quiz on Load
if (document.getElementById('quizContainer')) {
    initQuiz();
}
