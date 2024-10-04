interface MapBoxScreenProps {
  screenData?: any;
  setSelectedScreensFromMap: any;
  isSelectedData: boolean;
}

export const MapboxScreen = ({
  screenData,
  setSelectedScreensFromMap,
  isSelectedData,
}: MapBoxScreenProps) => {
  const handleSelectScreen = () => {
    setSelectedScreensFromMap(screenData);
  };
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
          {!isSelectedData && (
            <i
              className="fi fi-rr-add text-[14px] cursor-pointer"
              onClick={handleSelectScreen}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
};
