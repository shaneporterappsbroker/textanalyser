export const getScoreColor = (score: number) =>
  ['green', 'orange', 'red'][Math.floor(score / 33)] as string;

export const sleep = async () =>
  await new Promise((p) =>
    setTimeout(p, Math.floor(Math.random() * 2000) + 1000)
  );
