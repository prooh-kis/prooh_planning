import { useNavigate } from "react-router-dom";

export function ConformationModelForCreative({ open, onClose, link }: any) {
  const navigate = useNavigate();
  if (!open) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-white rounded-[10px] h-[350px] w-[350px] p-1">
        <div
          className="relative inset-0 flex items-center justify-end gap-4 p-3"
          onClick={onClose}
        >
          <i className="fi fi-rr-cross-small"></i>
        </div>
        <div className="flex flex-col justify-center items-center  p-2">
          <i className="fi fi-sr-file-upload text-[32px] text-[#129BFF]"></i>
          <h1 className="text-center font-semibold text-lg">
            Have You Uploaded The
          </h1>
          <h1 className="text-center font-semibold text-lg">
            Creatives To The Media Bucket?
          </h1>
          <h1 className="text-sm text-[#717171] text-center pt-2">
            You Cannot Launch A Campaign Unless Your{" "}
          </h1>
          <h1 className="text-sm text-[#717171] text-center">
            Creatives Are Uploaded To The Media Bucket
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center pt-4">
          <button
            className="border border-1 py-2 px-8 bg-[#129BFF90] hover:bg-[#129BFF] text-white rounded-2xl w-[50%]"
            onClick={() => {
              if (onClose) onClose();
              navigate(link);
            }}
          >
            Yes
          </button>
          <h1
            onClick={() => {
              onClose();
              navigate("/my-creatives");
            }}
            className="text-[16px] text-[#129BFF]  pt-2 underline cursor-pointer"
          >
            {"I Don't Have Creative Upload new"}
          </h1>
        </div>
      </div>
    </div>
  );
}
