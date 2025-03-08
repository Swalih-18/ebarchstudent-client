'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Researchpaper } from '@/types';
import DownloadButton from './DownloadButton';
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import ReportForm from "@/components/ReportForm";

interface ResearchpaperContentProps {
  researchpaper: Researchpaper;
}

const ResearchpaperContent = ({ researchpaper }: ResearchpaperContentProps) => {
  const [showReportForm, setShowReportForm] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-gray-100">
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <motion.div 
            className="md:col-span-4 lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105">
              <Image
                src={researchpaper.coverImage}
                alt={researchpaper.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
          </motion.div>

          <div className="flex flex-col space-y-6 md:col-span-8 lg:col-span-9">
            <div className="space-y-4">
              <motion.h1 
                className="bg-gradient-to-r from-gray-500 to-white bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100 
                }}
              >
                {researchpaper.title}
              </motion.h1>
              <motion.p 
                className="text-xl italic text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                by {researchpaper.authorName}
              </motion.p>
            </div>

            <motion.div 
              className="prose prose-invert max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-lg leading-relaxed text-gray-300">
                {researchpaper.abstract}
              </p>
            </motion.div>

            <motion.div 
              className="mt-8 flex space-x-4 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <DownloadButton fileLink={researchpaper.file} />
              <Button 
                variant="outline" 
                className="bg-transparent border-red-500 hover:bg-red-900/20 text-red-500"
                onClick={() => setShowReportForm(true)}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {showReportForm && (
        <ReportForm 
          contentId={researchpaper._id} 
          contentTitle={researchpaper.title}
          contentType="research"
          onClose={() => setShowReportForm(false)}
        />
      )}
    </div>
  );
};

export default ResearchpaperContent;
