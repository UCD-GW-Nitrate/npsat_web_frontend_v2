import cvhm from "./ScenariosWellData/cvhm";
import c2vsim from "./ScenariosWellData/c2vsim";
import { Card } from "antd";
import { identity } from "lodash";

//onChange contains dynamic region id based on selections
//countyList contains both name and id based on region selected
const WellNumber = ({onChange, scenario = 'c2vsim', countyList, regionType}) => {

    
    console.log('selected:', onChange);
    //load well data based on scenario
    var wellData = [];
    if (scenario === 'c2vsim')
        wellData = c2vsim;
    else
        wellData = cvhm;
    
    console.log('County List', countyList);

    // anchor data point for each region:
    // basin: id, mantis_id
    // county: id, mantis_id
    // B118 Basin: id, mantis_id
    // subRegions: id, mantis_id
    // township: id, mantis_id

    //store countyList in dictionary for easy lookup
    
    var countyDic = {}
    countyList.map((county) => countyDic[county.id] = county.mantis_id);
    

    //populate mantis_id for data lookup
    var mantis_id = [];
    onChange.map((id) => mantis_id.push(countyDic[id]));
    console.log('mantis_id: ', mantis_id);
  

    // regionType: 
    // Basin 1
    // subRegion 2
    // B118Basin 3
    // county 4
    // Township 5

    //Step1. store well data in dictionary for easy lookup
    //Step2. look up well dictionary based on regionType 
    var wellDic = {};
    var wellCount = 0;
    switch (regionType) {
        case 1://basin
        //Step1
            wellData.map((well) => {
                if (!wellDic.hasOwnProperty(well.Basin)) {
                    wellDic[well.Basin] = 1;
                }
                else {
                    wellDic[well.Basin]++;
                }
            });
        //Step2
            mantis_id.map((id) => wellCount += wellDic[id]);
            break;
        case 2:// subRegion
            //Step1
            wellData.map((well) => {
                if (!wellDic.hasOwnProperty(well.Sub)) {
                    wellDic[well.Sub] = 1;
                }
                else {
                    wellDic[well.Sub]++;
                }
            });
        //Step2
            mantis_id.map((id) => wellCount += wellDic[id]);
            break;
        case 3://B118 Basin
            //Step1
            wellData.map((well) => {
                if (!wellDic.hasOwnProperty(well.B118)) {
                    wellDic[well.B118] = 1;
                }
                else {
                    wellDic[well.B118]++;
                }
            });
        //Step2
            mantis_id.map((id) => {
                if (wellDic.hasOwnProperty(id)){
                    wellCount += wellDic[id];
                }
            });
            break;
        case 4:// county
            //Step1
            wellData.map((well) => {
                if (!wellDic.hasOwnProperty(well.County)) {
                    wellDic[well.County] = 1;
                }
                else {
                    wellDic[well.County]++;
                }
            });
        //Step2
        mantis_id.map((id) => {
            if (wellDic.hasOwnProperty(id)){
                wellCount += wellDic[id];
            }
        });
            break;
        case 5: // Township
            //Step1
            wellData.map((well) => {
                if (!wellDic.hasOwnProperty(well.Tship)) {
                    wellDic[well.Tship] = 1;
                }
                else {
                    wellDic[well.Tship]++;
                }
            });
        //Step2
        mantis_id.map((id) => {
            if (wellDic.hasOwnProperty(id)){
                wellCount += wellDic[id];
            }
        });
            break;
        default:
            console.log('RegionType Error: Type cannot be found!')
            break;
    }


   
    return (
        <div>
            <Card>Number of Wells Selected: {wellCount}</Card>
        </div>
    );

};

export default WellNumber;