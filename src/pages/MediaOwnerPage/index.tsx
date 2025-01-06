import React from "react";
import {
  Reward,
  image1,
  image2,
  image12,
  image13,
  image14,
  image15,
  image4,
  image8,
  image9,
  image3,
  image6,
  image7,
} from "../../assets/index";
import { PageFooter } from "../../components/PageFooter";

export const MediaOwnerPage: React.FC = () => {
  return (
    <div className="w-screen h-full pb-0">
      <div
        className="flex justify-center items-center  bg-[#129BFF] h-[500px] w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(https://media.gettyimages.com/id/1583336780/photo/wide-angle-shot-if-times-square-with-bright-led-displays-on-a-sunny-day-new-york-city-usa.jpg?s=612x612&w=0&k=20&c=tXoj1QeAQoLEZMQwn7TVcXVh-8C64bm_er7gF5C-G2g=)`,
          height: "500px",
          width: "full",
        }}
      >
        {/* <img src="" alt="media owner" className="h-[530px] w-full" /> */}
        <div className="flex flex-col justify-center">
          <h1 className="text-white text-[60px] font-bold">Media Owner</h1>
          <h1 className="text-white text-[30px] font-bold">
            Because Reach Matters
          </h1>
        </div>
      </div>

      <div className="flex justify-center mt-16">
        <div className="flex flex-col w-[68%]">
          <h1 className="text-[#254354] text-[40px] font-bold mt-4 self-start">
            Unlock New Revenue Streams. Optimize Your Occupancy.{" "}
          </h1>
          <h1 className="text-[#254354] text-[20px]  mt-4">
            Prooh ooh ad-network converts conventional media buys into audience
            buys making ooh media more accountable & affordable.
          </h1>
          <div className="flex justify-between mt-16">
            <div className="flex flex-col justify-center items-center border border-1 border-[#C9C9C9] rounded-[13px] h-[394px] w-[347px] px-[20px] py-[41px]">
              <div className="h-[71px] w-[71px] bg-[#129BFF] rounded-full flex justify-center items-center">
                <i className="fi fi-sr-users-alt text-[#FFFFFF] text-[30px]"></i>
              </div>
              <h1 className="text-[#254354] text-[24px] font-bold text-center mt-4">
                Sell Media on <br /> Audience Impressions
              </h1>
              <h1 className="text-[#0E212E] text-[16px]  text-center mt-2 ">
                Discover locations frequented most by your lookalike audiences
                and Accurately forecast total traffic and target audience
                impressions.
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center border border-1 border-[#C9C9C9] rounded-[13px] h-[394px] w-[347px] px-[20px] py-[41px]">
              <div className="h-[71px] w-[71px] bg-[#129BFF] rounded-full flex justify-center items-center">
                <i className="fi fi-sr-users-alt text-[#FFFFFF] text-[30px]"></i>
              </div>
              <h1 className="text-[#254354] text-[24px] font-bold text-center mt-4">
                Applies to both Static <br /> & PROOH
              </h1>
              <h1 className="text-[#0E212E] text-[16px]  text-center mt-2 ">
                Unprecedented access to 800+ OOH & DOOH media units via multiple
                purchase agreements media owners & through programmatic SSP
                integrations.
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center border border-1 border-[#C9C9C9] rounded-[13px] h-[394px] w-[347px] px-[20px] py-[41px]">
              <div className="h-[71px] w-[71px] flex justify-center items-center">
                <img src={Reward} alt="rewards" />
              </div>
              <h1 className="text-[#254354] text-[24px] font-bold text-center mt-4">
                Assured Business With <br /> Quarterly MG
              </h1>
              <h1 className="text-[#0E212E] text-[16px]  text-center mt-2 ">
                {
                  "Get supplier-direct pricing adjusted with validation of actual target audience impressions. If you’re quoted a better price elsewhere, we'll match it."
                }
              </h1>
            </div>
          </div>
          <div className="flex justify-center mt-16 ">
            <div className="flex flex-col items-center justify-center gap-4 ">
              <h1 className="text-[#254354] text-[20px] font-bold text-center">
                PARTNER WITH US:
              </h1>
              <h1 className="text-[#254354] text-[40px] font-bold text-center">
                Process Of On-Boarding A Media Owner
              </h1>

              <h1 className="text-[#0E212E] text-[16px]  text-center p-0 m-0">
                Our industry leading ad-network platform helps media owners
                unlock the full value of their media sites through automation,
                business optimization and support for programmatic <br />{" "}
                transactions with complete transparency in terms of
                client-direct pricing and validation of actual impressions
                delivered.
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-16 mt-16">
            {/* Section 1 */}
            <div className="flex justify-between items-center gap-8">
              <img
                src={image1}
                alt="image1"
                className="w-[621px] h-[350px] object-cover rounded-md"
              />
              <div className="flex flex-col">
                <h1 className="text-[#254354] text-[24px] font-bold">
                  <span className="text-[30px]">1.</span> Mapping Road Segments,
                  eco-
                  <br />
                  systems & Media Inventory (Static & DOOH)
                </h1>
                <p className="text-[#0E212E] text-[16px] mt-8 h-[216px] w-[475px]">
                  {
                    "A road Segment is a section of a route where all vehicles getting in must also exit with no pilferage in the vehicle count. Such Road Segments are also classified as arterial, connecting, and neighborhood roads to facilitate audience planning. All the media sites (Static+DOOH) present on each Road segment and indoor ecosystem are identified, processed & updated with seller details, indicative MOP, and data of previous advertisers. Each media unit represents a Prooh score/site indexing score making the selection process fast & dependable."
                  }
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex justify-between items-center gap-8">
              <div className="flex flex-col">
                <h1 className="text-[#254354] text-[24px] font-bold">
                  <span className="text-[30px]">2.</span> Integrating traffic,
                  poi & Mobile <br />
                  Data to forecast audience <br />
                  impressions
                </h1>
                <p className="text-[#0E212E] text-[16px] mt-8 h-[216px] w-[475px]">
                  {
                    "Prooh accurately converts vehicle numbers into audience impressions using google's speed data, R.T.O vehicles circulation data & D.U.L.T audience approximation data. Such aggregated data goes through 500M+ POI location pings/SDK data attributing route presence of lookalike audiences to find locations frequented most by various target audience segments. Our Robust and verified  Algorithms has accreditation of IIT madras and other Industry sources which attributes traffic and profiling for forecasting impressions."
                  }
                </p>
              </div>
              <img
                src={image2}
                alt="image2"
                className="w-[621px] h-[700px] object-cover rounded-md"
              />
            </div>

            {/* Section 3 */}
            <div className="flex justify-between items-center gap-8">
              <img
                src={image3}
                alt="image3"
                className="w-[625px] h-[444px] object-cover rounded-md"
              />
              <div className="flex flex-col">
                <h1 className="text-[#254354] text-[24px] font-bold">
                  <span className="text-[30px]">3.</span> Your vacant Inventory{" "}
                  <br />
                  becomes ready-for-sale on <br />
                  audience impressions
                </h1>
                <p className="text-[#0E212E] text-[16px] mt-8 h-[216px] w-[475px]">
                  Investments will increase when OOH becomes measurable. With
                  PROOH ad- network, a brand only pays for the target audience
                  impressions instead of total impressions and applies the % of
                  target audience to the current market operating rentals of the
                  media site resulting in 20 to 40% savings. Such a justified
                  method of arriving at ooh media pricing shall result into
                  allocation of more budgets from existing spenders and fresh
                  budgets from brands which are either startups or large brands
                  not pursuing ooh. Prooh is bringing online buying practices in
                  ooh.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="flex justify-between items-center gap-8">
              <div className="flex flex-col">
                <h1 className="text-[#254354] text-[24px] font-bold">
                  <span className="text-[30px]">4.</span> Prooh enables
                  planning, budgeting, site <br /> selection & contextual
                  targeting
                </h1>
                <p className="text-[#0E212E] text-[16px] mt-8 h-[216px] w-[475px]">
                  {`The campaign investment budget is forecasted basis the adjustment of the
target audience vs the total impressions available at a location to the Market
operating price of each site. At this stage of providing a work-order to
PROOH, the client saves min 20% on the MOP. However, the actual payment
is computed after validation of actual impressions captured through live data
(traffic & sdk) during the actual campaign duration. The final payment may be
5%+- of the PO Value. Large variations may occur due to some events which
results into steep fall and rise in the traffic during the campaign days.`}
                </p>
              </div>
              <img
                src={image4}
                alt="image4"
                className="w-[604px] h-[429px] object-cover rounded-md"
              />
            </div>

            {/* Section 5 */}
            <div className="flex justify-between items-center gap-8">
              <img
                src={image13}
                alt="image13"
                className="w-[620px] h-[350px] object-cover rounded-md"
              />
              <div className="flex flex-col">
                <h1 className="text-[#254354] text-[24px] font-bold">
                  <span className="text-[30px]">5.</span> Campaign Installation
                  through traditional & programmatic methods
                </h1>
                <p className="text-[#0E212E] text-[16px] mt-8 h-[216px] w-[475px]">
                  Campaigns are installed using conventional methods of
                  printing, installation & innovations for static OOH with
                  minimum lead time & through automated content scheduling for
                  DOOH. Our industry leading DOOH software helps media owners
                  unlock the full value of their network and support
                  programmatic transactions. While automation takes care of
                  sales, the media owner still maintains full control over their
                  inventory by approving each ad, its forecasted rental before
                  it is installed on their static/dooh sites.
                </p>
              </div>
            </div>
            {/* 6 */}
            <div className="flex justify-between items-center gap-8">
              <div className="flex flex-col">
                <h1 className="text-[#254354] text-[24px] font-bold">
                  <span className="text-[30px]">6.</span> Budget basis forecast
                  & <br /> actual payment basis impressions <br /> validation
                </h1>
                <p className="text-[#0E212E] text-[16px] mt-8 h-[216px] w-[475px]">
                  The campaign investment budget is forecasted basis the
                  adjustment of the target audience vs the total impressions
                  available at a location to the Market operating price of each
                  site. At this stage of providing a work-order to PROOH, the
                  client saves min 20% on the MOP. However, the actual payment
                  is computed after validation of actual impressions captured
                  through live data (traffic & sdk) during the actual campaign
                  duration. The final payment may be 5%+- of the PO Value. Large
                  variations may occur due to some events which results into
                  steep fall and rise in the traffic during the campaign days.
                </p>
              </div>
              <img
                src={image6}
                alt="image15"
                className="w-[692px] h-[491px] object-cover rounded-md"
              />
            </div>

            {/* Section 7 */}
            <div className="flex justify-between items-center gap-8">
              <img
                src={image7}
                alt="image14"
                className="w-[598px] h-[425px] object-cover rounded-md"
              />
              <div className="flex flex-col">
                <h1 className="text-[#254354] text-[24px] font-bold">
                  <span className="text-[30px]">7.</span> END TO END WORKFLOWS
                  WITH 100% TRANSPARENCY
                </h1>
                <p className="text-[#0E212E] text-[16px] mt-8 h-[216px] w-[475px]">
                  Analyst Geographies, Audience Segmentation, Audience planning,
                  Site Selection, Site pricing based on Target audience
                  adjustment, reporting of execution, proof of display,
                  Validation of Impressions delivery and final pricing. All in
                  real-time and on a Single view dashboard accessible by
                  client/media owner & prooh. Campaign reporting is achieved
                  through submission of Date-time-stamp Camera for OOH and
                  through a Log report in PDOOH. Complete transparency is
                  provided in terms of client- supplier pricing & prooh
                  earnings.
                </p>
              </div>
            </div>

            {/* Section 8*/}
            <div className="flex justify-between items-center gap-8">
              <div className="flex flex-col">
                <h1 className="text-[#254354] text-[24px] font-bold">
                  <span className="text-[30px]">8.</span> Earning potential of
                  media
                  <br />
                  owner with prooh ad-network
                </h1>
                <p className="text-[#0E212E] text-[16px] mt-8 h-[216px] w-[475px]">
                  Each media owner is paid 70% of the client invoice value.
                  Prooh retains 30% of all media billings and also charges the
                  client 4% fee for logistics and management of their campaign.
                  In addition to servicing quarterly MG’s to the media owner,
                  other substantial investments include - building Technology,
                  acquisition and processing of data (sdk and traffic) along
                  with fixed costs towards procurement of various IOT devices &
                  software licenses only to make a media owners site measurable
                  and sellable on “impression based buys”.
                </p>
              </div>
              <img
                src={image8}
                alt="image8"
                className="w-[692px] h-[491px] object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-8 px-40 bg-[#129BFF] flex justify-between">
        <div>
          <h1 className="text-[#254354] text-[49.16px] font-bold w-[593px] text-[#FFFFFF]">
            {`Ready to build your team's dream Campaign`}
          </h1>
          <button className="bg-[#FFFFFF] text-[#000000] px-[58px] py-[20px]  rounded-[9px] text-[16px] font-bold mt-8">
            Create Campaign
          </button>
        </div>
        <img src={image9} alt="" />
      </div>
      <PageFooter />
    </div>
  );
};
