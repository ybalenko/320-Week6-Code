import React, { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import db from '../db';
import { Link } from 'react-router-dom';
import AddJournal from './AddJournal';

export default function Journal() {
    const [entries, setEntries] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        const entriesQuery = query(
            collection(db, 'journal-entries'),
            orderBy('createdAt', 'desc')
        )
        const unsubscribe = onSnapshot(
            entriesQuery,
            snapshot => {
                setEntries(snapshot.docs);
                setIsLoading(false);
            },
            error => {
                console.log(error);
                setIsLoading(false);
                setHasError(true);
            }
        )

        return () => unsubscribe();
    }, [])

    if (isLoading) {
        return <p>loading...</p>
    }

    if (hasError) {
        return <p>Has error!</p>
    }

    const handleDelete = id => {
        console.log(id)
        deleteDoc(doc(db, "journal-entries", id));
    }

    return (
        <div>
            <h1>Journal Entries</h1>
            <AddJournal />
            {entries.map((entry) => {
                return (
                    <div key={entry.id}>
                        <p>
                            {entry.data().entry}
                            <span>
                                <Link to={`/journal/${entry.id}`}>
                                    View
                                </Link>
                                <button onClick={() => handleDelete(entry.id)}>Delete</button>
                            </span>
                        </p>
                        <hr />
                    </div>
                )
            })}
        </div>
    );
}