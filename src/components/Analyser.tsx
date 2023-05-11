import { useCallback, useState } from 'react';
import { FileUpload } from './FileUpload';
import { type ApiResponse, type FileDetails } from '~/types';
import { useAnalysisHistory } from '~/state/store';

type Props = {
  onComplete: (resultsData: ApiResponse) => void;
};

export const Analyser = ({ onComplete }: Props) => {
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const { addHistoryItem } = useAnalysisHistory();

  const checkText = useCallback(
    ({ name, size, textContent }: FileDetails) => {
      setIsChecking(true);

      fetch('/api/handler', {
        body: textContent,
        method: 'POST',
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.status.toString());

          return response.json();
        })
        .then((data: ApiResponse) => {
          setIsChecking(false);
          onComplete(data);

          const processDate = new Date();

          // append to the history:
          addHistoryItem({
            id: processDate.getTime(),
            filename: name,
            fileSize: size,
            processDate,
            result: data,
          });
        })
        .catch((error) => {
          console.log('CS: ', error);
          setIsChecking(false);
        });
    },
    [addHistoryItem, onComplete]
  );

  return (
    <div className="flex flex-col overflow-auto">
      <FileUpload
        onUploaded={(fileDetails: FileDetails) => checkText(fileDetails)}
        isChecking={isChecking}
      />
    </div>
  );
};
