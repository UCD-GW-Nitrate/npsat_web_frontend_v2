import { dynamic } from 'umi';

export default dynamic({
  async loader() {
    const { default: AreaPlot } = await import('./index');
    return AreaPlot;
  },
});
