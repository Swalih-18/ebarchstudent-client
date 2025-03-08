import { Researchpaper } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ResearchPaperCard = ({ researchpaper }: { researchpaper: Researchpaper }) => {
  return (
    <Link href={`/researchpaper/${researchpaper._id}`}>
      <div className="group relative flex flex-col items-center">
        <div className="absolute inset-0 rounded-md border border-gray-700/50 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm
          transition-all duration-300 group-hover:border-primary-500/50 group-hover:shadow-[0_0_20px_rgba(var(--primary-500),0.15)]" />
        
        <div className="relative flex flex-col items-center gap-2 p-4">
          <div className="relative">
            <div className="absolute -left-1 top-1 h-full w-full rounded-md bg-gradient-to-r from-primary-500/10 to-white/5 blur-lg
              transition-all duration-300 group-hover:blur-xl group-hover:from-primary-500/20 group-hover:to-white/10" />
            
            <div className="absolute -left-1 top-1 h-full w-full rounded-md bg-white/10 blur-sm
              transition-all duration-300 group-hover:blur-md group-hover:bg-white/20" />
            
            <Image
              src={researchpaper.coverImage}
              alt={researchpaper.title}
              width={200}
              height={200}
              className="relative rounded-md border border-white/10 object-cover shadow-lg
                transition-all duration-300 group-hover:border-white/20 group-hover:shadow-xl
                group-hover:shadow-primary-500/10"
              style={{
                height: '180px',
                width: '250px',
              }}
            />
          </div>
          
          <div className="mt-2 text-center w-full">
            <h2 className="line-clamp-1 text-sm font-semibold text-white/90 text-balance
              transition-colors duration-300 group-hover:text-white">
              {researchpaper.title}
            </h2>
            <p className="mt-1 text-xs font-medium text-white/60
              transition-colors duration-300 group-hover:text-primary-400">
              {researchpaper.authorName}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResearchPaperCard;
