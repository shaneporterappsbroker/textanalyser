import { type NextApiRequest, type NextApiResponse } from 'next';
import { type BardApiResponse } from '~/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch(process.env.API_URI as string, {
    body: req.body as string,
    method: 'POST',
  });

  if (!response.ok) {
    // throw new Error(`Internal Server error - ${response.status}`);
    console.log(response.ok);
    return res.status(500).send('{}');
  }

  const data = (await response.json()) as unknown;
  const error = (data as { error: string }).error;

  if (error) {
    console.log(error);
    return res.status(500).send(JSON.stringify(error));
    // throw new Error(`Internal server error - ${error}`);
  }

  const date = new Date();

  return res.status(200).json({
    ...(data as BardApiResponse),
    // additional values for us:
    date,
    id: date.getTime(),
    textResponse: req.body as string,
  });
};

export default handler;
