import { useEffect, useState } from 'react';
import { getScenarios, SCENARIO_MACROS } from '@/services/scenario';

/**
 * react hook that is used to get different scenario groups
 * @returns {{unsatScenarios: *[], flowScenarios: *[], loadScenarios: *[], welltypeScenarios: *[]}}
 */
export const useScenarioGroups = () => {
  const [flowScenarios, setFlowScenarios] = useState([]);
  const [loadScenarios, setLoadScenarios] = useState([]);
  const [unsatScenarios, setUnsatScenarios] = useState([]);
  const [welltypeScenarios, setWelltypeScenarios] = useState([]);
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
    getScenarios(SCENARIO_MACROS.TYPE_WELLTYPE).then(({ results }) => {
      setWelltypeScenarios(results);
    });
  }, []);
  return {
    flowScenarios,
    loadScenarios,
    unsatScenarios,
    welltypeScenarios,
  };
};
