import { dynamic } from 'umi';

export default dynamic({
  async loader() {
    const { default: DifferenceHeatmap } = await import('./index');
    return DifferenceHeatmap;
  },
});
