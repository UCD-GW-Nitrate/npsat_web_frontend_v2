import { dynamic } from 'umi';

export default dynamic({
  async loader() {
    const { default: GroupComparisonLinePlot } = await import('./index');
    return GroupComparisonLinePlot;
  },
});
