import { dynamic } from 'umi';

export default dynamic({
  async loader() {
    const { default: DifferenceHistogram } = await import('./index');
    return DifferenceHistogram;
  },
});
