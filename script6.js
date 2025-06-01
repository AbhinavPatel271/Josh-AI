let userDetails = {
    category: '',
    gender: '',
    mainsRank: '',
    advancedRank: ''
};
let mathInterval, physicsInterval, chemInterval;
let chatHistory = [];
let apiResponseReceived = false;
let collegesData = null;
// Initialize animated background
function initAnimatedBackground() {
    const bg = document.getElementById('animatedBg');
    const mathSymbols = ['∫', '∑', 'π', '∞', '√', 'α', 'β', 'γ', 'θ', 'λ', '∂', '∇', '±', '÷', '×', '≤', '≥', '≠', '≈', '∆', 'Ω', 'φ', 'ψ', '∴', '∵', '∈', '∉', '⊂', '⊃', '∪', '∩', '→', '↔', '≡', '≅', '∝', '∼', '⊥', '∥', '°', '′', '″', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const physicsSymbols = ['F=ma', 'E=mc²', 'v=u+at', 'PV=nRT', 'ω=2πf', 'λ=h/p', 'V=IR', 'P=VI', 'W=Fd', 'KE=½mv²', 'PE=mgh', 'Q=mcΔT', '⚡', '🔬', '⚛️', '🧲', '📡', '🌊'];
    const chemSymbols = ['H₂O', 'CO₂', 'NaCl', 'C₆H₁₂O₆', 'CH₄', 'NH₃', 'H₂SO₄', 'CaCO₃', 'O₂', 'N₂', 'HCl', 'NaOH', '⚗️', '🧪', '💊', '🔬', 'C-C', 'H-O-H', 'N≡N'];
    function createSymbol(symbols, className) {
        const symbol = document.createElement('div');
        symbol.className = className;
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.left = Math.random() * window.innerWidth + 'px';
        symbol.style.animationDuration = (Math.random() * 5 + 8) + 's';
        symbol.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        bg.appendChild(symbol);
        setTimeout(() => {
            if (symbol.parentNode) {
                symbol.parentNode.removeChild(symbol);
            }
        }, 15000);
    }
    clearAnimatedBackground();
    // Create different types of symbols
    mathInterval = setInterval(() => createSymbol(mathSymbols, 'math-symbol'), 2300);
    physicsInterval = setInterval(() => createSymbol(physicsSymbols, 'physics-symbol'), 1900);
    chemInterval = setInterval(() => createSymbol(chemSymbols, 'chemistry-symbol'), 1700);
}
function clearAnimatedBackground() {
    clearInterval(mathInterval);
    clearInterval(physicsInterval);
    clearInterval(chemInterval);
    const bg = document.getElementById('animatedBg');
    if (bg) bg.innerHTML = '';

}
// Theme toggle
function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
}
// Login functions
function login() {
    // const email = document.getElementById('emailInput').value.trim();
    // const name = document.getElementById('nameInput').value.trim();
    // const emailError = document.getElementById('emailError');
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailPattern.test(email)) {
    //     emailError.style.display = 'block';
    //     return;
    // } else {
    //     emailError.style.display = 'none';
    // }
    // const namePattern = /^[A-Za-z\s]{2,}$/;
    // if (!namePattern.test(name)) {
    //     alert("Please enter a valid name (letters and spaces only).");
    //     return;
    // }
    showChatInterface();
}
function loginTypewriter() {
    const welcomeTitle = document.querySelector('.welcome-title');
    const welcomeSubtitle = document.querySelector('.welcome-subtitle');
    const welcomeTitle2 = document.querySelector('.login-title');
    const welcomeSubtitle2= document.querySelector('.login-description');
    const titleText = "🎓 JoSH AI";
    const subtitleText = "Your intelligent academic assistant for JOSAA Counselling. Get personalized guidance based on your rank and category to achieve your engineering dreams by choosing the right priority order.";
    const titleText2 = "Welcome JEE Aspirant!";
    const subtitleText2 = "Start your personalized JOSAA counselling journey with JoSH AI. Click below to explore college predictions and career guidance tailored just for you!";
    welcomeTitle.textContent = "";
    welcomeSubtitle.textContent = "";
    welcomeTitle2.textContent = "";
    welcomeSubtitle2.textContent = "";
    function typeText(element, text, speed, callback) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }
    typeText(welcomeTitle, titleText, 60, function() {
        typeText(welcomeSubtitle, subtitleText, 18);
    });
        typeText(welcomeTitle2, titleText2, 60, function() {
        typeText(welcomeSubtitle2, subtitleText2, 18);
    });
}
// Show chat interface
function showChatInterface() {
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('chatContainer').style.display = 'flex';
    document.getElementById('newChatBtn').classList.add('hidden');
    document.getElementById('chatInputSection').classList.add('hidden');
    document.getElementById('mainChatArea').classList.add('hidden');
    document.getElementById('animatedBg').style.display = 'block';
    initAnimatedBackground();
}
// Input validation
document.getElementById('mainsRank').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '').replace(/^0+/, '');
});
document.getElementById('advancedRank').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '').replace(/^0+/, '');
});
function validateForm() {
    const category = document.getElementById('categorySelect').value;
    const gender = document.getElementById('genderSelect').value;
    const mains = document.getElementById('mainsRank').value;
    const startBtn = document.getElementById('startChatBtn');
    if (category && gender && mains && Number(mains) > 0) {
        startBtn.classList.add('enabled');
    } else {
        startBtn.classList.remove('enabled');
    }
}
function showThinking() {
    const messagesContainer = document.getElementById('chatMessages');
    const scrollableContent = document.getElementById('scrollableContent');
    const messageInput = document.getElementById('messageInput');

    // Disable input box
    messageInput.disabled = true;

    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'message assistant';
    thinkingDiv.id = 'thinkingIndicator';

    // Add logo first
    const logoDiv = document.createElement('div');
    logoDiv.className = 'message-logo';
    logoDiv.innerHTML = '🎓';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content thinking';
    contentDiv.innerHTML = `
        <div class="thinking-indicator">
            <div class="thinking-dots">
                <div class="thinking-dot"></div>
                <div class="thinking-dot"></div>
                <div class="thinking-dot"></div>
            </div>
        </div>
    `;

    // Append logo then content
    thinkingDiv.appendChild(logoDiv);
    thinkingDiv.appendChild(contentDiv);
    messagesContainer.appendChild(thinkingDiv);

    // Scroll both containers to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    scrollableContent.scrollTop = scrollableContent.scrollHeight;

    // Additional scroll after a brief delay to ensure rendering is complete
    setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        scrollableContent.scrollTop = scrollableContent.scrollHeight;
    }, 50);
}

function hideThinking() {
    const thinkingDiv = document.getElementById('thinkingIndicator');
    const messageInput = document.getElementById('messageInput');

    // Enable input box
    messageInput.disabled = false;

    if (thinkingDiv) thinkingDiv.remove();
}

function startChatting() {
    // Reset flags
    apiResponseReceived = false;
    collegesData = null;
    const category = document.getElementById('categorySelect').value;
    const gender = document.getElementById('genderSelect').value;
    const mains = document.getElementById('mainsRank').value;
    const advanced = document.getElementById('advancedRank').value;

    if (!category || !gender || !mains || Number(mains) <= 0) {
        alert('Please fill in all required fields with positive ranks');
        return;
    }
    if (advanced && Number(advanced) <= 0) {
        alert('Please enter a positive value for JEE ADVANCED rank');
        return;
    }

    // First, update UI and show congratulations immediately
    userDetails = { category, gender, mainsRank: mains, advancedRank: advanced };
    document.getElementById('userDetailsSection').classList.add('hidden');
    document.getElementById('mainChatArea').classList.remove('hidden');
    document.getElementById('newChatBtn').classList.remove('hidden');
    document.getElementById('chatInputSection').classList.remove('hidden');
    document.getElementById('animatedBg').style.display = 'none';
    clearAnimatedBackground();

    // Start congratulations animation
    showCongratulations(() => {
    // Check if an error message was displayed
    if (!apiResponseReceived) {
        // Show thinking indicator only if no error occurred
        showThinking();
    }
    });

    // Prepare request body as per API format
    const requestBody = {
        category: category,
        advance_rank: advanced ? Number(advanced) : null,
        mains_rank: Number(mains),
        gender: gender.toLowerCase()
    };

    // Make API call in parallel
    fetch('https://josh-ai-backend.onrender.com/first_response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok) throw new Error('API request failed');
        return response.json();
    })
    .then(data => {
        apiResponseReceived = true;
        collegesData = data;
        // Hide thinking indicator
        hideThinking();
        const typewriterSpan = document.querySelector('.typewriter');
        if (!typewriterSpan) {
            hideThinking();
        // Add colleges message to chat
        let collegesMsg = (data.answer.response_advance + "\n\n\n" +data.answer.response_mains) || 
            "These are the top colleges based on your details.";
        chatHistory = [
            { role: "assistant", content: collegesMsg }
        ];
        addMessage(collegesMsg, 'assistant');
    
        console.log("Chat History JSON:", JSON.stringify(data, null, 2));
    }
    })
    .catch(error => {
        apiResponseReceived = true;
        hideThinking();
        addMessage("Sorry, there was an error getting college recommendations. Please try again or check your internet connection.", 'assistant');
        hideThinking();
    });
}
function showCongratulations(afterTypewriterCallback) {
    const congratsSection = document.getElementById('congratulationsSection');
    const congratsText = document.getElementById('congratsText');
    let message = `Congratulations on achieving a rank of ${userDetails.mainsRank} in JEE MAINS!`;
    if (userDetails.advancedRank) {
        message += ` And an impressive rank of ${userDetails.advancedRank} in JEE ADVANCED!`;
    }
    message += ` Based on this performance you have excellent opportunities ahead and I'm here to help you make the best choices for your engineering career. Let's start your personalized guidance journey!`;
    congratsSection.style.display = 'block';
    congratsText.innerHTML = '<span class="typewriter"></span>';
    const typewriterSpan = congratsText.querySelector('.typewriter');
    let i = 0;
    const typeSpeed = 10;

    function typeWriter() {
        if (i < message.length) {
            typewriterSpan.textContent = message.slice(0, i + 1);
            i++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            typewriterSpan.classList.remove('typewriter');

            // Add disclaimer text after typing is complete
            const disclaimerDiv = document.createElement('div');
            disclaimerDiv.className = 'disclaimer-text';
            disclaimerDiv.innerHTML = `
                <strong>Disclaimer:</strong>
                <ul>
                    <li>The college list provided by JoSH AI are just suggestions and if you have any specific preferrence do mention that.</li>
                    <li>Search about one college at a time for better results.</li>
                    <li>If you want guidance for other ranks, please use the 'New Chat' button.</li>
                    <li>Keep your questions detailed for accurate results.</li>
                </ul>
            `;
            congratsSection.appendChild(disclaimerDiv);

            setTimeout(() => {
                document.getElementById('messageInput').focus();
                // Check if API response was received during typing
                if (apiResponseReceived && collegesData) {
                    // Display colleges directly without thinking animation
                    let collegesMsg = (collegesData.answer.response_advance + collegesData.answer.response_mains) || 
                        "These are the top colleges based on your details.";
                    chatHistory = [
                        { role: "assistant", content: collegesMsg }
                    ];
                    hideThinking();
                    addMessage(collegesMsg, 'assistant');
                } else if (typeof afterTypewriterCallback === 'function') {
                    // Show thinking animation only if we're still waiting for API
                    afterTypewriterCallback();
                }
            }, 400);
        }
    }
    typeWriter();
}
function renderMarkdown(text) {
    // Escape HTML first
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    // Headers (must be at start of line)
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    // Code blocks (before inline code)
    html = html.replace(/```([\s\S]*?)```/g, function(match, code) {
        const trimmedCode = code.trim();
        return `<div class="code-block-wrapper"><pre><code>${trimmedCode}</code></pre><button class="copy-btn" onclick="copyCode(this)">Copy</button></div>`;
    });
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Bold and italic (order matters)
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Strikethrough
    html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    // Blockquotes
    html = html.replace(/^> (.+)/gm, '<blockquote>$1</blockquote>');
    // Horizontal rules
    html = html.replace(/^---$/gm, '<hr>');
    html = html.replace(/^___$/gm, '<hr>');
    // Lists
    // Unordered lists
    html = html.replace(/^\s*[\*\-\+]\s+(.+)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    // Ordered lists
    html = html.replace(/^\s*\d+\.\s+(.+)/gm, '<li>$1</li>');
    // Fix overlapping ul/ol replacement
    html = html.replace(/<ul>(<li>.*<\/li>)<\/ul>/g, function(match, listItems) {
        // Check if this was originally a numbered list
        const originalText = text.substring(text.indexOf(listItems.replace(/<\/?li>/g, '')));
        if (/^\s*\d+\./.test(originalText)) {
            return `<ol>${listItems}</ol>`;
        }
        return match;
    });
    // Tables (basic support)
    html = html.replace(/\|(.+)\|/g, function(match, content) {
        const cells = content.split('|').map(cell => cell.trim());
        const cellTags = cells.map(cell => `<td>${cell}</td>`).join('');
        return `<tr>${cellTags}</tr>`;
    });
    html = html.replace(/(<tr>.*<\/tr>)/s, '<table>$1</table>');
    // Line breaks and paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    
    // Wrap in paragraphs if not already wrapped in block elements
    if (!html.startsWith('<') || html.startsWith('<br>') || html.startsWith('<em>') || html.startsWith('<strong>') || html.startsWith('<code>')) {
        html = '<p>' + html + '</p>';
    }
    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ul>|<ol>|<blockquote>|<hr>|<table>)/g, '$1');
    html = html.replace(/(<\/ul>|<\/ol>|<\/blockquote>|<hr>|<\/table>)<\/p>/g, '$1');
    return html;
}   
// Send message
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    if (!message) return;
    hideThinking();
    addMessage(message, 'user');
    chatHistory.push({ role: "user", content: message });
    const prompt = `My JEE advance rank is ${userDetails.advancedRank}. My JEE mains rank ${userDetails.mainsRank}. My category is ${userDetails.category}. My gender is ${userDetails.gender}.`
    input.value = '';
    // Show thinking indicator before API call
    showThinking();
    // API call to backend LLM for further chat
    fetch('https://josh-ai-backend.onrender.com/further_chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_history: chatHistory , prompt : prompt})
    })
    .then(response => {
        if (!response.ok) throw new Error('Chatbot API request failed');
        return response.json();
    })
    .then(data => {
        // Hide thinking indicator before showing response
        hideThinking();
        // Expecting data.response as assistant's reply
        let assistantMsg = data.answer || "Sorry, I couldn't process your request.";
        chatHistory.push({ role: "assistant", content: assistantMsg });
        console.log("Chat History JSON:", JSON.stringify(chatHistory, null, 2))
        addMessage(assistantMsg, 'assistant');
        console.log("Chat History JSON:", JSON.stringify(data, null, 2))
    })
    .catch(error => {
        hideThinking();
        addMessage("There was an error getting a response from the assistant. Please try again.", 'assistant');
    });
    
}
// Add message to chat
function addMessage(content, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    if (sender === 'assistant') {
        contentDiv.innerHTML = renderMarkdown(content);
        // Assistant: Logo then Content
        const logoDiv = document.createElement('div');
        logoDiv.className = 'message-logo';
        logoDiv.innerHTML = '🎓';
        messageDiv.appendChild(logoDiv);
        messageDiv.appendChild(contentDiv);
    } else {
        // User: Content then Logo
        contentDiv.textContent = content;
        const logoDiv = document.createElement('div');
        logoDiv.className = 'message-logo';
        logoDiv.innerHTML = '👤';
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(logoDiv);
    }
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    const scrollableContent = document.getElementById('scrollableContent');
    scrollableContent.scrollTop = scrollableContent.scrollHeight;
}
// // Show hardcoded colleges list after congratulations
// function showCollegesList() {
//     const backendResponse = {
//         status: "success",
//         source: "assistant",
//         answer: {
//             response_advance: "Top 5 IITs for your JEE ADVANCED rank:\n1. IIT Bombay\n2. IIT Delhi\n3. IIT Madras\n4. IIT Kanpur\n5. IIT Kharagpur",
//             response_mains: "Top 5 NITs for your JEE MAINS rank:\n1. NIT Trichy\n2. NIT Surathkal\n3. NIT Warangal\n4. NIT Calicut\n5. NIT Rourkela"
//         }
//     };
//     if (backendResponse.status === "success" && backendResponse.source === "assistant") {
//         let combinedColleges = "";
//         if (backendResponse.answer.response_advance) {
//             combinedColleges += backendResponse.answer.response_advance + "\n\n";
//         }
//         if (backendResponse.answer.response_mains) {
//             combinedColleges += backendResponse.answer.response_mains;
//         }
//         chatHistory.push({ role: "assistant", content: combinedColleges });
//         addMessage(combinedColleges, 'assistant');
//         console.log("Chat History JSON:", JSON.stringify(chatHistory, null, 2));
//     }
// }
// Start new chat
function startNewChat() {
    document.getElementById('chatMessages').innerHTML = '';
    document.getElementById('userDetailsSection').classList.remove('hidden');
    document.getElementById('congratulationsSection').style.display = 'none';
    document.getElementById('mainChatArea').classList.add('hidden');
    
    document.getElementById('categorySelect').value = '';
    document.getElementById('genderSelect').value = '';
    document.getElementById('mainsRank').value = '';
    document.getElementById('advancedRank').value = '';
    document.getElementById('newChatBtn').classList.add('hidden');
    document.getElementById('chatInputSection').classList.add('hidden');
    document.getElementById('animatedBg').style.display = 'block';
    initAnimatedBackground();
    
    userDetails = { category: '', gender: '', mainsRank: '', advancedRank: '' };
    chatHistory = [];
    // Remove disclaimer text
    const disclaimerDiv = document.querySelector('.disclaimer-text');
    if (disclaimerDiv) {
        disclaimerDiv.remove();
    }
}
// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('animatedBg').style.display = 'block';
    initAnimatedBackground();
    
    loginTypewriter();
    const messageInput = document.getElementById('messageInput');
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
    
    ['categorySelect', 'genderSelect', 'mainsRank'].forEach(id => {
        document.getElementById(id).addEventListener('change', validateForm);
        document.getElementById(id).addEventListener('input', validateForm);
    });
    
    initAnimatedBackground();
});