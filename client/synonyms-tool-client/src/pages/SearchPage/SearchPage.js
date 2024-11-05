import React, { useState } from 'react';
import { searchSynonyms } from '../../services/synonymService';
import styles from './SearchPage.module.css';

const SearchPage = () => {
    const [word, setWord] = useState('');
    const [synonyms, setSynonyms] = useState([]);
    const [message, setMessage] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const data = await searchSynonyms(word);
            setSynonyms(data.synonyms);
            setMessage('');
        } catch (error) {
            setMessage('No synonyms found');
            setSynonyms([]);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Search Synonyms</h2>
            <form onSubmit={handleSearch}>
                <div className={styles.formGroup}>
                    <label>Word: </label>
                    <input
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Search</button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
            {synonyms.length > 0 && (
                <div className={styles.synonymList}>
                    <h3>Synonyms for "{word}":</h3>
                    <ul>
                        {synonyms.map((synonym, index) => (
                            <li key={index}>{synonym}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
