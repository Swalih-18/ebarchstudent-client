"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface ReportFormProps {
  contentId: string;
  contentTitle: string;
  contentType: "book" | "research";
  onClose: () => void;
}

const ReportForm = ({
  contentId,
  contentTitle,
  contentType,
  onClose,
}: ReportFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentId,
          contentType,
          contentTitle,
          reason: reportReason,
          details: reportDetails,
          email: email || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Submission not allowed at this moment. Please try again later.");
        } else {
          toast.error(data.message || "Failed to submit report. Please try again.");
        }
        return;
      }

      toast.success("Report submitted successfully!");
      setTimeout(() => {
        onClose();
      }, 1500); // Close after 1.5 seconds to allow the user to see the toast
      
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-black/80 border border-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-gray-100">
              Report {contentType === "book" ? "Book" : "Research Paper"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm text-gray-400">Reporting:</h3>
              <p className="font-medium text-gray-200">{contentTitle}</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="report-reason" className="text-gray-300">
                Reason for reporting
              </Label>
              <RadioGroup
                id="report-reason"
                value={reportReason}
                onValueChange={setReportReason}
                className="space-y-2"
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="copyright" id="copyright" className="text-white border-gray-500 focus:ring-white" />
                  <Label htmlFor="copyright" className="text-gray-300">Copyright Violation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inappropriate" id="inappropriate"  className="text-white border-gray-500 focus:ring-white" />
                  <Label htmlFor="inappropriate" className="text-gray-300">Inappropriate Content</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="misinformation" id="misinformation" className="text-white border-gray-500 focus:ring-white"  />
                  <Label htmlFor="misinformation" className="text-gray-300">Misinformation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" className="text-white border-gray-500 focus:ring-white"  />
                  <Label htmlFor="other" className="text-gray-300">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label htmlFor="report-details" className="text-gray-300">
                Additional details
              </Label>
              <Textarea
                id="report-details"
                placeholder="Please provide more information about your report..."
                className="bg-gray-900 border-gray-700 text-gray-100 placeholder:text-gray-500"
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-gray-300">
                Your email (optional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                className="bg-gray-900 border-gray-700 text-gray-100 placeholder:text-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-gray-400">
                Provide your email if you would like to be notified about the outcome
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !reportReason || !reportDetails}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReportForm;
