"use client";
import { useParams } from "next/navigation";

export function JobViewDetails() {

  const params = useParams();
  const jobId = params?.id; 

  //some kind of api call to get data from db based on the id. fetch(jobId )....

  //Potential data from db 
  const mockaup_data =[{
    id: 1,
    title:  "Software Engineer",
    company: "Google",
    companyOverview: "short paragraph about company",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
    description: "Company description",
    location: "Company location",
    jobType: "Company job type",
    jobResponsibilities: "Company job responsibilities",
    requirements: "Company requirements",
  }]

  //View not done, since different companies may have different details / specfications of the design / etc.

  return (
    <div>
      <div className="bg-blue-700 text-white p-8 text-center">Fake header</div>
      <div className="py-6 px-7 md:px-15 lg:px-20 xl:px-40 mb-8">
        <h4 className="hidden md:block my-9 font-light text-lg">
          <a href="/">Home</a> / <a href="/jobs">Job board</a> /{" "}
          <a> {mockaup_data[0].company}</a>
        </h4>
        <h1 className="text-5xl font-semibold text-center md:text-left my-6">
          {mockaup_data[0].company}
        </h1>
        <p className="text-md mb-4">
          {mockaup_data[0].description}
        </p>
      </div>
    </div>
  );
}
