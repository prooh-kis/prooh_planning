import { useCallback, useEffect } from "react";

interface MapBoxScreenProps {
  screenData?: any;
  handleSelectFromMap: any;
  isSelectedData: boolean;
  handleAddManualSelection?: any;
  setScreenData?: any;
}

export const MapboxScreen = ({
  screenData,
  handleSelectFromMap,
  isSelectedData,
  setScreenData,
}: MapBoxScreenProps) => {
  const handleClickScreen = useCallback((checked: any, screen: any) => {
    handleSelectFromMap(checked, screen);
    // handleAddManualSelection(!isSelectedData, screenData);
    setScreenData(null);
  },[handleSelectFromMap, setScreenData]);

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
          <div>
            {/* {!isSelectedData ? (
              <i
                className="fi fi-rr-add text-[14px] cursor-pointer"
                onClick={() => handleClickScreen(true, screenData)}
              ></i>
            ) : (
              <i
                className="fi fi-rr-cross text-[10px] cursor-pointer"
                onClick={() => handleClickScreen(false, screenData)}
              ></i>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
