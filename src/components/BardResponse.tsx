import Image from 'next/image';
import { Donut } from './chart/Donut';

export const BardResponse = ({
  text,
  date,
  categories,
  scores,
}: {
  text: string;
  date: string;
  categories: string[];
  scores: number[];
}) => (
  <>
    <figure className="mx-auto max-w-screen-md text-center">
      <div className="flex justify-center">
        {categories.map((c, i) => {
          const score = Math.floor((scores[i] as number) * 100);

          return (
            <div
              key={i}
              className="flex w-24 cursor-help flex-col items-center"
              title={`${c}: ${score.toString()}% match`}
            >
              <span className="rounded bg-purple-900 px-2.5 py-0.5 text-xs font-medium text-white">
                {c}
              </span>
              <div className="mt-2 h-6 w-6">
                <Donut score={score} height={10} width={10} />
              </div>
            </div>
          );
        })}
      </div>
      <svg
        aria-hidden="true"
        className="mx-auto mb-3 mt-5 h-12 w-12 text-gray-400 dark:text-gray-600"
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
          fill="currentColor"
        />
      </svg>
      <blockquote>
        <p className="text-sm font-medium italic text-gray-900">
          &quot;{text}&quot;
        </p>
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-center space-x-3">
        <Image
          className="h-6 w-6 rounded-full"
          src="/Google_Bard_logo.png"
          alt="profile picture"
          width="64"
          height="64"
        />
        <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
          <cite className="pr-3 font-medium text-gray-900 dark:text-white">
            Google Bard
          </cite>
          <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
            {date}
          </cite>
        </div>
      </figcaption>
    </figure>
  </>
);
