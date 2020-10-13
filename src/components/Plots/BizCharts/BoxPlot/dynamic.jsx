import { dynamic } from 'umi';

export default dynamic({
  async loader() {
    const { default: BoxPlot } = await import('./index');
    return BoxPlot;
  },
});
