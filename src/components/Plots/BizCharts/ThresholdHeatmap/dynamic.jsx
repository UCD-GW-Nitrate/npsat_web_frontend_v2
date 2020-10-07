import { dynamic } from 'umi';

export default dynamic({
  async loader() {
    const { default: ThresholdHeatmap } = await import('./index');
    return ThresholdHeatmap;
  },
});
