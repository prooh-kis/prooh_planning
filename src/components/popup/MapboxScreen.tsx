interface MapboxScreenProps {
  screenData?: any;
}

export const MapboxScreen = ({screenData}: MapboxScreenProps) => {
  return (
    <div className="rounded-10">
      <div className="">
        <img src={screenData?.images[0]} alt="screen Image" />
        <div className="pt-2 flex justify-between">
          <div className="">
            <h1 className="font-semibold text-#000000">{screenData?.screenName}</h1>
            <p>{screenData?.location?.address}</p>
          </div>
          <i className="fi fi-rr-add text-[14px]"
            onClick={() => {}} 
          ></i>
        </div>
      </div>
    </div>
  )
}