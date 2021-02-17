import { getModelResults, getRegionDetail } from '@/pages/model/view/service';
import { useEffect, useState } from 'react';
import { ordinalSuffix } from '@/utils/utils';

/**
 * react hook that returns the region info (used by map)
 * @param regionArray pass model.regions
 * @returns {*[]}
 */
export const useModelRegions = (regionArray) => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    if (regionArray) {
      Promise.all(regionArray.map((region) => getRegionDetail({ id: region.id }))).then(
        (results) => {
          const formattedRegions = results.map((region) => {
            const result = region;
            result.geometry.properties.name = region.name;
            return result;
          });
          setRegions(formattedRegions);
        },
      );
    }
  }, [regionArray]);

  return regions;
};

/**
 * react hook that returns the model results in an array [plotData, percentiles]
 * @param resultsArray
 * @param token
 * @returns {[{}, *[]]}
 */
export const useModelResults = (resultsArray, token) => {
  const [plotData, setData] = useState({});
  const [percentiles, setPercentiles] = useState([]);

  useEffect(() => {
    if (resultsArray) {
      Promise.all(resultsArray.map((percentile) => getModelResults(percentile.id, token))).then(
        (data) => {
          const results = {};
          data.forEach((percentile) => {
            results[percentile.percentile] = percentile.values.map((value, index) =>
              // start year is always 1945
              ({
                year: 1945 + index,
                value,
                percentile: `${ordinalSuffix(percentile.percentile)} percentile`,
              }),
            );
          });
          setPercentiles(data.map((percentile) => percentile.percentile));
          setData(results);
        },
      );
    }
  }, [resultsArray, token]);

  return [plotData, percentiles];
};
