export type Step = 'upload' | 'results';

export type FileDetails = {
  name: string;
  size: number;
  textContent: string;
};

export type HistoryItem = {
  id: number;
  filename: string;
  fileSize: number;
  processDate: Date;
  result: ApiResponse;
};

export type BardApiResponse = {
  predictions: [
    {
      safetyAttributes: {
        categories: string[];
        scores: number[];
        blocked: boolean;
      };
      content: string;
    }
  ];
  deployedModelId: string;
  model: string;
  modelDisplayName: string;
  modelVersionId: string;
};

export type ApiResponse = BardApiResponse & {
  // additional values for us:
  id: number;
  date: Date;
  textResponse: string;
};
