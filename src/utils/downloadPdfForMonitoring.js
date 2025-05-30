const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/campaigns`;

export const downloadMonitoringPdf = async (campaignId, cb) => {
  try {
    const { data } = await axios.get(
      `${url}/campaignDetailsByCampaignCreationId?id=${id}`
    );
  } catch (error) {}
};
