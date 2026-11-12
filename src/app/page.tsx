import { experience, profile, projects } from "@/data/resume";
import RohanOS from "@/os/RohanOS";

export default function Home() {
  return (
    <>
      {/* Plain, crawlable summary for search engines and screen readers. */}
      <div className="sr-only">
        <h1>
          {profile.name}: {profile.title}
        </h1>
        <p>{profile.summary}</p>
        <h2>Experience</h2>
        <ul>
          {experience.map((j) => (
            <li key={j.company}>
              {j.role} at {j.company} ({j.period})
            </li>
          ))}
        </ul>
        <h2>Projects</h2>
        <ul>
          {projects.map((p) => (
            <li key={p.slug}>
              {p.name}: {p.tagline}
            </li>
          ))}
        </ul>
        <a href="/resume">View the plain-text resume (Recruiter Mode)</a>
      </div>
      <RohanOS />
    </>
  );
}
