"use client";

import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import Banner from "@/app/(home)/components/Banner";
import { InfiniteMovingCardsDemo } from "@/components/InfiniteCards";
import { motion } from "framer-motion";

const TabbedContent = ({ books, papers }: { books: React.ReactNode; papers: React.ReactNode }) => {
    const [activeTab, setActiveTab] = useState<"books" | "papers">("books");

    const movingCards = useMemo(() => <InfiniteMovingCardsDemo />, []);

    return (
        <>
            <Banner />


            {movingCards}
            <div className="container mx-auto px-4 py-6">
                <div className="flex gap-4 justify-center mb-8">
                    <Button
                        variant={activeTab === "books" ? "default" : "outline"}
                        onClick={() => setActiveTab("books")}
                        size={"lg"}
                        className="w-32 rounded-full"
                    >
                        Books
                    </Button>
                    <Button
                        variant={activeTab === "papers" ? "default" : "outline"}
                        onClick={() => setActiveTab("papers")}
                        size={"lg"}
                        className="w-32 rounded-full"
                    >
                        Papers
                    </Button>
                </div>

                {activeTab === "books" ? books : papers}
            </div>
        </>
    );
};

export default TabbedContent;
