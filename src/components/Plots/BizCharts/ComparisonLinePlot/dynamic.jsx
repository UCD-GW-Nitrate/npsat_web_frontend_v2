import { dynamic } from 'umi';

export default dynamic({
  async loader() {
    const { default: ComparisonLinePlot } = await import('./index');
    return ComparisonLinePlot;
  },
});
