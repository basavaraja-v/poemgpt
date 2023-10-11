"use client";

import * as z from 'zod';
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';


const generateFormSchema = z.object({
  Language: z.string().min(1),
  DescriptiveDetails: z.string().min(10).max(160),
  Occasion: z.string().min(1),
  Theme: z.string().min(1),
});

type GenerateFormValues = z.infer<typeof generateFormSchema>;

const Body = () => {

  const form = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
    mode: 'onChange',

    // Set default values so that the form inputs are controlled components.
    defaultValues: {
      Language: '',
      DescriptiveDetails: '',
      Theme: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string>("");

  const generateResponse = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const formValues = form.getValues();
    const prompt = `Generate a poem in English, inspired by following details:

- Descriptive Details: ${formValues.DescriptiveDetails}
- Theme: ${formValues.Theme}

Max. Characters allowed 200`;

    e.preventDefault();
    setResponse("");
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      const formattedChunk = chunkValue.replace(/\n\n/g, '<br /><br />').replace(/\n/g, '<br />');
      setResponse((prev) => prev + formattedChunk);
    }
    setLoading(false);
  };

  const [copied, setCopied] = useState(false); // State to track if text is copied

  // Function to copy the content to the clipboard
  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = response;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
  };

  return (
    <div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-10">
        <div className="col-span-1">
          <h1 className="text-3xl font-bold mb-10">Generate a poem</h1>

          <Form {...form}>
            <form>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="DescriptiveDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descriptive Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe Appearance, Favorite, Likes, Hobbies, Mindset (e.g., Deep ocean eyes, Roses, Stargazing on quiet nights, Playing the piano, Always optimistic)"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Theme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Theme</FormLabel>
                      <FormControl>
                        <Input placeholder="Set the theme (e.g., Love and eternity)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!loading ? (
                  <button
                    className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-black/80"
                    onClick={(e) => generateResponse(e)}
                  >
                    Generate
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white"
                  >
                    <div className="animate-pulse font-bold tracking-widest">...</div>
                  </button>
                )}
              </div>
            </form>
          </Form>
        </div>
        <div className="col-span-1">
          <h1 className="text-3xl font-bold mb-10">Poem</h1>
          {response && (
            <div className="ml-4 rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100">
              <div className="scrollable-content" dangerouslySetInnerHTML={{ __html: response }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;

// <FormField
//                   control={form.control}
//                   name="Language"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Language</FormLabel>
//                       <FormControl>
//                         <select {...field} className="block w-full rounded-md border border-neutral-400 p-4 text-neutral-900 shadow-sm focus:ring-neu focus:border-neutral-900">
//                           <option value="english">English</option>
//                           <option value="kannada">Kannada</option>
//                           {/* Add more options as needed */}
//                         </select>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
