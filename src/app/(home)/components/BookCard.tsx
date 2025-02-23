import { Book } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BookCard = ({ book }: { book: Book }) => {
  return (
    <Link href={`/book/${book._id}`}>
      <div className="group relative flex flex-col items-center">
        {/* Card Container with Border and Glow */}
        <div className="absolute inset-0 rounded-lg border border-gray-700/50 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm 
          transition-all duration-500 group-hover:border-primary-500/50 group-hover:shadow-[0_0_30px_rgba(var(--primary-500),0.15)]" />
        
        {/* Content Container */}
        <div className="relative flex flex-col items-center gap-3 p-6">
          {/* Book Cover with Enhanced Shadow Effects */}
          <div className="relative">
            {/* Ambient light effect */}
            <div className="absolute -left-2 top-2 h-full w-full rounded-lg bg-gradient-to-r from-primary-500/10 to-white/5 blur-xl 
              transition-all duration-500 group-hover:blur-2xl group-hover:from-primary-500/20 group-hover:to-white/10" />
            
            {/* Sharp shadow */}
            <div className="absolute -left-1 top-1 h-full w-full rounded-lg bg-white/10 blur-sm 
              transition-all duration-500 group-hover:blur-md group-hover:bg-white/20" />
            
            {/* Book Cover Image */}
            <Image
              src={book.coverImage}
              alt={book.title}
              width={200}
              height={300}
              className="relative rounded-lg border border-white/10 object-cover shadow-lg 
                transition-all duration-500 group-hover:border-white/20 group-hover:shadow-xl 
                group-hover:shadow-primary-500/10"
              style={{
                height: '300px',
                width: '200px',
              }}
            />
          </div>
          
          {/* Book Details with Enhanced Typography */}
          <div className="mt-4 text-center w-full">
            <h2 className="line-clamp-2 text-lg font-semibold text-white/90 text-balance 
              transition-colors duration-300 group-hover:text-white">
              {book.title}
            </h2>
            <p className="mt-2 text-sm font-medium text-white/60 
              transition-colors duration-300 group-hover:text-primary-400">
              {book.authorName}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;