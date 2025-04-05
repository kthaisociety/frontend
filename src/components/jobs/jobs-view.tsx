import { JobCard } from "./job-card";


const mockJobData = [
  {
      title: "Backend Engineer",
      id: "1",
      company: "Google",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
      description: "Join our engineering team to build scalable backend systems that power Google's core products. You'll work with cutting-edge technologies and collaborate with world-class engineers to solve complex problems.",
      location: "San Francisco, CA",
      jobType: "Full-time"
  },
  {
      title: "AI Researcher",
      id: "2",
      company: "OpenAI",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
      description: "Change the world with AI. Join our team of researchers and engineers to push the boundaries of AI technology. You'll work with cutting-edge technologies and collaborate with world-class engineers to solve complex problems.",
      location: "San Francisco, CA",
      jobType: "Full-time"
  },
  {
      title: "Frontend Developer",
      id: "3",
      company: "Airbnb",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
      description: "Join our engineering team to build scalable frontend systems that power Airbnb's core products. You'll work with cutting-edge technologies and collaborate with world-class engineers to solve complex problems.",
      location: "Stockholm, Sweden",
      jobType: "Full-time"
  },

];


export function JobsView() {
  return (
    <div className="flex flex-col ">
      <div className="bg-blue-700 text-white p-8 text-center">Fake header</div>
      <div className="py-6 px-7 md:px-15 lg:px-20 xl:px-40 mb-8">
        <h4 className="hidden md:block my-9 font-light text-lg">
          <a href="/">Home</a> / <a href="/jobs">Job board</a>
        </h4>
        <h1 className="text-5xl font-semibold text-center md:text-left my-6">
          Job board
        </h1>
        <p className="text-md mb-4">
          We at KTH AI Society strive to bridge the gap between our members and
          the industry. It’s quite simple, companies working for the solutions
          of tomorrow need the talent of today. So below we listed all relevant
          work opportunities for you to take on new challenges.
        </p>
        <p className="text-md mb-4">
          If you want to make a job posting contact us at
          <a
            className="text-blue-700 cursor-pointer"
            href="mailto:jobs@kthais.com"
          >
            {" "}
            jobs@kthais.com
          </a>
          .
        </p>
        <a
          className="cursor-pointer text-md font-semibold text-black"
          href="https://www."
          target="_blank"
          rel="noopener noreferrer mb-4"
        >
          Any questions? Check out our FAQ
        </a>
        .
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-7 md:px-15 lg:px-20 xl:px-40 mb-10">
        {mockJobData.map((job) => (
          <JobCard
            key={job.title}
            title={job.title}
            company={job.company}
            companyLogo={job.companyLogo}
            description={job.description}
            location={job.location}
            jobType={job.jobType}
            id={job.id}
          />
        ))}
      </div>
    </div>
  );
}
