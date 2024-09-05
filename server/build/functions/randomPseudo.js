"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPseudo = void 0;
const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};
const generateRandomPseudo = () => {
    const adjectives = ['Happy', 'Brave', 'Clever', 'Quick', 'Mighty', 'Silent', 'Bright', 'Swift', 'Lucky'];
    const nouns = ['Lion', 'Eagle', 'Tiger', 'Shark', 'Panther', 'Wolf', 'Falcon', 'Bear', 'Fox'];
    const randomAdjective = getRandomElement(adjectives);
    const randomNoun = getRandomElement(nouns);
    return randomAdjective + randomNoun;
};
exports.generateRandomPseudo = generateRandomPseudo;
