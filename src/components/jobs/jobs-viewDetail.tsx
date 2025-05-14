"use client";
import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const markdown = `# Översikt`;

// Needs to install something realted to tailwind CSS to solve this problem
// You can google it 

export function JobViewDetails() {
  return (
    <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
  );
  // const params = useParams();
  // const jobId = params?.id;

  // const jobData = job.find((j) => j.id === jobId);

  // // Om params inte laddats än eller ogiltigt ID
  // if (!jobId || !jobData) return <p>Loading...</p>;

  // return (
  //   <>
  //     <div className="bg-blue-700 text-white p-8 text-center">Fake header</div>
  //     <div className="py-6 px-7 md:px-15 lg:px-20 xl:px-40 mb-8">
  //       {/* <h4 className="hidden md:block my-9 font-light text-lg">
  //         <a href="/">Home</a> / 
  //         <a href="/jobs"> Job board</a> /  
  //         <a href={`/jobs/${jobData.id}`}> {jobData.company}</a>
  //       </h4> */}
  //     <Markdown remarkPlugins={[remarkGfm]}>{jobData.markdown}</Markdown>
  //     </div>
  //   </>
  // );
}
