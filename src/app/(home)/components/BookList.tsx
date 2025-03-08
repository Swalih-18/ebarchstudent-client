'use client';
import { Book } from "@/types";
import BookCard from "./BookCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`Error fetching papers: ${res.statusText}`);
    }
    return res.json();
  });

const BookList = () => {
    const searchParams = useSearchParams();
    const pageParam = searchParams.get('page');
    const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);
    const limit = 12; // Display 12 books per page
    
    // Update page when URL changes
    useEffect(() => {
      const newPage = pageParam ? parseInt(pageParam) : 1;
      setPage(newPage);
    }, [pageParam]);

    const { data: allBooks, error, isLoading } = useSWR(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/publicbooks`, 
      fetcher, 
      { 
        refreshInterval: 10000, // Refresh every 10 seconds
        revalidateOnFocus: true
      }
    );

    if (error) return <div className="text-center py-12">Failed to load books</div>;
    if (isLoading) return <div className="text-center py-12">Loading books...</div>;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBooks = allBooks.slice(startIndex, endIndex);
    const totalPages = Math.ceil(allBooks.length / limit);

    return (
        <div className="container mx-auto px-4 py-12">
            <div id="book-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {[...paginatedBooks].reverse().map((book: Book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <Pagination>
                        <PaginationPrevious href={`?page=${page > 1 ? page - 1 : 1}`} />
                        <PaginationContent>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <PaginationItem key={pageNum}>
                                    <PaginationLink 
                                        href={`?page=${pageNum}`}
                                        isActive={pageNum === page}
                                    >
                                        {pageNum}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                        <PaginationNext href={`?page=${page < totalPages ? page + 1 : totalPages}`} />
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default BookList;
