class RageApp {
    constructor() {
        this.phraseElement = document.getElementById('phrase');
        this.languageButtons = document.querySelectorAll('.language-selector button');
        this.speechSynthesis = window.speechSynthesis;
        this.isShaking = false;
        this.lastTime = new Date();
        this.shakeThreshold = 15;
        this.shakeCooldown = 1000; // 1 second cooldown between shakes
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupShakeDetection();
        this.updatePhrase(); // Show initial phrase
    }
    
    setupEventListeners() {
        // Language selection
        this.languageButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                this.changeLanguage(lang);
            });
        });
        
        // Allow tapping as fallback for shake
        document.addEventListener('click', () => this.updatePhrase());
    }
    
    setupShakeDetection() {
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', (event) => {
                this.detectShake(event);
            });
        } else {
            console.log('Device motion not supported');
            this.phraseElement.textContent = 'Tap the screen for a new phrase!';
        }
    }
    
    detectShake(event) {
        const current = new Date();
        if ((current.getTime() - this.lastTime.getTime()) < this.shakeCooldown) {
            return;
        }
        
        const acceleration = event.accelerationIncludingGravity;
        if (!acceleration) return;
        
        const x = acceleration.x;
        const y = acceleration.y;
        const z = acceleration.z;
        
        if (!this.lastX) {
            this.lastX = x;
            this.lastY = y;
            this.lastZ = z;
            return;
        }
        
        const deltaX = Math.abs(this.lastX - x);
        const deltaY = Math.abs(this.lastY - y);
        const deltaZ = Math.abs(this.lastZ - z);
        
        if ((deltaX + deltaY + deltaZ) > this.shakeThreshold) {
            this.lastTime = new Date();
            this.updatePhrase();
        }
        
        this.lastX = x;
        this.lastY = y;
        this.lastZ = z;
    }
    
    changeLanguage(lang) {
        if (PhraseManager.isValidLanguage(lang)) {
            // Update UI
            this.languageButtons.forEach(button => {
                button.classList.toggle('active', button.getAttribute('data-lang') === lang);
            });
            
            // Update language and phrase
            PhraseManager.setLanguage(lang);
            this.updatePhrase();
        }
    }
    
    async updatePhrase() {
        // Add changing class for animation
        this.phraseElement.classList.add('changing');
        
        // Wait for fade out
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Update phrase
        const newPhrase = PhraseManager.getRandomPhrase();
        this.phraseElement.textContent = newPhrase;
        
        // Remove changing class and add new class for fade in
        this.phraseElement.classList.remove('changing');
        this.phraseElement.classList.add('new');
        
        // Speak the phrase
        this.speakPhrase(newPhrase);
        
        // Remove new class after animation
        setTimeout(() => {
            this.phraseElement.classList.remove('new');
        }, 500);
    }
    
    speakPhrase(phrase) {
        // Cancel any ongoing speech
        this.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(phrase);
        
        // Set language based on current selection
        switch (PhraseManager.getCurrentLanguage()) {
            case 'fr':
                utterance.lang = 'fr-FR';
                break;
            case 'el':
                utterance.lang = 'el-GR';
                break;
            default:
                utterance.lang = 'en-GB';
        }
        
        // Adjust speech properties
        utterance.rate = 0.9;  // Slightly slower for clarity
        utterance.pitch = 1.1; // Slightly higher pitch for character
        
        this.speechSynthesis.speak(utterance);
    }
}

// Initialize the app when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new RageApp();
});