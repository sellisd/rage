const phrases = {
    en: [
        "Blistering barnacles!",
        "Thundering typhoons!",
        "Ten thousand thundering typhoons!",
        "Billions of blue blistering barnacles!",
        "Jumping jellyfish!",
        "Great snakes!",
        "Thundering hurricanes!",
        "Mythical monsters!",
        "Pestilential pop-guns!",
        "Blue blistering bell-bottomed balderdash!",
        "Coelacanth!",
        "Anthropithecus!",
        "Iconoclasts!",
        "Kleptomaniacs!",
        "Parasites!"
    ],
    fr: [
        "Mille sabords !",
        "Tonnerre de Brest !",
        "Moule à gaufres !",
        "Mille millions de mille sabords !",
        "Tonnerre de tonnerre !",
        "Bachi-bouzouk !",
        "Coloquinte !",
        "Anthropophage !",
        "Anacoluthe !",
        "Bougre de crème d'emplâtre !",
        "Paltoquet !",
        "Phylactère !",
        "Zouave !",
        "Mercenaire !",
        "Sapajou !"
    ],
    el: [
        "Χίλιες καταιγίδες!",
        "Μπλε μπαρνάκλες!",
        "Κεραυνοί και αστραπές!",
        "Θαλασσόλυκε!",
        "Πειρατή των επτά θαλασσών!",
        "Μπουρλοτιέρη!",
        "Θαλασσοπόντικα!",
        "Κουρσάρε της κακιάς ώρας!",
        "Παλιοτόμαρο!",
        "Καραβανάς!",
        "Κοπρίτη!",
        "Σαλτιμπάγκε!",
        "Παλιάτσε!",
        "Τρισκατάρατε!",
        "Μασκαρά!"
    ]
};

// Utility functions for phrase management
const PhraseManager = {
    currentLanguage: 'en',
    lastPhrase: '',
    
    setLanguage(lang) {
        if (phrases[lang]) {
            this.currentLanguage = lang;
            return true;
        }
        return false;
    },
    
    getRandomPhrase() {
        const availablePhrases = phrases[this.currentLanguage].filter(
            phrase => phrase !== this.lastPhrase
        );
        const randomIndex = Math.floor(Math.random() * availablePhrases.length);
        this.lastPhrase = availablePhrases[randomIndex];
        return this.lastPhrase;
    },
    
    getCurrentLanguage() {
        return this.currentLanguage;
    },
    
    isValidLanguage(lang) {
        return Object.keys(phrases).includes(lang);
    }
};