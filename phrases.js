const phrases = {
    en: [
        "You would bore the leggings off a village idiot!",
        "Your brain is so minute that if a hungry cannibal cracked your head open, there wouldn't be enough to cover a small water biscuit!",
        "You're as useful as a cat flap in an elephant house!",
        "Your head is as empty as a eunuch's underpants!",
        "You're as stupid as a peasant who's been hit on the head by a fish!",
        "I've met amoeba with better social skills than you!",
        "Your presence here is as welcome as a fart in a space suit!",
        "You're about as subtle as a rhinoceros horn up the backside!",
        "Your face resembles something that lives in the bottom of a pond!",
        "You're as long-winded as a sperm whale with bronchitis!",
        "Your family tree is a shrub, and a poorly watered one at that!",
        "You're as thick as a whale omelette!",
        "Your wit is so blunt, you couldn't cut butter with it if it was served to you in a furnace!",
        "You're as mad as a box of frogs that have been force-fed coffee!",
        "Your intellect is so small it could fit in a thimble and still leave room for your personality!",
        "You have the charisma of a wet paper bag and the wit of its contents!",
        "You're living proof that evolution can go in reverse!",
        "Your ancestors were dung collectors and they bred upwards!",
        "You're as welcome here as a protestant back-massage at a catholic retreat!",
        "Your conversation is as interesting as a tap-dancing slug in a coma!"
    ],
    fr: [
        "Mille millions de mille sabords de tonnerre de Brest !",
        "Tonnerre de Brest, espèce de bachi-bouzouk des Carpates !",
        "Moule à gaufres, espèce d'ectoplasme à roulettes !",
        "Mille sabords, espèce de cornichon de zouave à roulettes !",
        "Tonnerre de tonnerre, bande de pirates d'eau douce !",
        "Bachi-bouzouk de tonnerre de mille millions de sabords !",
        "Coloquinte à la graisse de hérisson !",
        "Anthropophage marin d'eau douce !",
        "Anacoluthe ambulante à la sauce tartare !",
        "Bougre de crème d'emplâtre à la sauce mosquito !",
        "Paltoquet de mille tonnerres de Brest !",
        "Espèce de logarithme à pattes de coléoptère !",
        "Zouave interplanétaire à la sauce hollandaise !",
        "Mercenaire de tonnerre de mille sabords !",
        "Sapajou des Carpates à la sauce marocaine !",
        "Mille milliards de mille millions de mille sabords !",
        "Vampire à roulettes, espèce de brontosaure !",
        "Ravachol de tonnerre de Zeus !",
        "Apprenti dictateur à la noix de coco !",
        "Chauffard du Sahara en trottinette !"
    ],
    el: [
        "Σκιάχτρο που φοβίζει και τα κοράκια!",
        "Κακορίζικε, που ούτε οι ψύλλοι δεν σε πλησιάζουν!",
        "Μυαλοφτωχέ, που ούτε για σκιάχτρο δεν κάνεις!",
        "Κουτορνίθι που τρέχει πίσω από τη σκιά του!",
        "Κακομοίρη, που ούτε οι ψείρες δεν σε θέλουν!",
        "Σαπιοκοιλιά που βρωμάει από μακριά!",
        "Ξερόμυαλε, που ούτε ο Δίας δεν σε λυπάται!",
        "Ανεμοδούρα που αλλάζει γνώμη με κάθε φύσημα!",
        "Μουχλιασμένε, που ούτε οι μύγες δεν σε πλησιάζουν!",
        "Κακορίζικε, που ούτε ο Άδης δεν σε θέλει!",
        "Σκουριασμένε, που ούτε για παλιοσίδερα δεν κάνεις!",
        "Ξεροκέφαλε, που ούτε ο Ποσειδώνας δεν σε αντέχει!",
        "Αχρείε, που ούτε οι θεοί δεν σε ανέχονται!",
        "Μπαγιάτικε, που ούτε οι σκύλοι δεν σε πλησιάζουν!",
        "Σκουπιδοφάγε, που ούτε οι γάτες δεν σε θέλουν!"
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