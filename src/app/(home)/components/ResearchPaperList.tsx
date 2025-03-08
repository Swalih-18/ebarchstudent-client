'use client';
import { Researchpaper } from "@/types";
import ResearchPaperCard from "./ResearchPaperCard";
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

const ResearchPaperList = () => {
    const searchParams = useSearchParams();
    const pageParam = searchParams.get('page');
    const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);
    const limit = 12; // Display 12 research papers per page
    
    // Update page when URL changes
    useEffect(() => {
      const newPage = pageParam ? parseInt(pageParam) : 1;
      setPage(newPage);
    }, [pageParam]);

    const { data: allPapers, error, isLoading } = useSWR(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/researchpapers/publicpapers`, 
      fetcher, 
      { 
        refreshInterval: 10000, // Refresh every 10 seconds
        revalidateOnFocus: true
      }
    );

    if (error) return <div className="text-center py-12">Failed to load research papers</div>;
    if (isLoading) return <div className="text-center py-12">Loading research papers...</div>;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPapers = allPapers.slice(startIndex, endIndex);
    const totalPages = Math.ceil(allPapers.length / limit);

    return (
        <div className="container mx-auto px-4 py-12">
            <div id="researchpaper-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {[...paginatedPapers].reverse().map((researchpaper: Researchpaper) => (
                    <ResearchPaperCard key={researchpaper._id} researchpaper={researchpaper} />
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

export default ResearchPaperList;
