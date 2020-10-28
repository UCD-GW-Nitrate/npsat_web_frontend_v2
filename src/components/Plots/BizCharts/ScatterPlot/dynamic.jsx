import { dynamic } from 'umi';

export default dynamic({
  async loader() {
    const { default: ScatterPlot } = await import('./index');
    return ScatterPlot;
  },
});
