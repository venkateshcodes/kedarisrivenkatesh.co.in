(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();

    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        items: 1,
        smartSpeed: 1500,
        dots: true,
        dotsData: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

})(jQuery);

// Custom Glow Cursor
document.addEventListener('DOMContentLoaded', () => {
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return; // Avoid errors if element not found

    document.addEventListener('mousemove', e => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mousedown', () => {
        glow.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    document.addEventListener('mouseup', () => {
        glow.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Enhanced Casino Widget Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabs = document.querySelectorAll('.casino-tab');
    const games = document.querySelectorAll('.casino-game');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show target game
            games.forEach(game => {
                game.classList.remove('active');
                if (game.id === targetTab) {
                    game.classList.add('active');
                }
            });
        });
    });
    
    // Card Game Logic
    const cards = document.querySelectorAll('#cards .card');
    const chips = document.querySelectorAll('#chips .chip');
    const dealBtn = document.getElementById('dealBtn');
    const spinBtn = document.getElementById('spinBtn');
    const resultDiv = document.getElementById('casinoResult');
    const progressBar = document.getElementById('analyticsProgress');
    
    let selectedCard = null;
    let selectedChip = null;
    let progress = 0;
    
    if (cards.length > 0 && chips.length > 0) {
        cards.forEach(card => {
            card.addEventListener('click', function() {
                cards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                selectedCard = this.getAttribute('data-value');
            });
        });
        
        chips.forEach(chip => {
            chip.addEventListener('click', function() {
                chips.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                selectedChip = this.getAttribute('data-value');
            });
        });
        
        if (dealBtn) {
            dealBtn.addEventListener('click', function() {
                if (!selectedCard || !selectedChip) {
                    resultDiv.innerHTML = '<div class="alert alert-warning">Please select both a data tool and an analysis value!</div>';
                    return;
                }
                
                // Add deal animation
                cards.forEach(card => {
                    card.classList.add('card-deal-anim');
                });
                
                // Simulate analysis
                setTimeout(() => {
                    const insights = [
                        `Using ${selectedCard} with ${selectedChip} data points revealed significant customer trends!`,
                        `${selectedCard} analysis of ${selectedChip} records identified key performance indicators.`,
                        `The ${selectedCard} tool processed ${selectedChip} data elements to uncover market patterns.`,
                        `With ${selectedCard}, we analyzed ${selectedChip} metrics to optimize business strategy.`
                    ];
                    
                    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
                    resultDiv.innerHTML = `<div class="alert alert-success">${randomInsight}</div>`;
                    
                    // Update progress
                    progress += 25;
                    if (progress > 100) progress = 100;
                    if (progressBar) {
                        progressBar.style.width = `${progress}%`;
                        progressBar.setAttribute('aria-valuenow', progress);
                    }
                    
                    // Add confetti for completion
                    if (progress === 100) {
                        createAnalyticsConfetti();
                        resultDiv.innerHTML += '<div class="alert alert-info mt-2">Data analysis complete! All insights generated.</div>';
                    }
                    
                    // Reset selections
                    cards.forEach(c => c.classList.remove('selected'));
                    chips.forEach(c => c.classList.remove('selected'));
                    selectedCard = null;
                    selectedChip = null;
                }, 1000);
            });
        }
        
        if (spinBtn) {
            spinBtn.addEventListener('click', function() {
                if (!selectedCard || !selectedChip) {
                    resultDiv.innerHTML = '<div class="alert alert-warning">Please select both a data tool and an analysis value!</div>';
                    return;
                }
                
                // Add spin animation to chips
                chips.forEach(chip => {
                    chip.classList.add('chips-spin');
                });
                
                setTimeout(() => {
                    chips.forEach(chip => {
                        chip.classList.remove('chips-spin');
                    });
                    
                    const outcomes = [
                        { type: 'success', message: `The ${selectedCard} analysis revealed a 15% increase in efficiency!` },
                        { type: 'info', message: `${selectedCard} identified new market opportunities in the ${selectedChip} dataset.` },
                        { type: 'warning', message: `The ${selectedCard} tool detected anomalies in ${selectedChip} records that need review.` },
                        { type: 'success', message: `Using ${selectedCard}, we optimized processes saving ${selectedChip} hours monthly.` }
                    ];
                    
                    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
                    resultDiv.innerHTML = `<div class="alert alert-${outcome.type}">${outcome.message}</div>`;
                    
                    // Reset selections
                    cards.forEach(c => c.classList.remove('selected'));
                    chips.forEach(c => c.classList.remove('selected'));
                    selectedCard = null;
                    selectedChip = null;
                }, 800);
            });
        }
    }
    
    // Slot Game Logic
    const spinSlotBtn = document.getElementById('spinSlotBtn');
    const slotResult = document.getElementById('slotResult');
    const reels = document.querySelectorAll('.reel');
    
    if (spinSlotBtn && reels.length > 0) {
        spinSlotBtn.addEventListener('click', function() {
            // Disable button during spin
            spinSlotBtn.disabled = true;
            if (slotResult) slotResult.textContent = "Analyzing data...";
            
            // Add spinning animation
            reels.forEach(reel => {
                reel.classList.add('spinning');
            });
            
            // Stop reels after random time
            setTimeout(() => {
                reels.forEach(reel => {
                    reel.classList.remove('spinning');
                    
                    // Randomly position reels
                    const randomPosition = Math.floor(Math.random() * 5) * -100;
                    reel.style.transform = `translateY(${randomPosition}px)`;
                });
                
                // Determine result
                const tools = ['SQL', 'Python', 'Excel', 'Power BI', 'Tableau'];
                const processes = ['Cleaning', 'Analysis', 'Visualization', 'Modeling', 'Reporting'];
                const outcomes = ['Insights', 'KPIs', 'Trends', 'Patterns', 'Solutions'];
                
                const randomTool = tools[Math.floor(Math.random() * tools.length)];
                const randomProcess = processes[Math.floor(Math.random() * processes.length)];
                const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
                
                const results = [
                    `Perfect match! ${randomTool} + ${randomProcess} = Actionable ${randomOutcome}`,
                    `Great combination! Using ${randomTool} for ${randomProcess} delivered valuable ${randomOutcome}`,
                    `Good match! The ${randomTool} and ${randomProcess} combination provided useful ${randomOutcome}`,
                    `Interesting pairing! ${randomTool} with ${randomProcess} approach revealed new ${randomOutcome}`
                ];
                
                const resultMessage = results[Math.floor(Math.random() * results.length)];
                if (slotResult) {
                    slotResult.innerHTML = `<div class="alert alert-success">${resultMessage}</div>`;
                }
                
                // Re-enable button
                spinSlotBtn.disabled = false;
                
                // Occasionally add confetti for special results
                if (randomTool === 'Power BI' && randomProcess === 'Visualization') {
                    createAnalyticsConfetti();
                }
            }, 2000);
        });
    }
    
    // Quiz Game Logic
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizFeedback = document.getElementById('quiz-feedback');
    const prevQuestionBtn = document.getElementById('prev-question');
    const nextQuestionBtn = document.getElementById('next-question');
    const quizProgressBar = document.getElementById('quizProgress');
    
    let currentQuestion = 0;
    let quizScore = 0;
    
    const quizData = [
        {
            question: "Which tool is best for creating interactive dashboards?",
            options: [
                { text: "Microsoft Word", correct: false },
                { text: "Power BI", correct: true },
                { text: "Adobe Photoshop", correct: false },
                { text: "AutoCAD", correct: false }
            ]
        },
        {
            question: "What does SQL stand for?",
            options: [
                { text: "Structured Question Language", correct: false },
                { text: "Structured Query Language", correct: true },
                { text: "Simple Question Language", correct: false },
                { text: "System Query Logic", correct: false }
            ]
        },
        {
            question: "Which of these is NOT a data visualization type?",
            options: [
                { text: "Bar chart", correct: false },
                { text: "Pie chart", correct: false },
                { text: "Scatter plot", correct: false },
                { text: "Data soup", correct: true }
            ]
        },
        {
            question: "What is the primary purpose of data cleaning?",
            options: [
                { text: "To make data look prettier", correct: false },
                { text: "To remove errors and inconsistencies", correct: true },
                { text: "To encrypt sensitive information", correct: false },
                { text: "To reduce file size", correct: false }
            ]
        }
    ];
    
    function loadQuestion(questionIndex) {
        const question = quizData[questionIndex];
        const questionElement = document.getElementById('quiz-question');
        if (!questionElement) return;
        
        questionElement.innerHTML = `<h5>${question.question}</h5>`;
        
        const optionsContainer = document.getElementById('quiz-options');
        if (!optionsContainer) return;
        
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'btn btn-outline-primary quiz-option';
            button.textContent = option.text;
            button.setAttribute('data-correct', option.correct);
            button.addEventListener('click', checkAnswer);
            optionsContainer.appendChild(button);
        });
        
        // Update progress
        if (quizProgressBar) {
            const progress = ((questionIndex + 1) / quizData.length) * 100;
            quizProgressBar.style.width = `${progress}%`;
            quizProgressBar.setAttribute('aria-valuenow', progress);
        }
        
        // Update navigation buttons
        if (prevQuestionBtn) prevQuestionBtn.disabled = questionIndex === 0;
        if (nextQuestionBtn) {
            nextQuestionBtn.textContent = questionIndex === quizData.length - 1 ? 'Finish Quiz' : 'Next Question';
        }
    }
    
    function checkAnswer(e) {
        const selectedOption = e.target;
        const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
        
        // Disable all options after selection
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.disabled = true;
            if (option.getAttribute('data-correct') === 'true') {
                option.classList.add('correct');
            } else if (option === selectedOption && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
        
        // Show feedback
        if (quizFeedback) {
            if (isCorrect) {
                quizScore++;
                quizFeedback.textContent = "Correct! Well done.";
                quizFeedback.className = 'alert alert-success';
            } else {
                quizFeedback.textContent = "Not quite right. The correct answer is highlighted.";
                quizFeedback.className = 'alert alert-danger';
            }
            quizFeedback.style.display = 'block';
        }
        
        // Update score display if it exists
        let scoreDisplay = document.getElementById('quiz-score');
        if (!scoreDisplay && quizFeedback) {
            scoreDisplay = document.createElement('div');
            scoreDisplay.id = 'quiz-score';
            quizFeedback.parentNode.insertBefore(scoreDisplay, quizFeedback.nextSibling);
        }
        if (scoreDisplay) {
            scoreDisplay.innerHTML = `<small>Score: ${quizScore}/${currentQuestion + 1}</small>`;
        }
    }
    
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', function() {
            if (currentQuestion < quizData.length - 1) {
                currentQuestion++;
                loadQuestion(currentQuestion);
                if (quizFeedback) quizFeedback.style.display = 'none';
            } else {
                // Quiz completed
                const quizContainer = document.getElementById('quiz-container');
                if (quizContainer) {
                    const percentage = Math.round((quizScore / quizData.length) * 100);
                    quizContainer.innerHTML = `
                        <div class="text-center">
                            <h4>Quiz Complete!</h4>
                            <p>Your score: ${quizScore}/${quizData.length} (${percentage}%)</p>
                            <div class="alert ${percentage >= 70 ? 'alert-success' : 'alert-warning'}">
                                ${percentage >= 70 ? 
                                    'Excellent! You have strong data analytics knowledge.' : 
                                    'Good effort! Consider reviewing data analytics fundamentals.'}
                            </div>
                            <button id="restart-quiz" class="btn btn-primary">Try Again</button>
                        </div>
                    `;
                    
                    document.getElementById('restart-quiz').addEventListener('click', function() {
                        currentQuestion = 0;
                        quizScore = 0;
                        loadQuestion(0);
                    });
                    
                    if (percentage >= 80) {
                        createAnalyticsConfetti();
                    }
                }
            }
        });
    }
    
    if (prevQuestionBtn) {
        prevQuestionBtn.addEventListener('click', function() {
            if (currentQuestion > 0) {
                currentQuestion--;
                loadQuestion(currentQuestion);
                if (quizFeedback) quizFeedback.style.display = 'none';
            }
        });
    }
    
    // Initialize quiz if elements exist
    if (document.getElementById('quiz-container')) {
        loadQuestion(0);
    }
});

// Verified Bot functionality
(function () {
    const botBtn = document.querySelector('.verified-bot-btn');
    const popup = document.getElementById('verifiedPopup');

    // create chat container when needed
    function ensureChat() {
        let chat = document.querySelector('.verified-chat');
        if (chat) return chat;

        chat = document.createElement('div');
        chat.className = 'verified-chat';
        chat.setAttribute('aria-hidden', 'true');
        chat.setAttribute('role', 'dialog');
        chat.setAttribute('aria-label', 'Verified Assistant Chat');
        chat.innerHTML = `
            <button class="verified-chat-close" aria-label="Close chat">&times;</button>
            <div class="verified-chat-messages" role="log" aria-live="polite"></div>
            <div class="verified-chat-actions">
                <button class="verified-chat-btn" data-msg="Hi — I'm Venky's assistant. Need help with your portfolio?">Show Intro</button>
                <button class="verified-chat-btn" data-msg="View my credentials & projects on GitHub.">Show Link</button>
            </div>
        `;
        document.body.appendChild(chat);

        // close button
        chat.querySelector('.verified-chat-close').addEventListener('click', () => {
            chat.classList.remove('open');
        });

        // quick action buttons
        chat.querySelectorAll('.verified-chat-btn').forEach(b => {
            b.addEventListener('click', (e) => {
                const text = e.currentTarget.getAttribute('data-msg');
                showBotMessage(text);
            });
        });

        return chat;
    }

    // typing / message rendering
    function showBotMessage(text, msPerChar = 20) {
        const chat = ensureChat();
        const container = chat.querySelector('.verified-chat-messages');

        // typing indicator
        const typing = document.createElement('div');
        typing.className = 'verified-typing';
        typing.innerHTML = '<span></span><span></span><span></span>';
        container.appendChild(typing);
        container.scrollTop = container.scrollHeight;

        // simulate typing then replace with message
        let i = 0;
        const typed = [];
        const typeInterval = setInterval(() => {
            typed.push(text[i++] || '');
            if (i > text.length) {
                clearInterval(typeInterval);
                container.removeChild(typing);
                const msg = document.createElement('div');
                msg.className = 'msg bot';
                msg.textContent = text;
                container.appendChild(msg);
                container.scrollTop = container.scrollHeight;
            }
        }, msPerChar);
    }

    // optional: show a short ephemeral highlight message when clicking the bot
    function showAttractMessage() {
        showBotMessage("Hello! Click the buttons to view a quick intro or credentials.", 18);
    }

    if (botBtn) {
        botBtn.addEventListener('click', (evt) => {
            evt.preventDefault();
            const chat = ensureChat();
            // toggle open/close
            const isOpen = chat.classList.contains('open');
            if (!isOpen) {
                // position chat near the button (keeps responsive)
                const rect = botBtn.getBoundingClientRect();
                // prefer CSS positioning but adjust if needed (keeps simple)
                chat.style.right = (window.innerWidth - rect.right + 30) + 'px';
                chat.style.bottom = (window.innerHeight - rect.top + 10) + 'px';
                chat.classList.add('open');
                showAttractMessage();
            } else {
                chat.classList.remove('open');
            }
        });
    }
})();

// Initialize all tooltips
$(document).ready(function(){
    $('[data-bs-toggle="tooltip"]').tooltip();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            if (!name.value.trim()) {
                name.classList.add('is-invalid');
                isValid = false;
            } else {
                name.classList.remove('is-invalid');
            }
            
            if (!email.value.trim() || !email.value.includes('@')) {
                email.classList.add('is-invalid');
                isValid = false;
            } else {
                email.classList.remove('is-invalid');
            }
            
            if (!subject.value.trim()) {
                subject.classList.add('is-invalid');
                isValid = false;
            } else {
                subject.classList.remove('is-invalid');
            }
            
            if (!message.value.trim()) {
                message.classList.add('is-invalid');
                isValid = false;
            } else {
                message.classList.remove('is-invalid');
            }
            
            if (isValid) {
                // Here you would normally submit the form
                alert('Form submitted successfully!');
                contactForm.reset();
            }
        });
    }
});

// Data Insight Challenge Functionality
document.addEventListener('DOMContentLoaded', function() {
    const dataItemCards = document.querySelectorAll('.data-item-card');
    const analyzeDataBtn = document.getElementById('analyzeDataBtn');
    const selectedToolElement = document.getElementById('selectedTool');
    const selectedDataElement = document.getElementById('selectedData');
    const resultsSection = document.getElementById('dataInsights');
    const insightText = document.getElementById('insightText');
    const efficiencyMetric = document.getElementById('efficiencyMetric');
    const accuracyMetric = document.getElementById('accuracyMetric');
    const speedMetric = document.getElementById('speedMetric');
    
    // State
    let selectedTool = null;
    let selectedData = null;
    
    // Insights data matching your portfolio theme
    const insightsData = {
        'SQL': {
            '100': {
                insight: "SQL efficiently processed 100 records, identifying key customer segments with 95% accuracy. Perfect for quick data validation and small-scale analysis with fast query execution.",
                efficiency: 92,
                accuracy: 95,
                speed: 88
            },
            '250': {
                insight: "SQL handled 250 records seamlessly, uncovering sales trends across multiple regions. Ideal for medium-sized dataset analysis and comprehensive business reporting.",
                efficiency: 85,
                accuracy: 92,
                speed: 82
            },
            '500': {
                insight: "SQL demonstrated robust performance with 500 records, revealing complex customer behavior patterns and purchase correlations through advanced query optimization.",
                efficiency: 78,
                accuracy: 89,
                speed: 75
            }
        },
        'Python': {
            '100': {
                insight: "Python's pandas library quickly analyzed 100 records, identifying outliers and generating predictive models with high precision using machine learning algorithms.",
                efficiency: 88,
                accuracy: 97,
                speed: 85
            },
            '250': {
                insight: "Python processed 250 records with advanced machine learning algorithms, uncovering hidden patterns and generating actionable insights for strategic decision-making.",
                efficiency: 82,
                accuracy: 94,
                speed: 80
            },
            '500': {
                insight: "Python efficiently handled 500 records using distributed computing, providing deep learning insights and automated reporting for enterprise-level analytics.",
                efficiency: 75,
                accuracy: 91,
                speed: 72
            }
        },
        'Power BI': {
            '100': {
                insight: "Power BI created interactive dashboards from 100 records, enabling real-time data visualization and stakeholder-friendly reports with drill-down capabilities.",
                efficiency: 95,
                accuracy: 93,
                speed: 90
            },
            '250': {
                insight: "Power BI transformed 250 records into comprehensive business intelligence dashboards with advanced KPIs, filtering options, and data storytelling features.",
                efficiency: 88,
                accuracy: 90,
                speed: 85
            },
            '500': {
                insight: "Power BI managed 500 records to build enterprise-level dashboards with advanced analytics, forecasting capabilities, and comprehensive data governance.",
                efficiency: 80,
                accuracy: 87,
                speed: 78
            }
        }
    };
    
    // Item selection functionality
    dataItemCards.forEach(card => {
        card.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const value = this.getAttribute('data-value');
            
            // Remove selection from other cards of same type
            document.querySelectorAll(`.data-item-card[data-type="${type}"]`).forEach(item => {
                item.classList.remove('selected');
            });
            
            // Add selection to clicked card
            this.classList.add('selected');
            
            // Update selection state
            if (type === 'tool') {
                selectedTool = value;
                selectedToolElement.textContent = value;
            } else if (type === 'data') {
                selectedData = value;
                selectedDataElement.textContent = value;
            }
            
            // Enable analyze button if both selections are made
            updateAnalyzeButton();
        });
    });
    
    // Update analyze button state
    function updateAnalyzeButton() {
        if (selectedTool && selectedData) {
            analyzeDataBtn.disabled = false;
            analyzeDataBtn.classList.remove('btn-secondary');
            analyzeDataBtn.classList.add('btn-primary');
        } else {
            analyzeDataBtn.disabled = true;
            analyzeDataBtn.classList.remove('btn-primary');
            analyzeDataBtn.classList.add('btn-secondary');
        }
    }
    
    // Analyze button functionality
    analyzeDataBtn.addEventListener('click', function() {
        if (!selectedTool || !selectedData) return;
        
        // Show loading state
        const originalText = analyzeDataBtn.innerHTML;
        analyzeDataBtn.innerHTML = '<span class="btn-text">Analyzing...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin me-2"></i></span>';
        analyzeDataBtn.disabled = true;
        
        // Simulate analysis delay
        setTimeout(() => {
            // Get insights based on selection
            const insight = insightsData[selectedTool][selectedData];
            
            // Update insight text
            insightText.textContent = insight.insight;
            
            // Animate metrics
            animateMetric(efficiencyMetric, insight.efficiency);
            animateMetric(accuracyMetric, insight.accuracy);
            animateMetric(speedMetric, insight.speed);
            
            // Show results section with smooth animation
            resultsSection.classList.add('visible');
            
            // Reset button
            analyzeDataBtn.innerHTML = originalText;
            analyzeDataBtn.disabled = false;
            
            // Scroll to results smoothly
            resultsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest',
                inline: 'nearest'
            });
            
            // Add confetti for successful analysis
            createAnalyticsConfetti();
        }, 1500);
    });
    
    // Animate metric counting
    function animateMetric(element, targetValue) {
        let currentValue = 0;
        const increment = targetValue / 50;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
                element.classList.remove('animated');
            }
            element.textContent = Math.round(currentValue) + '%';
            element.classList.add('animated');
        }, 30);
    }
    
    // Initialize
    updateAnalyzeButton();
    
    // Add hover effects for better UX
    dataItemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 12px rgba(13, 110, 253, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });
    });
});

// Analytics-themed confetti function (reusable)
function createAnalyticsConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'analytics-confetti';
    document.body.appendChild(confettiContainer);
    
    const analyticsIcons = ['📊', '📈', '📉', '🔍', '💡', '📋', '🎯', '✅', 'SQL', 'PY', 'PB', 'EX'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'analytics-particle';
        confetti.textContent = analyticsIcons[Math.floor(Math.random() * analyticsIcons.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        // Random colors for variety
        const colors = ['#0d6efd', '#198754', '#dc3545', '#ffc107', '#0dcaf0', '#6f42c1'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.color = '#fff';
        
        confettiContainer.appendChild(confetti);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        if (confettiContainer.parentNode) {
            confettiContainer.parentNode.removeChild(confettiContainer);
        }
    }, 3000);
}
