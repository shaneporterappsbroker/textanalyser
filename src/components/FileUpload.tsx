import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { Spinner } from './Spinner';
import { type FileDetails } from '~/types';
import { IconCloudArrowUp } from './icons/IconCloudArrowUp';

type Props = {
  onUploaded: (fileDetails: FileDetails) => void;
  isChecking: boolean;
};

export const FileUpload = ({ isChecking, onUploaded }: Props) => {
  return (
    <FileUploader
      name="file"
      types={['txt']}
      multiple={false}
      label="Upload or drop a file"
      handleChange={(file: File) => {
        const fileReader = new FileReader();
        fileReader.readAsText(file);

        fileReader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
          onUploaded({
            name: file.name,
            size: file.size,
            textContent: e.target?.result as string,
          });
        });
      }}
    >
      <div className="w-96">
        <label
          htmlFor="dropzone-file"
          className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-gray-500 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <IconCloudArrowUp />
            <p className="my-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Text files
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />

          {isChecking && <Spinner />}
        </label>
      </div>
    </FileUploader>
  );
};
