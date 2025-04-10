class RageApp {
    constructor() {
        this.phraseElement = document.getElementById('phrase');
        this.languageButtons = document.querySelectorAll('.language-selector button');
        this.speechSynthesis = window.speechSynthesis;
        this.voices = [];
        this.isShaking = false;
        this.lastTime = new Date();
        this.shakeThreshold = 15;
        this.shakeCooldown = 1000; // 1 second cooldown between shakes
        this.hasVibration = 'vibrate' in navigator;
        
        // Log vibration support status
        console.log('Vibration support:', this.hasVibration ? 'available' : 'not available');
        
        // Load voices
        this.loadVoices();
        this.init();
    }

    loadVoices() {
        // Load initial voices
        this.voices = this.speechSynthesis.getVoices();
        
        // Chrome loads voices asynchronously
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => {
                this.voices = this.speechSynthesis.getVoices();
            };
        }
    }

    isMaleVoice(voice) {
        const name = voice.name.toLowerCase();
        return name.includes('male') ||
               name.includes('man') ||
               name.includes('guy') ||
               name.includes('homme') ||  // French
               name.includes('masculin') ||
               name.includes('άνδρας') || // Greek
               name.includes('αρσενικός');
    }

    getVoiceForLanguage(lang) {
        // Get all voices for this language
        const langVoices = this.voices.filter(v => v.lang.startsWith(lang));
        
        if (langVoices.length === 0) {
            // Try with base language code
            const baseCode = lang.split('-')[0];
            const baseVoices = this.voices.filter(v => v.lang.startsWith(baseCode));
            
            // Try to find a male voice first
            let maleVoice = baseVoices.find(v => this.isMaleVoice(v));
            return maleVoice || baseVoices[0];
        }
        
        // Try to find a male voice first
        let maleVoice = langVoices.find(v => this.isMaleVoice(v));
        return maleVoice || langVoices[0];
    }
    
    init() {
        this.setupEventListeners();
        this.setupShakeDetection();
        this.updatePhrase(); // Show initial phrase
        
        // Debug: Log available voices
        setTimeout(() => {
            console.log('=== Available Voices ===');
            this.voices.forEach(voice => {
                console.log(`Voice: ${voice.name}`);
                console.log(`- Language: ${voice.lang}`);
                console.log(`- URI: ${voice.voiceURI}`);
                console.log(`- Default: ${voice.default}`);
                console.log(`- Local Service: ${voice.localService}`);
                console.log('---');
            });
        }, 1000); // Wait for voices to load
    }
    
    setupEventListeners() {
        // Language selection
        this.languageButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                console.log(`=== Language Change ===`);
                console.log(`Requested language: ${lang}`);
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
            
            // Use cached vibration support check
            if (this.hasVibration) {
                // Short vibration burst for feedback
                navigator.vibrate([100]); // Using array pattern for better device compatibility
            }
            
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
        
        // Set language code based on current selection
        let langCode;
        const currentLang = PhraseManager.getCurrentLanguage();
        switch (currentLang) {
            case 'fr': langCode = 'fr-FR'; break;
            case 'el': langCode = 'el-GR'; break;
            default:   langCode = 'en-GB';
        }
        
        // Get appropriate male voice
        const voice = this.getVoiceForLanguage(langCode);
        if (voice) {
            utterance.voice = voice;
            utterance.lang = voice.lang; // Use exact language code from voice
            console.log(`Using voice: ${voice.name} (${voice.lang})`);
        } else {
            utterance.lang = langCode;
            console.warn(`No voice found for language: ${langCode}`);
        }
        
        // Captain Haddock style speech properties
        utterance.rate = 1;     // Even faster for more energy
        utterance.pitch = 0.3;    // Lower pitch for male voice
        utterance.volume = 1.0;   // Maximum volume
        
        // Add dramatic emphasis
        const emphasis = Math.random() * 0.3; // Larger variation for more drama
        utterance.rate += emphasis;           // Faster for excitement
        utterance.pitch -= emphasis * 0.2;    // Slightly lower for anger
        
        this.speechSynthesis.speak(utterance);
    }
}

// Initialize the app when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new RageApp();
});