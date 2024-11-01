import { TabWithIcon } from "../molecules/TabWithIcon";
import React, { useEffect, useState } from "react";
import { AdsPlayTimeTabData } from "../../utils/hardCoddedData";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Footer } from "../../components/footer";
import {
  AdsPlaySelectedSummaryTable,
  AdsPlayTimeTable,
} from "../../components/tables";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { getTableDataScreenWiseAdPlayTime } from "../../actions/screenAction";
import { Loading } from "../../components/Loading";

// const tableData = {
//   result: [
//     {
//       touchPoint: "Premium High Street",
//       screenData: [
//         {
//           screenName: "CyberHubTwin_(3x2_1280x768)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.173533307799996,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.009647007100002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.9600359069,
//                 included: true,
//               },
//               night: {
//                 percentage: 16.567793875499998,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.2332655639,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.4838025675,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.924819097099999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.794216101700002,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.452172611000002,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.7631139688,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.353878449600002,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.600198093800003,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "CyberCityBig_(10x1_6000x588)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.173533307799996,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.009647007100002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.9600359069,
//                 included: true,
//               },
//               night: {
//                 percentage: 16.567793875499998,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.2332655639,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.4838025675,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.924819097099999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.794216101700002,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.452172611000002,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.7631139688,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.353878449600002,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.600198093800003,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "SD-GK2 (2x1_1920x960)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "CP-Chemsford-(2x1_1540x768)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.637879823799999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.6765626748,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.7956364745,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.133346286000002,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.228980222999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.859856299399999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.505722477499997,
//                 included: true,
//               },
//               night: {
//                 percentage: 14.160604481,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 14.954585201499999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.470038601299999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.789330653599999,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.8520777268,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "CP-Shivaji_(2x1_1540x768)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.637879823799999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.6765626748,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.7956364745,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.133346286000002,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.228980222999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.859856299399999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.505722477499997,
//                 included: true,
//               },
//               night: {
//                 percentage: 14.160604481,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 14.954585201499999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.470038601299999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.789330653599999,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.8520777268,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "CP-ESS-(2x1_1728x768)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.637879823799999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.6765626748,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.7956364745,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.133346286000002,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.228980222999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.859856299399999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.505722477499997,
//                 included: true,
//               },
//               night: {
//                 percentage: 14.160604481,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 14.954585201499999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.470038601299999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.789330653599999,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.8520777268,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "OfficePod-(1x2)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "Zeus_Testing-2",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "CP-Block-B (3.5x1_1680x480)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.637879823799999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.6765626748,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.7956364745,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.133346286000002,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.228980222999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.859856299399999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.505722477499997,
//                 included: true,
//               },
//               night: {
//                 percentage: 14.160604481,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 14.954585201499999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.470038601299999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.789330653599999,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.8520777268,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "CP-Block-A (3x1_1024x384)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.637879823799999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.6765626748,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.7956364745,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.133346286000002,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.228980222999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.859856299399999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.505722477499997,
//                 included: true,
//               },
//               night: {
//                 percentage: 14.160604481,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 14.954585201499999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.470038601299999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.789330653599999,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.8520777268,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "CP-Block-F (3.5x1_1280x384)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.637879823799999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.6765626748,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.7956364745,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.133346286000002,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.228980222999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.859856299399999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.505722477499997,
//                 included: true,
//               },
//               night: {
//                 percentage: 14.160604481,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 14.954585201499999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.470038601299999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.789330653599999,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.8520777268,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "Zeus_Testing-3",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "Vishal Cyber City CH",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.173533307799996,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.009647007100002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.9600359069,
//                 included: true,
//               },
//               night: {
//                 percentage: 16.567793875499998,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.2332655639,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.4838025675,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.924819097099999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.794216101700002,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.452172611000002,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.7631139688,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.353878449600002,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.600198093800003,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "SD-GK1-A (2x1_1920x960)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "SD-GK1-B (2x1_1920x960)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "MidCir-01_(1x1_962x962)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "MidCir-08_(1x1_962x962)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "Zeus_Testing-1",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "MidCir-04_(1x1_962x962)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "MidCir-06_(1x1_962x962)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "MidCir-05_(1x1_962x962)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "MidCir-07_(1x1_962x962)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "MidCir-02_(1x1_962x962)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "IFC_U_Reflex (2x3_1000x1500)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "IFC_U_Walk_Entry (2x3_1000x1500)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "IFC_U_Social (1x2_1000x2000)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "IFC_L_Shape (9x1_4320x480)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "IFC_Main Entry_Front (4x1_2000x500)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "IFC_Main_Entry_Back (7x1_2100x300)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "IFC_Escalator (8x3_2000x750)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "IFC_Sky_Walk (4x1_2000x500)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "IFC_Stone_Wall (3x1_2100x700)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "Office_1 (2x1_1920x1080)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "Office_2 (2x1_1920x1080)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "Sec29GGN_(7x5_2240x1600)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//       ],
//     },
//     {
//       touchPoint: "Golf course",
//       screenData: [
//         {
//           screenName: "ITC_(3x2_1920x1152)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.173533307799996,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.009647007100002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.9600359069,
//                 included: true,
//               },
//               night: {
//                 percentage: 16.567793875499998,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.2332655639,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.4838025675,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.924819097099999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.794216101700002,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.452172611000002,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.7631139688,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.353878449600002,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.600198093800003,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "NGC_(2x1_1344x768)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "JaypeeGreens_(2x3.5_1536x2560)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "DGC-Pods (1x2_1080x1920)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "DGC-Entrance2 (2.5x1_2496x1040)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "DGC-Entrance1 (2x1_1920X864)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "DGC-CaddyHut (4x1_3120x892)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "DGC-Pods-2 (1x2_1080x1920)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//       ],
//     },
//     {
//       touchPoint: "Neighborhood premium Mall",
//       screenData: [
//         {
//           screenName: "SPM-1_(9x8_1024x896)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "SPM_V_(3x8_768x2048)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "Mega mall",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.637879823799999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.6765626748,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.7956364745,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.133346286000002,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.228980222999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.859856299399999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.505722477499997,
//                 included: true,
//               },
//               night: {
//                 percentage: 14.160604481,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 14.954585201499999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.470038601299999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.789330653599999,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.8520777268,
//                 included: true,
//               },
//             },
//           },
//         },
//       ],
//     },
//     {
//       touchPoint: "Neighborhood hi-street",
//       screenData: [
//         {
//           screenName: "SD-NehruPlace (4x3_2000x1500)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "JwalaHeri-TL_(2x1_1920x960)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "JwalaHeri-2_(2x1_1920x960)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//       ],
//     },
//     {
//       touchPoint: "Arterial Route",
//       screenData: [
//         {
//           screenName: "GolDakKhana (2.5x1_1280x486)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.637879823799999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.6765626748,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.7956364745,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.133346286000002,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.228980222999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.859856299399999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.505722477499997,
//                 included: true,
//               },
//               night: {
//                 percentage: 14.160604481,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 14.954585201499999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.470038601299999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.789330653599999,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.8520777268,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "PatelChowk-B (4x3_1680x1240)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.637879823799999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.6765626748,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.7956364745,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.133346286000002,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.228980222999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.859856299399999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.505722477499997,
//                 included: true,
//               },
//               night: {
//                 percentage: 14.160604481,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 14.954585201499999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.470038601299999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.789330653599999,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.8520777268,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "Safdarjung-(5x1_2940x620)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "PatelChowk-A (3.5x1_2100x620)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.637879823799999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.6765626748,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.7956364745,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.133346286000002,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.228980222999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.859856299399999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.505722477499997,
//                 included: true,
//               },
//               night: {
//                 percentage: 14.160604481,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 14.954585201499999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.470038601299999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.789330653599999,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.8520777268,
//                 included: true,
//               },
//             },
//           },
//         },
//       ],
//     },
//     {
//       touchPoint: "Feeder route",
//       screenData: [
//         {
//           screenName: "UdyogBhawan_(7x4_1408x768)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "KhanMarket-A (3x1_1728x576)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "AIIMS-(2x1_1120x520)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "SanMartin-(2x1_1600x768)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "RK-Ashram-(3x2_1216x768)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.637879823799999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.6765626748,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.7956364745,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.133346286000002,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.228980222999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.859856299399999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.505722477499997,
//                 included: true,
//               },
//               night: {
//                 percentage: 14.160604481,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 14.954585201499999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.470038601299999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.789330653599999,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.8520777268,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "AshokaHotel (3x2_1216x768)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "ChanakyaPuri (3x1_2428x768)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "MaxMuller (5x4_1024x768)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "Panchkuiyan_(5x4_1024x768)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.637879823799999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.6765626748,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.7956364745,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.133346286000002,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.228980222999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.859856299399999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.505722477499997,
//                 included: true,
//               },
//               night: {
//                 percentage: 14.160604481,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 14.954585201499999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.470038601299999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.789330653599999,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.8520777268,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "KaliBari_(2x1_1920x960)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.637879823799999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.6765626748,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.7956364745,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.133346286000002,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.228980222999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.859856299399999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.505722477499997,
//                 included: true,
//               },
//               night: {
//                 percentage: 14.160604481,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 14.954585201499999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.470038601299999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.789330653599999,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.8520777268,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "KhanMarket-B (2x1_1260x620)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "INA (2x1_1970x820)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "LodhiGarden (2x1_840x620)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "KG-Marg (2x1_1562x710)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 15.637879823799999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 12.6765626748,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.7956364745,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.133346286000002,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.228980222999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.859856299399999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.505722477499997,
//                 included: true,
//               },
//               night: {
//                 percentage: 14.160604481,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 14.954585201499999,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.470038601299999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 13.789330653599999,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.8520777268,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "TeenMurti-(1x1_1440x1440)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "SouthAevnue_(2x1_1120x512)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "SD-Saket (1x2_1920x3360)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "SD-Emporio (2x1_1920x1080)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//         {
//           screenName: "MidCir-03_(1x1_962x962)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 14.356814999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 10.5481,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.902804999999997,
//                 included: true,
//               },
//               night: {
//                 percentage: 15.43879,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 16.121464999999997,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.848025,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.677484999999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.885565,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.474785,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.005680000000002,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.38158,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.495405000000002,
//                 included: true,
//               },
//             },
//           },
//         },
//       ],
//     },
//     {
//       touchPoint: "luxury residential",
//       screenData: [
//         {
//           screenName: "ShantiNiketan_(2x1_1920x960)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//       ],
//     },
//     {
//       touchPoint: "CBD- SOHO",
//       screenData: [
//         {
//           screenName: "SD-Jasola (2x1_1920x960)",
//           dayWiseData: {
//             weekdays: {
//               morning: {
//                 percentage: 17.062009326,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 13.010700616100001,
//                 included: true,
//               },
//               evening: {
//                 percentage: 14.186281870700004,
//                 included: true,
//               },
//               night: {
//                 percentage: 17.1256684341,
//                 included: true,
//               },
//             },
//             saturdays: {
//               morning: {
//                 percentage: 15.562922543300001,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 15.186743097499999,
//                 included: true,
//               },
//               evening: {
//                 percentage: 15.0036962621,
//                 included: true,
//               },
//               night: {
//                 percentage: 13.3444092333,
//                 included: true,
//               },
//             },
//             sundays: {
//               morning: {
//                 percentage: 13.4258691978,
//                 included: true,
//               },
//               afternoon: {
//                 percentage: 14.5818739832,
//                 included: true,
//               },
//               evening: {
//                 percentage: 12.932634608999999,
//                 included: true,
//               },
//               night: {
//                 percentage: 12.810698332999998,
//                 included: true,
//               },
//             },
//           },
//         },
//       ],
//     },
//   ],
//   bottomTableData: {
//     selected: {
//       morning: 99.99999999999994,
//       afternoon: 99.99999999999994,
//       evening: 99.99999999999994,
//       night: 99.99999999999994,
//     },
//     totalTable: {
//       weekdays: {
//         morning: 100.00000000000014,
//         afternoon: 100.00000000000014,
//         evening: 100.00000000000014,
//         night: 100.00000000000014,
//       },
//       saturdays: {
//         morning: 100.00000000000014,
//         afternoon: 100.00000000000014,
//         evening: 80.00000000000014,
//         night: 100.00000000000014,
//       },
//       sundays: {
//         morning: 70.00000000000014,
//         afternoon: 100.00000000000014,
//         evening: 100.00000000000014,
//         night: 100.00000000000014,
//       },
//     },
//   },
// };

interface BottomTableData {
  selected: {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
  };
  totalTable: {
    weekdays: {
      morning: number;
      afternoon: number;
      evening: number;
      night: number;
    };
    saturdays: {
      morning: number;
      afternoon: number;
      evening: number;
      night: number;
    };
    sundays: {
      morning: number;
      afternoon: number;
      evening: number;
      night: number;
    };
  };
}

interface Tab {
  label: string;
  id: string;
}

interface TimeData {
  percentage: number;
  included: boolean;
}

interface DayData {
  morning: TimeData;
  afternoon: TimeData;
  evening: TimeData;
  night: TimeData;
}

interface DayWiseData {
  weekdays: DayData;
  saturdays: DayData;
  sundays: DayData;
}

interface ScreenData {
  screenName: string;
  dayWiseData: DayWiseData;
}

interface ResultData {
  touchPoint: string;
  screenData: ScreenData[];
}

interface EnterCampaignBasicDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
}

export const SetAdsPlayTime = ({
  setCurrentStep,
  step,
  campaignId,
}: EnterCampaignBasicDetailsProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [currentTab, setCurrentTab] = useState<keyof DayWiseData>("weekdays");
  // const [data, setData] = useState<ResultData[]>([]);



  const tableDataScreenWiseAdPlayTimeGet = useSelector((state: any) => state.tableDataScreenWiseAdPlayTimeGet);
  const {
    loading,
    error,
    data: tableData
  } = tableDataScreenWiseAdPlayTimeGet;

  const [data, setData] = useState<ResultData[]>(tableData?.result);
  const [bottomTableData, setBottomTableData] = useState<BottomTableData>(
    tableData?.bottomTableData
  );

  const handleSaveAndContinue = async () => {

    console.log(tableData?.result)
    if (tableData) {
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Set Ad Play time Page",
          id: pathname.split("/").splice(-1)[0],
          touchPointWiseDetails: tableData?.result,
        })
      );
      setCurrentStep(step + 1);
    }
  };

  useEffect(() => {
    if (tableData) {
      setData(tableData?.result);
      setBottomTableData(tableData?.bottomTableData);
    }
  }, [tableData]);

  useEffect(() => {
    dispatch(getTableDataScreenWiseAdPlayTime({id: campaignId }));
  }, [dispatch, campaignId]);
  console.log(tableData)

  return (
    <div className="w-full py-3">
      <h1 className="text-3xl ">Set Ads Play time</h1>
      <h1 className="text-sm text-gray-500 ">
        your final bill will include the cost of all the additional slots, at
        the same cost that your slots were booked.
      </h1>
      <div className="mt-2">
        <TabWithIcon
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabData={AdsPlayTimeTabData}
        />
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <p></p>
      ) : (
        <div className="mt-2">
          <AdsPlayTimeTable
            currentTab={currentTab}
            data={data}
            setData={setData}
          />
        </div>
      )}

      <h1 className="text-xl py-4">Selected summary</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <p></p>
      ) : (
        <div className="mt-2">
          <AdsPlaySelectedSummaryTable
            currentTab={currentTab}
            bottomTableData={bottomTableData}

          />
        </div>
      )}


      <div className="px-4 fixed bottom-0 left-0 w-full bg-white">
        <Footer
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={handleSaveAndContinue}
          campaignId={campaignId}
        />
      </div>
    </div>
  );
};
