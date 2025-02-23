"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Banner from "@/app/(home)/components/Banner";
import { InfiniteMovingCardsDemo } from "@/components/InfiniteCards";

const TabbedContent = ({ books, papers }: { books: React.ReactNode; papers: React.ReactNode }) => {
    const [activeTab, setActiveTab] = useState<"books" | "papers">("books");

    return (
        <>
            <Banner />
            <InfiniteMovingCardsDemo />
            <div className="container mx-auto px-4 py-6">
                <div className="flex gap-4 justify-center mb-8">
                    <Button
                        variant={activeTab === "books" ? "default" : "outline"}
                        onClick={() => setActiveTab("books")}
                        size={"xl"}
                        className="w-32"
                    >
                        Books
                    </Button>
                    <Button
                        variant={activeTab === "papers" ? "default" : "outline"}
                        onClick={() => setActiveTab("papers")}
                        size={"xl"}
                        className="w-32"
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
