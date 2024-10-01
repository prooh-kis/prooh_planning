import { MultiColorLinearBar } from "../../components/molecules/MultiColorLinearBar";
import { CheckboxInput } from "../atoms/CheckboxInput"
import { RadioInput } from "../atoms/RadioInput"
import { ExcelImport } from "../molecules/ExcelImport"


interface StoreProximityProps {
  selectedStoreOption?: any;
  setSelectedStoreOption?: any;
  handleStoreSelection?: any;
  handleGetExcelData?: any;
  data?: any;
  dataBrand?: any;
  setDataBrand?: any;
  dataComp?: any;
  setDataComp?: any;
}

export const StoreProximity = ({
  selectedStoreOption,
  setSelectedStoreOption,
  dataBrand,
  setDataBrand,
  dataComp,
  setDataComp
}: StoreProximityProps) => {
  const handleStoreSelection = (e: any) => {
    console.log(e.target.value);
    console.log(selectedStoreOption)
    setSelectedStoreOption(e.target.value);
  }

  return (
    <div className="">
      <div className="flex justify-between py-1">
        <h1 className="text-[20px] text-primaryText">1. Store Proximity</h1>
        <div className="flex gap-2 items-center">
          <i className="fi fi-sr-file-excel flex items-center text-green-600"></i>
          <p className="text-[14px]">Download Sample</p>
        </div>
      </div>
      <div className="flex justify-start gap-4 py-1">
        <RadioInput
          title="Brand Store"
          value={"brandStore"}
          isChecked={selectedStoreOption === "brandStore" ? true : false}
          onChange={handleStoreSelection}
        />
        <RadioInput
          title="Competitor Store"
          value={"compStore"}
          isChecked={selectedStoreOption === "compStore" ? true : false}
          onChange={handleStoreSelection}
        />
      </div>
      <div>
        <ExcelImport setDataBrand={setDataBrand} dataBrand={dataBrand} />
      </div>
      <div className="border-b py-2">
        <div className="flex justify-between items-center pb-2">
          <h1 className="text-[16px]">Stores</h1>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 w-full">
              <div className="h-2 w-2 bg-brand"></div>
              <p className="text-[12px] font-normal">
                Brand
              </p>
            </div>
            <div className="flex items-center gap-1 w-full">
              <div className="h-2 w-2 bg-competitor"></div>
              <p className="text-[12px] font-normal">
                Competitor
              </p>
            </div>
            <div className="flex items-center gap-1 w-full">
              <div className="h-2 w-2 bg-brand_competitor"></div>
              <p className="text-[12px] font-normal">
                Both
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 flex items-center gap-2 pb-2">
          <div className="col-span-2">
            <CheckboxInput textSize="12px" label={'20 Sites'}/>
          </div>
          <div className="col-span-8">
            {/* <MultiColorLinearBar colors={[ "#EBEBEB", "#52A2FF", "#20AA70", "#FF5252"]} values={[data.brand, data.competitor, data.both]} totalValue={data.total} /> */}
          </div>
          <div className="col-span-2 flex justify-end">
            <p className="text-[12px]">27 Location</p>
          </div>
        </div>
      </div>
    </div>
  )
}