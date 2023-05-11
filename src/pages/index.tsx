import { type NextPage } from 'next';
import Head from 'next/head';
import { Analyser } from '~/components/Analyser';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAnalysisHistory } from '~/state/store';
import { type ApiResponse, type Step } from '~/types';
import { useState } from 'react';
import { IconCross } from '~/components/icons/IconCross';
import { Donut } from '~/components/chart/Donut';
import { Results } from '~/components/Results';

dayjs.extend(relativeTime);

const Home: NextPage = () => {
  const { historyItems, removeHistoryItem } = useAnalysisHistory();
  const [results, setResults] = useState<ApiResponse | null>(null);
  const [step, setStep] = useState<Step>('upload');

  return (
    <>
      <Head>
        <title>textanalyser</title>
        <meta name="description" content="Text Analyser" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#fcfcfa]">
        <aside
          id="default-sidebar"
          className="fixed left-0 top-0 z-40 flex h-screen w-80 flex-col border-r-2 border-purple-200 bg-purple-50 dark:bg-purple-900"
          aria-label="Sidebar"
        >
          <div className="flex h-full flex-col overflow-y-auto p-4">
            {historyItems.length === 0 && (
              <p className="text-sm">
                Analyses you&apos;ve run will appear here
              </p>
            )}
            {historyItems.length > 0 && (
              <ul className="space-y-2 text-sm font-medium">
                <li>
                  <button
                    onClick={() => setStep('upload')}
                    className="w-full p-4 hover:bg-purple-800 hover:text-white"
                  >
                    New Analysis
                  </button>
                </li>
                {historyItems.map((item) => {
                  return (
                    <li key={item.id}>
                      <a
                        href="#"
                        className={`flex rounded-lg p-2 text-purple-900 hover:bg-purple-100${
                          item.id === results?.id
                            ? ' border border-purple-900'
                            : ''
                        }`}
                        onClick={() => {
                          setResults(item.result);
                          setStep('results');
                        }}
                      >
                        <div>
                          <Donut score={69} />
                        </div>
                        <div className="flex flex-1 flex-col pl-4">
                          <span>{item.filename}</span>
                          <span className="font-light italic">
                            {dayjs().to(dayjs(item.processDate))}
                          </span>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              setStep('upload');
                              removeHistoryItem(item.id);
                            }}
                            className="hover:bg-purple-700 hover:text-white"
                            title={`Remove '${item.filename}' from history`}
                          >
                            <IconCross />
                          </button>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="mt-auto flex">
            <a href="https://www.appsbroker.com">
              <Image
                src="/logo.webp"
                alt="Appsbroker"
                width="768"
                height="337"
              />
            </a>
          </div>
        </aside>

        <div className="ml-80 flex p-4">
          {step === 'upload' && (
            <Analyser
              onComplete={(resultsData) => {
                setResults(resultsData);
                setStep('results');
              }}
            />
          )}
          {step === 'results' && results && <Results result={results} />}
        </div>
      </main>
    </>
  );
};

export default Home;
