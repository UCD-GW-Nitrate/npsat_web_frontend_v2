import { useEffect, useState } from 'react';
import { getScenarios, SCENARIO_MACROS } from '@/services/scenario';

/**
 * react hook that is used to get different scenario groups
 * @returns {{unsatScenarios: *[], flowScenarios: *[], loadScenarios: *[]}}
 */
export const useScenarioGroups = () => {
  const [flowScenarios, setFlowScenarios] = useState([]);
  const [loadScenarios, setLoadScenarios] = useState([]);
  const [unsatScenarios, setUnsatScenarios] = useState([]);
  useEffect(() => {
    getScenarios(SCENARIO_MACROS.TYPE_FLOW).then(({ results }) => {
      setFlowScenarios(results);
    });
    getScenarios(SCENARIO_MACROS.TYPE_LOAD).then(({ results }) => {
      setLoadScenarios(results);
    });
    getScenarios(SCENARIO_MACROS.TYPE_UNSAT).then(({ results }) => {
      setUnsatScenarios(results);
    });
  }, []);
  return {
    flowScenarios,
    loadScenarios,
    unsatScenarios,
  };
};
