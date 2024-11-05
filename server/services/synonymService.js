//using Mutex for thread-safe operations
const { Mutex } = require('async-mutex');
const synonymMutex = new Mutex();

let synonymMap = {};

function addPair(word1, word2) {
    if (!synonymMap[word1]) {
        synonymMap[word1] = new Set();
    }
    synonymMap[word1].add(word2);
}

//DFS algorithm for finding all synonyms
function findAllSynonymsIterative(word) {
    let visited = new Set();
    let stack = [word];

    while (stack.length > 0) {
        let currentWord = stack.pop();

        if (!visited.has(currentWord)) {
            visited.add(currentWord);

            if (synonymMap[currentWord]) {
                synonymMap[currentWord].forEach(syn => {
                    if (!visited.has(syn)) {
                        stack.push(syn);
                    }
                });
            }
        }
    }

    return visited;
}

exports.addSynonym = async (word, synonyms) => {
    await synonymMutex.runExclusive(async () => {
        synonyms.forEach(syn => {
            addPair(word, syn);
            addPair(syn, word);
        });

        const allRelatedWords = findAllSynonymsIterative(word);

        allRelatedWords.forEach(w1 => {
            allRelatedWords.forEach(w2 => {
                if (w1 !== w2) {
                    addPair(w1, w2);
                    addPair(w2, w1);
                }
            });
        });
    });
};

exports.getSynonyms = (word) => {
    if (!synonymMap[word]) return null;
    return Array.from(synonymMap[word]);
};

exports.clearSynonyms = () => {
    synonymMutex.runExclusive(() => {
        synonymMap = {};
    });
};
