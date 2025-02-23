import { Researchpaper } from "@/types";
import ResearchPaperCard from "./ResearchPaperCard";

const ResearchPaperList = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/researchpapers/publicpapers`, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error(`Error fetching papers: ${response.statusText}`);
    }
    const researchpapers = await response.json();
    
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {researchpapers.map((researchpaper: Researchpaper) => (
                    <ResearchPaperCard key={researchpaper._id} researchpaper={researchpaper} />
                ))}
            </div>
        </div>
    );
};

export default ResearchPaperList;