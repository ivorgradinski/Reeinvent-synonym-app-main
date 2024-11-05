const synonymService = require('../services/synonymService');

describe('Synonym Service', () => {
    beforeEach(async () => {
        await synonymService.clearSynonyms();
    });

    test('should add synonyms in both directions', async () => {
        await synonymService.addSynonym('clean', ['wash', 'sanitize']);
        const synonymsOfClean = synonymService.getSynonyms('clean');
        const synonymsOfWash = synonymService.getSynonyms('wash');
        const synonymsOfSanitize = synonymService.getSynonyms('sanitize');

        expect(synonymsOfClean).toContain('wash');
        expect(synonymsOfClean).toContain('sanitize');
        expect(synonymsOfWash).toContain('clean');
        expect(synonymsOfSanitize).toContain('clean');
    });

    test('should return null if word has no synonyms', () => {
        const result = synonymService.getSynonyms('unknown');
        expect(result).toBeNull();
    });

    test('should apply the transitive rule correctly', async () => {
        await synonymService.addSynonym('happy', ['joyful']);
        await synonymService.addSynonym('joyful', ['cheerful']);

        const synonymsOfHappy = synonymService.getSynonyms('happy');
        expect(synonymsOfHappy).toContain('joyful');
        expect(synonymsOfHappy).toContain('cheerful');

        const synonymsOfCheerful = synonymService.getSynonyms('cheerful');
        expect(synonymsOfCheerful).toContain('happy');
    });

    test('should handle circular synonym definitions', async () => {
        await synonymService.addSynonym('A', ['B']);
        await synonymService.addSynonym('B', ['C']);
        await synonymService.addSynonym('C', ['A']);

        const synonymsOfA = synonymService.getSynonyms('A');
        expect(synonymsOfA).toContain('B');
        expect(synonymsOfA).toContain('C');

        const synonymsOfB = synonymService.getSynonyms('B');
        expect(synonymsOfB).toContain('A');
        expect(synonymsOfB).toContain('C');

        const synonymsOfC = synonymService.getSynonyms('C');
        expect(synonymsOfC).toContain('A');
        expect(synonymsOfC).toContain('B');
    });

    test('should clear all synonyms', async () => {
        await synonymService.addSynonym('large', ['big']);
        await synonymService.clearSynonyms();

        const synonymsOfLarge = synonymService.getSynonyms('large');
        expect(synonymsOfLarge).toBeNull();
    });
});
