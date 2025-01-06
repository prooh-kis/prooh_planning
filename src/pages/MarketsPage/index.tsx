import React from "react";
import {
  Reward,
  image10,
  image11,
  image12,
  image4,
  image13,
  image14,
  image15,
  image9,
} from "../../assets/index";
import { PageFooter } from "../../components/PageFooter";

export const MarketsPage: React.FC = () => {
  return (
    <div className="w-screen h-full pb-0">
      <div
        className="flex justify-center items-center  bg-[#129BFF] h-[500px] w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(https://media.istockphoto.com/id/1394347337/photo/black-woman-typing-and-browsing-on-a-laptop-in-an-office-alone.jpg?s=612x612&w=0&k=20&c=U_LbboyyeBx3ghy06DNyVWqFpCNujczdfIgYWdz7haI=)`,
          width: "full",
        }}
      >
        {/* <img src="" alt="media owner" className="h-[530px] w-full" /> */}
        <div className="flex flex-col justify-center">
          <h1 className="text-white text-[60px] font-bold">MARKETERS</h1>
          <h1 className="text-white text-[30px] font-bold">
            Because Reach Matters
          </h1>
        </div>
      </div>

      <div className="flex justify-center mt-16">
        <div className="flex flex-col w-[68%]">
          <h1 className="text-[#254354] text-[40px] font-bold mt-4 self-start">
            Buy Billboards on Audience Impressions. No Fixed Rental.{" "}
          </h1>
          <h1 className="text-[#254354] text-[20px]  mt-4">
            Prooh aggregates anonymized, opt-in, high quality app-sourced sdk
            location data, and combines it with road traffic circulation data to
            determine in real-time, which locations attribute to highest target
            audience penetration and help select media units on visibility index
            parameters and applies the % of impressions delivered vs total
            impressions on the market operating price resulting into 100%
            accountability and assured savings.
          </h1>
          <div className="flex justify-between mt-16">
            <div className="flex flex-col justify-center items-center border border-1 border-[#C9C9C9] rounded-[13px] h-[394px] w-[347px] px-[20px] py-[41px]">
              <div className="h-[71px] w-[71px] bg-[#129BFF] rounded-full flex justify-center items-center">
                <i className="fi fi-sr-users-alt text-[#FFFFFF] text-[30px]"></i>
              </div>
              <h1 className="text-[#254354] text-[24px] font-bold text-center mt-4">
                Audience Impressions
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
                Premium Inventory
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
                Assured 20% Savings
              </h1>
              <h1 className="text-[#0E212E] text-[16px]  text-center mt-2 ">
                {
                  "Get supplier-direct pricing adjusted with validation of actual target audience impressions. If you’re quoted a better price elsewhere, we'll match it."
                }
              </h1>
            </div>
          </div>
          <h1 className="text-[#254354] text-[40px] font-bold  mt-8">
            How IT Works?
          </h1>
          <p className="text-[#0E212E] text-[16px] p-0 m-0">
            Complete Accountability from a single view dashboard backed by Data
            Driven Audience Planning and complete transparency in
            supplier-direct pricing adjusted with Audience Allocation , super
            fast Ad-placement in OOH and DOOH and final payment as per
            validation of actual impressions.
          </p>
          <div className="flex flex-col gap-16 mt-16">
            {/* Section 1 */}
            <div className="flex justify-between items-center gap-8">
              <img
                src={image10}
                alt="image10"
                className="w-[621px] h-[350px] object-cover rounded-md"
              />
              <div className="flex flex-col">
                <h1 className="text-[#254354] text-[24px] font-bold">
                  <span className="text-[30px]">1.</span> END TO END WORKFLOWS
                  WITH 100% TRANSPARENCY
                </h1>
                <p className="text-[#0E212E] text-[16px] mt-4">
                  Super-Fast-Map with real time filters help Analyse
                  Geographies, Audience Segmentation, Audience planning, Site
                  Selection, Site pricing based on Target audience adjustment,
                  reporting of execution, proof of display, Validation of
                  Impressions delivery and final pricing. All on a Single view
                  dashboard accessible by client/media owner & prooh. Campaign
                  reporting is achieved through submission of Date-time-stamp
                  Camera for OOH and through a Log report in PDOOH. Complete
                  transparency is provided in terms of client- supplier pricing,
                  supplier visibility & prooh earnings.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex justify-between items-center gap-8">
              <div className="flex flex-col">
                <h1 className="text-[#254354] text-[24px] font-bold">
                  <span className="text-[30px]">2.</span> Find Locations with
                  the highest audience personas using real-time filters
                </h1>
                <p className="text-[#0E212E] text-[16px] mt-4">
                  {`Each media is able to forecast audience impressions for the
                  selected campaign days and auto adjusts its price to form a
                  campaign budget. Our site score on LTS along with previous
                  advertisers data helps in the site selection process
                  immensely. The shortlisted sites are layered with Points of
                  Interest and multiple filters for campaign visualization by
                  the client to understand very quickly, how the shortlisted
                  locations are the ideal locations targeting the desired
                  audience personas which makes it possible to perform
                  contextual ad-placement at different locations & time of the
                  day.`}
                </p>
              </div>
              <img
                src={image11}
                alt="image11"
                className="w-[621px] h-[440px] object-cover rounded-md"
              />
            </div>

            {/* Section 3 */}
            <div className="flex justify-between items-center gap-8">
              <img
                src={image12}
                alt="image4"
                className="w-[625px] h-[444px] object-cover rounded-md"
              />
              <div className="flex flex-col">
                <h1 className="text-[#254354] text-[24px] font-bold">
                  <span className="text-[30px]">3.</span> Impression
                  forecasting, budgeting, site selection & contextual targeting
                </h1>
                <p className="text-[#0E212E] text-[16px] mt-4">
                  {`Each media is able to forecast audience impressions for the
                  selected campaign days and auto adjusts its price to form a
                  campaign budget. Our site score on LTS along with previous
                  advertisers data helps in the site selection process
                  immensely. The shortlisted sites are layered with Points of
                  Interest and multiple filters for campaign visualization by
                  the client to understand very quickly, how the shortlisted
                  locations are the ideal locations targeting the desired
                  audience personas which makes it possible to perform
                  contextual ad-placement at different locations & time of the
                  day.`}
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="flex justify-between items-center gap-8">
              <div className="flex flex-col">
                <h1 className="text-[#254354] text-[24px] font-bold">
                  <span className="text-[30px]">4.</span> Suggestive creative
                  improvisation & measurement of KPIs
                </h1>
                <p className="text-[#0E212E] text-[16px] mt-4">
                  {`PROOH’S experienced design team makes improvements in the
                  creative to ensure legibility for maximising audience
                  engagement. Different road speeds and distance of the OOH unit
                  from the contact zone are adjusted. KPI’s can be set for
                  measurement of the audience attention triggered around the geo
                  location of the OOH site which can be tracked from the client
                  website. Eg. interest in browsing the company’s website,
                  app/Qr code downloads & increase in foot traffic at retail
                  store around the site location, direct response enquiry on
                  telephone number mentioned on the AD or tracking social
                  sharing of the AD.`}
                </p>
              </div>
              <img
                src={image4}
                alt="image12"
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
                  <span className="text-[30px]">5.</span> Installation through
                  traditional & programmatic methods
                </h1>
                <p className="text-[#0E212E] text-[16px] mt-4">
                  {`The entire campaign installation process is as seamless as
                  possible. Our media buying & operations teams are
                  strategically partnered with the media owners for securing
                  real time availability. Post site level creative
                  improvisation, Production and installation is handled with
                  just a few clicks & campaign images are reported on the client
                  dashboard through a time stamp monitoring app for traditional
                  media while DOOH is executed real time through Programmatic
                  platform which allows contextual targeting abilities based on
                  scheduling, triggers based on partner API’s & live events
                  detected through IOT devices.`}
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="flex justify-between items-center gap-8">
              <div className="flex flex-col">
                <h1 className="text-[#254354] text-[24px] font-bold">
                  <span className="text-[30px]">6.</span> Budget basis forecast
                  & actual payment basis impressions validation
                </h1>
                <p className="text-[#0E212E] text-[16px] mt-4">
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
                src={image14}
                alt="image14"
                className="w-[598px] h-[425px] object-cover rounded-md"
              />
            </div>

            {/* Section 7 */}
            <div className="flex justify-between items-center gap-8">
              <img
                src={image15}
                alt="image15"
                className="w-[692px] h-[491px] object-cover rounded-md"
              />
              <div className="flex flex-col">
                <h1 className="text-[#254354] text-[24px] font-bold">
                  <span className="text-[30px]">7.</span> Prooh engagement model
                  with brands/agencies
                </h1>
                <p className="text-[#0E212E] text-[16px] mt-4">
                  {` Prooh secures only 4% logistics fee from brands towards
                  management of the OOH campaigns. Prooh assures every brand a
                  minimum 20% savings on the current media buying costs and
                  provides services from audience planning, site selection,
                  execution and campaign reporting keeping audience measurement
                  and avoiding ad-wastage as its foundation. Prooh shares the
                  media billings with the media owners in the 30:70 ratio along
                  with servicing quarterly MG’s for bringing their inventory on
                  “impressions based buys” only to bring more affordability for
                  brands.`}
                </p>
              </div>
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
