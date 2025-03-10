"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BookOpen, FileText, ArrowLeft } from "lucide-react";

// Book request schema
const bookSchema = z.object({
  type: z.literal("book"),
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  author: z.string().min(3, {
    message: "Author must be at least 3 characters.",
  }),
  description: z.string().optional(),
});

// Research paper schema
const researchPaperSchema = z.object({
  type: z.literal("researchPaper"),
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  author: z.string().min(3, {
    message: "Author must be at least 3 characters.",
  }),
  field: z.string().min(2, {
    message: "Field must be at least 2 characters.",
  }),
  description: z.string().optional(),
});

export default function RequestPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("book");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Book form
  const bookForm = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      type: "book",
      title: "",
      author: "",
      description: "",
    },
  });

  // Research paper form
  const researchPaperForm = useForm<z.infer<typeof researchPaperSchema>>({
    resolver: zodResolver(researchPaperSchema),
    defaultValues: {
      type: "researchPaper",
      title: "",
      author: "",
      field: "",
      description: "",
    },
  });

  async function onSubmitBook(values: z.infer<typeof bookSchema>) {
    setIsSubmitting(true);
    try {
      // Format as JSON payload
      const payload = {
        type: values.type,
        details: {
          title: values.title,
          author: values.author,
          description: values.description,
        },
      };

      // Using environment variable for API base URL
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/request/request-content`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit request");
      }

      toast.success("Request Submitted", {
        description: "Your book request has been submitted successfully.",
      });

      bookForm.reset();
    } catch (error) {
      toast.error("Error", {
        description: "Failed to submit request",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onSubmitResearchPaper(
    values: z.infer<typeof researchPaperSchema>
  ) {
    setIsSubmitting(true);
    try {
      // Format as JSON payload
      const payload = {
        type: values.type,
        details: {
          title: values.title,
          author: values.author,
          field: values.field,
          description: values.description,
        },
      };

      // Using environment variable for API base URL
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/request/request-content`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit request");
      }

      toast.success("Request Submitted", {
        description:
          "Your research paper request has been submitted successfully.",
      });

      researchPaperForm.reset();
    } catch (error) {
      toast.error("Error", {
        description: "Failed to submit request",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    // Full screen container with min height of viewport
    <div className="min-h-screen bg-black/80 flex flex-col">
      <div className="container mx-auto px-4 py-10 flex-grow flex flex-col mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow flex flex-col"
        >
          <Button
            variant={"default"}
            className="mb-6 self-start"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Card className="w-full flex-grow flex flex-col bg-black/40">
            <CardHeader>
              <CardTitle className="text-2xl">Request Content</CardTitle>
              <CardDescription>
                Submit your request for a book or research paper that you would
                like to see added to our collection.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex flex-col h-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-neutral-900">
                  <TabsTrigger
                    value="book"
                    className="text-white data-[state=active]:bg-neutral-800 data-[state=active]:text-white data-[state=inactive]:text-neutral-400 hover:text-white"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Book
                  </TabsTrigger>
                  <TabsTrigger
                    value="researchPaper"
                    className="text-white data-[state=active]:bg-neutral-800 data-[state=active]:text-white data-[state=inactive]:text-neutral-400 hover:text-white"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Research Paper
                  </TabsTrigger>
                </TabsList>

                <div className="flex-grow mt-6">
                  <TabsContent value="book" className="h-full">
                    <Form {...bookForm}>
                      <form
                        onSubmit={bookForm.handleSubmit(onSubmitBook)}
                        className="space-y-6 h-full flex flex-col"
                      >
                        <div className="space-y-6 flex-grow">
                          <FormField
                            control={bookForm.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">
                                  Book Title
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter book title"
                                    {...field}
                                    className="bg-neutral-800 text-white border-neutral-700 focus:bg-neutral-800 hover:bg-neutral-800"
                                  />
                                </FormControl>
                                <FormDescription className="text-neutral-400">
                                  Please provide the full title of the book.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={bookForm.control}
                            name="author"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">
                                  Author
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter author name"
                                    {...field}
                                    className="bg-neutral-800 text-white border-neutral-700 focus:bg-neutral-800 hover:bg-neutral-800"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={bookForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">
                                  Additional Details (Optional)
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Add any additional information about the book"
                                    className="min-h-[150px] bg-neutral-800 text-white border-neutral-700 focus:bg-neutral-800 hover:bg-neutral-800"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-neutral-800 text-white hover:bg-neutral-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? "Submitting..."
                            : "Submit Book Request"}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>

                  <TabsContent value="researchPaper" className="h-full">
                    <Form {...researchPaperForm}>
                      <form
                        onSubmit={researchPaperForm.handleSubmit(
                          onSubmitResearchPaper
                        )}
                        className="space-y-6 h-full flex flex-col"
                      >
                        <div className="space-y-6 flex-grow">
                          <FormField
                            control={researchPaperForm.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">
                                  Paper Title
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter paper title"
                                    {...field}
                                    className="bg-neutral-800 text-white border-neutral-700 focus:bg-neutral-800 hover:bg-neutral-800"
                                  />
                                </FormControl>
                                <FormDescription className="text-neutral-400">
                                  Please provide the full title of the research
                                  paper.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={researchPaperForm.control}
                            name="author"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">
                                  Author
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter author name"
                                    {...field}
                                    className="bg-neutral-800 text-white border-neutral-700 focus:bg-neutral-800 hover:bg-neutral-800"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={researchPaperForm.control}
                            name="field"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">
                                  Field of Research
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g. Computer Science, Medicine"
                                    {...field}
                                    className="bg-neutral-800 text-white border-neutral-700 focus:bg-neutral-800 hover:bg-neutral-800"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={researchPaperForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">
                                  Additional Details (Optional)
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Add any additional information about the research paper"
                                    className="min-h-[150px] bg-neutral-800 text-white border-neutral-700 focus:bg-neutral-800 hover:bg-neutral-800"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-neutral-800 text-white hover:bg-neutral-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? "Submitting..."
                            : "Submit Paper Request"}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-muted-foreground">
              You can submit up to 2 requests everyday.
              check regularly for updates.
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
