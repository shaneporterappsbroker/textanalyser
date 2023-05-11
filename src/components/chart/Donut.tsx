import { VictoryPie } from 'victory';

export const Donut = ({
  score,
  width = 20,
  height = 20,
}: {
  score: number;
  width?: number;
  height?: number;
}) => {
  return (
    <VictoryPie
      colorScale={['#581C87', '#dedede']}
      data={[{ x: 'Score', y: score }, { y: 100 - score }]}
      innerRadius={Math.floor(width / 5)}
      animate={{ duration: 1000 }}
      width={width}
      height={height}
      labels={() => null}
      padding={0}
    />
  );
};
