import React from "react";
import { Researchpaper } from "@/types";
import ResearchpaperContent from "./components/RpContent";

const SingleResearchpaperPage = async ({
  params,
}: {
  params: Promise<{ rpId: string }>;
}) => {
  const { rpId } = await params;
  let researchpaper: Researchpaper | null = null;

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/researchpapers/${rpId}`,
      {
        next: {
          revalidate: 5,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching research paper: ${response.statusText}`);
    }
    researchpaper = await response.json();
  } catch (err: any) {
    console.error(err);
    throw new Error("Error fetching research paper");
  }

  if (!researchpaper) {
    throw new Error("Research paper not found");
  }

  return <ResearchpaperContent researchpaper={researchpaper} />;
};

export default SingleResearchpaperPage;
