import { type ApiResponse } from '~/types';
import { BardResponse } from './BardResponse';
import dayjs from 'dayjs';

type Props = {
  result: ApiResponse;
};

export const Results = ({ result }: Props) => {
  return (
    <div className="md:w-full lg:w-1/2">
      <div className="flex flex-col">
        <div className="flex items-center pb-12 pt-3">
          <BardResponse
            text={result.predictions[0].content}
            date={dayjs(result.date.toString()).format('HH:mm DD/MM/YYYY')}
            categories={result.predictions[0].safetyAttributes.categories}
            scores={result.predictions[0].safetyAttributes.scores}
          />
        </div>
      </div>
      <pre className="w-full whitespace-pre-wrap border border-gray-300 bg-white p-6 text-sm">
        {result.textResponse}
      </pre>
    </div>
  );
};
