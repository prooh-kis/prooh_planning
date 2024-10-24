import { useCallback, useEffect } from "react";

interface MapBoxScreenProps {
  screenData?: any;
  setSelectedScreensFromMap: any;
  isSelectedData: boolean;
  handleAddManualSelection?: any;
}

export const MapboxScreen = ({
  screenData,
  setSelectedScreensFromMap,
  isSelectedData,
  handleAddManualSelection
}: MapBoxScreenProps) => {
  const handleClickScreen = useCallback(() => {
    setSelectedScreensFromMap(screenData);

    if (!isSelectedData) {
      handleAddManualSelection(true);

    } else {
      handleAddManualSelection(false);

    }
  },[handleAddManualSelection, isSelectedData, screenData, setSelectedScreensFromMap]);

  useEffect(() => {

  },[]);
  return (
    <div className="rounded-10">
      <div className="">
        <img src={screenData?.images[0]} alt="screen Image" />
        <div className="pt-2 flex justify-between">
          <div className="">
            <h1 className="font-semibold text-#000000">
              {screenData?.screenName}
            </h1>
            <p>{screenData?.location?.address}</p>
          </div>
          <div onClick={handleClickScreen}>
            {!isSelectedData ? (
              <i
                className="fi fi-rr-add text-[14px] cursor-pointer"
              ></i>
            ) : (
              <i
                className="fi fi-rr-cross text-[10px] cursor-pointer"
              ></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
