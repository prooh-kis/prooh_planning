import { downloadExcel } from "../../utils/excelUtils";

export const DownLoadCampaignLogReport = ({ campaignLog, campaign }: any) => {
  const handleClick = () => {
    downloadExcel({ campaignLog, campaign });
  };

  return (
    <div className="py-4">
      <button
        title="s"
        className="border border-1 py-2 px-4 rounded-lg bg-blue text-white hover:bg-blue-500 w-full text-center"
        onClick={handleClick}
      >
        <i className="fi fi-sr-file-download pr-4"></i>
        Download Logs
      </button>
    </div>
  );
};
