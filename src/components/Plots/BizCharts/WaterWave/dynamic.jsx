import { dynamic } from 'umi';

export default dynamic({
  async loader() {
    const { default: WaterWave } = await import('./index');
    return WaterWave;
  },
});
