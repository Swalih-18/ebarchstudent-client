import { Book } from "@/types";
import BookCard from "./BookCard";

const BookList = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/books/publicbooks`, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error(`Error fetching books: ${response.statusText}`);
    }
    const books = await response.json();
    
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[...books].reverse().map((book: Book)=> (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default BookList;