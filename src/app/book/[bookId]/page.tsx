import React from 'react';
import { Book } from '@/types';
import BookContent from './components/BookContent';

const SingleBookPage = async ({ params }: { params: Promise<{ bookId: string }> }) => {
    const { bookId } = await params;
    let book: Book | null = null;

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/books/${bookId}`, {
            next: {
                revalidate: 5,
            },
        });
        if (!response.ok) {
            throw new Error(`Error fetching book: ${response.statusText}`);
        }
        book = await response.json();
    } catch (err: any) {
        console.error(err);
        throw new Error('Error fetching book');
    }

    if (!book) {
        throw new Error('Book not found');
    }

    return <BookContent book={book} />;
};

export default SingleBookPage;