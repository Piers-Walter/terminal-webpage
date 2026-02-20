import Link from "next/link";
import { FaOtter, FaSquareGithub } from "react-icons/fa6";

export default function AboutPage() {
  return (
    <div className="h-full w-full bg-gray-800 text-white">
      <div className="mt-2 flex flex-col items-center">
        <FaOtter size={100} />
        <p className="text-center">
          <span className="text-2xl font-extrabold">OtterOS</span>
          <div className="mt-10" />
          <span className="text-gray-400">Build #{process.env.NEXT_PUBLIC_GIT_COMMIT}</span>
          <br />
          <span>
            <Link target="_blank" href="https://github.com/Piers-Walter/terminal-webpage">
              <FaSquareGithub size={40} className="inline" />
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
