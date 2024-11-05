import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addSynonym } from '../../services/synonymService';
import styles from './AddSynonymPage.module.css';

const AddSynonymPage = () => {
    const formik = useFormik({
        initialValues: {
            word: '',
            synonyms: '',
        },
        validationSchema: Yup.object({
            word: Yup.string().required('Word is required'),
            synonyms: Yup.string().required('At least one synonym is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const synonymList = values.synonyms.split(',').map(s => s.trim());
            try {
                await addSynonym(values.word, synonymList);
                resetForm();
            } catch (error) {
                console.error('Error adding synonym:', error);
            }
        },
    });

    return (
        <div className={styles.container}>
            <h2>Add Synonyms</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Word: </label>
                    <input
                        type="text"
                        name="word"
                        value={formik.values.word}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.word && formik.errors.word ? <p className={styles.errorMessage}>{formik.errors.word}</p> : null}
                </div>
                <div className={styles.formGroup}>
                    <label>Synonyms (comma-separated): </label>
                    <input
                        type="text"
                        name="synonyms"
                        value={formik.values.synonyms}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.synonyms && formik.errors.synonyms ? <p className={styles.errorMessage}>{formik.errors.synonyms}</p> : null}
                </div>
                <button type="submit">Add Synonyms</button>
            </form>
        </div>
    );
};

export default AddSynonymPage;
