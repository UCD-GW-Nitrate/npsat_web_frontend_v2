import cvhm from "./ScenariosWellData/cvhm";
import C2VSim_VI from "./ScenariosWellData/C2VSim_II_VI_02";
import C2VSim_VD from "./ScenariosWellData/C2VSim_II_VD_02";
import TshipWell from "./ScenariosWellData/TshipWell";
import { Card } from "antd";
import { identity } from "lodash";
import { connect } from 'react-redux';

//onChange contains dynamic region id based on selections
//countyList contains both name and id based on region selected
const WellNumber = ({onChange, countyList, regionType, cdata, mdata}) => {

    const flow_scenario = mdata.flow_scenario ? mdata.flow_scenario : cdata.flow_scenario;
    const welltype_scenario = mdata.welltype_scenario ? mdata.welltype_scenario : cdata.welltype_scenario;
    
    console.log('selected:', onChange);
    console.log("flow_scenario: ", flow_scenario);
    console.log("welltype: ", welltype_scenario);
    
    //load well data based on scenario
    var wellData = [];
////////////////////////////////////////////////////need for updated data 

    if (flow_scenario == 8){//GUI_flowScen == C2VSIM
        if (welltype_scenario == 10){//GUI_wellType == Public
            wellData = C2VSim_VI;
        }
        else if (welltype_scenario == 11){//GUI_wellType == domestic
            wellData = C2VSim_VD;
        }
        else {//GUI_wellType == virtual monitoring (welltype_scenario == 12)
            wellData = TshipWell;
        }
    }

    // if (flow_scenario == 9){//GUI_flowScen == CVHM
    //     if (welltype_scenario == 10)//GUI_wellType == Public
    //         wellData = CVHM_irr;
    //     else if (welltype_scenario == 11)//GUI_wellType == domestic
    //         wellData = CVHM_dom;
    // }


////////////////////////////////////
    if (flow_scenario === 9)
        wellData = cvhm;
    
    console.log('County List', countyList);
    
    console.log("cdata: ", cdata);
   
    console.log("mdata: ", mdata);

    

    var filter; 
    var data;

    if (mdata.hasOwnProperty('step2Type')){
        filter = mdata.regionFilter;
        data = mdata;
    }
    else if (cdata.hasOwnProperty('flow_scenario')){
        filter = cdata.regionFilter;
        data = cdata;
    }
    //prepare advanced filter if exist
    var depth_range = []; 
    var screen_length_range = [];
    if (filter){
        depth_range = data.depth_range[1] > 3000 ? [data.depth_range[0], 9999] : data.depth_range;
        screen_length_range = data.screen_length_range[1] > 1500 ? [data.screen_length_range[0], 9999] : data.screen_length_range;
        console.log('depth',depth_range);
        console.log('SL', screen_length_range);
    }


    var wellCount = 0;
    if (welltype_scenario != 12){

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
    // => [# (number of wells), well_depth(D), screen_length (SL)]
    //Step2. look up well dictionary based on regionType 
    var wellDic = {};
    switch (regionType) {
        case 1://basin
        //Step1
            wellData.map((well) => {
                if (!wellDic.hasOwnProperty(well.Basin)) {
                    if (filter){
                        if (well.D >= depth_range[0] && well.D <= depth_range[1]
                            && well.SL >= screen_length_range[0] && well.SL <= screen_length_range[1]) 
                            wellDic[well.Basin] = [1, well.D, well.SL];
                        else
                            wellDic[well.Basin] = [0, well.D, well.SL];
                    }
                    else{
                        wellDic[well.Basin] = [1, well.D, well.SL];
                    }
                }
                else {
                    if (filter){
                        if (well.D >= depth_range[0] && well.D <= depth_range[1]
                            && well.SL >= screen_length_range[0] && well.SL <= screen_length_range[1]) 
                            wellDic[well.Basin][0]++;
                    }
                    else
                        wellDic[well.Basin][0]++;
                }
            });
        //Step2
            mantis_id.map((id) => wellCount += wellDic[id][0]);
            break;
        case 2:// subRegion
            //Step1
            wellData.map((well) => {
                if (!wellDic.hasOwnProperty(well.Sub)) {
                    if (filter){
                        if (well.D >= depth_range[0] && well.D <= depth_range[1]
                            && well.SL >= screen_length_range[0] && well.SL <= screen_length_range[1]) 
                            wellDic[well.Sub] = [1, well.D, well.SL];
                        else
                            wellDic[well.Sub] = [0, well.D, well.SL];
                    }
                    else{
                        wellDic[well.Sub] = [1, well.D, well.SL];
                    }
                }
                else {
                    if (filter){
                        if (well.D >= depth_range[0] && well.D <= depth_range[1]
                            && well.SL >= screen_length_range[0] && well.SL <= screen_length_range[1]) 
                            wellDic[well.Sub][0]++;
                    }
                    else
                        wellDic[well.Sub][0]++;
                }
            });
        //Step2
            mantis_id.map((id) => wellCount += wellDic[id][0]);
            break;
        case 3://B118 Basin
            //Step1
            wellData.map((well) => {
                if (!wellDic.hasOwnProperty(well.B118)) {
                    if (filter){
                        if (well.D >= depth_range[0] && well.D <= depth_range[1]
                            && well.SL >= screen_length_range[0] && well.SL <= screen_length_range[1]) 
                            wellDic[well.B118] = [1, well.D, well.SL];
                        else
                            wellDic[well.B118] = [0, well.D, well.SL];
                    }
                    else{
                        wellDic[well.B118] = [1, well.D, well.SL];
                    }
                }
                else {
                    if (filter){
                        if (well.D >= depth_range[0] && well.D <= depth_range[1]
                            && well.SL >= screen_length_range[0] && well.SL <= screen_length_range[1]) 
                            wellDic[well.B118][0]++;
                    }
                    else
                        wellDic[well.B118][0]++;
                }
            });
        //Step2
            mantis_id.map((id) => {
                if (wellDic.hasOwnProperty(id)){
                    wellCount += wellDic[id][0];
                }
            });
            break;
        case 4:// county
            //Step1
            wellData.map((well) => {
                if (!wellDic.hasOwnProperty(well.County)) {
                    if (filter){
                        if (well.D >= depth_range[0] && well.D <= depth_range[1]
                            && well.SL >= screen_length_range[0] && well.SL <= screen_length_range[1]) 
                            wellDic[well.County] = [1, well.D, well.SL];
                        else
                            wellDic[well.County] = [0, well.D, well.SL];
                    }
                    else{
                        wellDic[well.County] = [1, well.D, well.SL];
                    }
                }
                else {
                    if (filter){
                        if (well.D >= depth_range[0] && well.D <= depth_range[1]
                            && well.SL >= screen_length_range[0] && well.SL <= screen_length_range[1]) 
                            wellDic[well.County][0]++;
                    }
                    else
                        wellDic[well.County][0]++;
                }
            });
        //Step2
        mantis_id.map((id) => {
            if (wellDic.hasOwnProperty(id)){
                wellCount += wellDic[id][0];
            }
        });
            break;
        case 5: // Township
            //Step1
            wellData.map((well) => {
                if (!wellDic.hasOwnProperty(well.Tship)) {
                    if (filter){
                        if (well.D >= depth_range[0] && well.D <= depth_range[1]
                            && well.SL >= screen_length_range[0] && well.SL <= screen_length_range[1]) 
                            wellDic[well.Tship] = [1, well.D, well.SL];
                        else
                            wellDic[well.Tship] = [0, well.D, well.SL];
                    }
                    else{
                        wellDic[well.Tship] = [1, well.D, well.SL];
                    }
                }
                else {
                    if (filter){
                        if (well.D >= depth_range[0] && well.D <= depth_range[1]
                            && well.SL >= screen_length_range[0] && well.SL <= screen_length_range[1]) 
                            wellDic[well.Tship][0]++;
                    }
                    else
                        wellDic[well.Tship][0]++;
                }
            });
        //Step2
        mantis_id.map((id) => {
            if (wellDic.hasOwnProperty(id)){
                wellCount += wellDic[id][0];
            }
        });
            break;
        default:
            console.log('RegionType Error: Type cannot be found!')
            break;
    }
} else {//viryual monitoring well with only Township available 
    //store township well info in a dictionary for faster look up
    var TshipWellDic = {};
    TshipWell.map((tship) => {
        TshipWellDic[tship.Township] = tship.WellCount;
    });
    //store countyList in dictionary for easy lookup
    var countyDic = {}
    countyList.map((county) => countyDic[county.id] = county.external_id);
    //count well numbers for selected township(s)
    onChange.map((tship) => {
        if (countyDic[tship] in TshipWellDic){
            wellCount += TshipWellDic[countyDic[tship]];
        }
    });
}


   
    return (
        <div>
            <Card>Number of Wells Selected: {wellCount}</Card>
        </div>
    );

};


export default connect(({ createModelForm, copyAndModifyModelForm }) => ({
    cdata: createModelForm.step,//data in createModelForm
    mdata: copyAndModifyModelForm.step,//data in modifyModelForm
  }))(WellNumber);
  