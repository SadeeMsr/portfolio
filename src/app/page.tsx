import { profile } from "@/data/resume";
import Landing from "@/landing/Landing";

export default function Home() {
  return (
    <>
      <div className="sr-only">
        <h1>
          {profile.name}: {profile.title}
        </h1>
        <p>{profile.summary}</p>
        <a href="/pro">Professional portfolio</a> <a href="/os">RohanOS, the interactive portfolio</a>
      </div>
      <Landing />
    </>
  );
}
