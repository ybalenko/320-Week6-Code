import React from 'react';
import { useParams } from 'react-router-dom';

export default function JournalEntry() {
    const { id } = useParams();

    return (
        <div>
            <h1>Journal Entry: {id}</h1>
        </div>
    );
}
