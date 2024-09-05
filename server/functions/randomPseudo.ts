const getRandomElement = (array: string | any[]) => {
    return array[Math.floor(Math.random() * array.length)];
}

export const generateRandomPseudo = () => {
    const adjectives = ['Happy', 'Brave', 'Clever', 'Quick', 'Mighty', 'Silent', 'Bright', 'Swift', 'Lucky'];
    const nouns = ['Lion', 'Eagle', 'Tiger', 'Shark', 'Panther', 'Wolf', 'Falcon', 'Bear', 'Fox'];

    const randomAdjective = getRandomElement(adjectives);
    const randomNoun = getRandomElement(nouns);

    return randomAdjective + randomNoun;
}