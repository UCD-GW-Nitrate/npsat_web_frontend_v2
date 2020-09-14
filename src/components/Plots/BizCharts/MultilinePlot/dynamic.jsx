import { dynamic } from 'umi';

export default dynamic({
  async loader() {
    const { default: MultilinePlot } = await import('./index');
    return MultilinePlot;
  },
});
