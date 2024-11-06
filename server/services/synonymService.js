const { Mutex } = require('async-mutex');
const synonymMutex = new Mutex();
const pool = require('../db'); 

async function getOrInsertWord(word, client) {
    const res = await client.query(
        `INSERT INTO words (word) VALUES ($1)
         ON CONFLICT (word) DO NOTHING
         RETURNING word_id`,
        [word]
    );

    if (res.rows.length > 0) {
        return res.rows[0].word_id;
    } else {
        const result = await client.query(
            `SELECT word_id FROM words WHERE word = $1`,
            [word]
        );
        return result.rows[0].word_id;
    }
}

async function addPair(wordId1, wordId2, client) {
    await client.query(
        `INSERT INTO synonyms (word1_id, word2_id)
         VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [wordId1, wordId2]
    );
}

exports.addSynonym = async (word, synonyms) => {
    await synonymMutex.runExclusive(async () => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const wordId = await getOrInsertWord(word, client);
            for (const synonym of synonyms) {
                const synonymId = await getOrInsertWord(synonym, client);
                await addPair(wordId, synonymId, client);
                await addPair(synonymId, wordId, client);
            }

            await client.query('COMMIT');
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    });
};

exports.getSynonyms = async (word) => {
    const wordRes = await pool.query(
        `SELECT word_id FROM words WHERE word = $1`,
        [word]
    );
    if (wordRes.rows.length === 0) return null;

    const wordId = wordRes.rows[0].word_id;
    const synonymRes = await pool.query(
        `SELECT w2.word 
         FROM synonyms s
         JOIN words w2 ON s.word2_id = w2.word_id
         WHERE s.word1_id = $1`,
        [wordId]
    );

    return synonymRes.rows.map(row => row.word);
};

exports.clearSynonyms = async () => {
    await synonymMutex.runExclusive(async () => {
        await pool.query('DELETE FROM synonyms');
        await pool.query('DELETE FROM words');
    });
};
