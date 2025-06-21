import { Brand, FileData, OfficeAddress } from "../../types/brandAgencyTypes";
import { FileUploadButton } from "../../components/FileUploadButton";
import { ImageViewCloseButton } from "../../components/molecules/ImageViewCloseButton";
import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { useDispatch } from "react-redux";
import { addClientAgencyDetails } from "../../actions/clientAgencyAction";

// Sub-components for better organization
export const EditBrandForm = ({
  brand,
  brandToEdit,
  files,
  onInputChange,
  onRemoveImage,
  onCancel,
  onSave,
}: {
  brand: Brand;
  brandToEdit: Brand | null;
  files: FileData[];
  onInputChange: (brandId: number, field: string, value: string | File) => void;
  onRemoveImage: (file: FileData) => void;
  onCancel: () => void;
  onSave: () => void;
}) => {
  const dispatch = useDispatch<any>();

  const [pocListEdit, setPocListEdit] = useState<any>(null);

  const [pocDetails, setPocDetails] = useState<any>(null);
  const [pocName, setPocName] = useState<any>("");
  const [pocDesignation, setPocDesignation] = useState<any>("");
  const [pocContact, setPocContact] = useState<any>("");
  const [pocEmail, setPocEmail] = useState<any>("");

  const onPocListClick = (e: any) => {
    setPocListEdit(e);
  }

  useEffect(() => {
    if (pocListEdit) {
      setPocDetails(pocListEdit.pocDetails);
    }

  },[pocListEdit]);

  console.log(pocListEdit);
  console.log(pocDetails);

  const savePocDetailsHandler = () => {
    // Only add new POC if all fields are filled
    if (pocName && pocDesignation && pocContact && pocEmail) {
      const newPoc = {
        pocName,
        pocDesignation,
        pocContact,
        pocEmail,
      };
      
      const updatedPocList = [...(pocDetails || []), newPoc];
      
      dispatch(
        addClientAgencyDetails({
          _id: brand._id,
          clientAgencyName: brand.clientAgencyName,
          logo: Array.isArray(brand.logo) ? brand.logo[0] : brand.logo,
          industry: brand.industry,
          officeAddress: {
            address: brand.officeAddress?.address,
            city: brand.officeAddress?.city,
            stateName: brand.officeAddress?.stateName,
            country: brand.officeAddress?.country,
            phone: brand.officeAddress?.phone,
            email: brand.officeAddress?.email,
            website: brand.officeAddress?.website,
            zipCode: brand.officeAddress?.zipCode,
            gst: brand.officeAddress?.gst,
            pan: brand.officeAddress?.pan,
          },
          pocDetails: updatedPocList
        })
      );
      
      // Update local state
      setPocDetails(updatedPocList);
      
      // Clear the new POC form
      setPocName('');
      setPocDesignation('');
      setPocContact('');
      setPocEmail('');
    } else {
      // If no new POC is being added, just save the existing POC edits
      dispatch(
        addClientAgencyDetails({
          _id: brand._id,
          clientAgencyName: brand.clientAgencyName,
          logo: Array.isArray(brand.logo) ? brand.logo[0] : brand.logo,
          industry: brand.industry,
          officeAddress: {
            address: brand.officeAddress?.address,
            city: brand.officeAddress?.city,
            stateName: brand.officeAddress?.stateName,
            country: brand.officeAddress?.country,
            phone: brand.officeAddress?.phone,
            email: brand.officeAddress?.email,
            website: brand.officeAddress?.website,
            zipCode: brand.officeAddress?.zipCode,
            gst: brand.officeAddress?.gst,
            pan: brand.officeAddress?.pan,
          },
          pocDetails: pocDetails || []
        })
      );
    }
  }

  return (
    <div className="mt-4 space-y-4">
      {pocListEdit ? (
        <div>
          <div className="py-2 border-b">
            <h1 className="text-[12px] font-semibold mb-4">Edit POC Details</h1>
            
            {/* Existing POCs */}
            {pocDetails?.map((poc: any, index: number) => (
              <div key={index} className="mb-6 p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">POC {index + 1}</h3>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <span className="text-xs text-gray-600">Primary</span>
                    <input
                      type="radio"
                      name="primaryPoc"
                      checked={poc.isPrimary || false}
                      onChange={() => {
                        const updatedPocs = pocDetails.map((p: any, i: number) => ({
                          ...p,
                          isPrimary: i === index
                        }));
                        setPocDetails(updatedPocs);
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-12 gap-4 mb-4">
                  <div className="col-span-6">
                    <div className="block flex justify-between gap-2 items-center mb-1">
                      <label className="block text-secondaryText text-[12px]">Name</label>
                    </div>
                    <PrimaryInput
                      inputType="text"
                      placeholder="Enter POC name"
                      value={poc.pocName || ''}
                      action={(value) => {
                        const updatedPocs = [...pocDetails];
                        updatedPocs[index].pocName = value;
                        setPocDetails(updatedPocs);
                      }}
                    />
                  </div>
                  <div className="col-span-6">
                    <div className="block flex justify-between gap-2 items-center mb-1">
                      <label className="block text-secondaryText text-[12px]">Designation</label>
                    </div>
                    <PrimaryInput
                      inputType="text"
                      placeholder="Enter POC Designation"
                      value={poc.pocDesignation || ''}
                      action={(value) => {
                        const updatedPocs = [...pocDetails];
                        updatedPocs[index].pocDesignation = value;
                        setPocDetails(updatedPocs);
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <div className="block flex justify-between gap-2 items-center mb-1">
                      <label className="block text-secondaryText text-[12px]">Phone</label>
                    </div>
                    <PrimaryInput
                      inputType="text"
                      placeholder="Enter Phone Number"
                      value={poc.pocContact || ''}
                      action={(value) => {
                        const updatedPocs = [...pocDetails];
                        updatedPocs[index].pocContact = value;
                        setPocDetails(updatedPocs);
                      }}
                    />
                  </div>
                  <div className="col-span-6">
                    <div className="block flex justify-between gap-2 items-center mb-1">
                      <label className="block text-secondaryText text-[12px]">Email</label>
                    </div>
                    <PrimaryInput
                      inputType="text"
                      placeholder="Enter email address"
                      value={poc.pocEmail || ''}
                      action={(value) => {
                        const updatedPocs = [...pocDetails];
                        updatedPocs[index].pocEmail = value;
                        setPocDetails(updatedPocs);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add New POC Form */}
            <div className="mt-6 p-4 border border-dashed rounded-lg">
              <h3 className="text-sm font-medium mb-3">Add New POC</h3>
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-6">
                  <div className="block flex justify-between gap-2 items-center mb-1">
                    <label className="block text-secondaryText text-[12px]">Name</label>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter POC name"
                    value={pocName}
                    action={setPocName}
                  />
                </div>
                <div className="col-span-6">
                  <div className="block flex justify-between gap-2 items-center mb-1">
                    <label className="block text-secondaryText text-[12px]">Designation</label>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter POC Designation"
                    value={pocDesignation}
                    action={setPocDesignation}
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <div className="block flex justify-between gap-2 items-center mb-1">
                    <label className="block text-secondaryText text-[12px]">Phone</label>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter Phone Number"
                    value={pocContact}
                    action={setPocContact}
                  />
                </div>
                <div className="col-span-6">
                  <div className="block flex justify-between gap-2 items-center mb-1">
                    <label className="block text-secondaryText text-[12px]">Email</label>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter email address"
                    value={pocEmail}
                    action={setPocEmail}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setPocListEdit(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={savePocDetailsHandler}
              className="px-4 py-2 border border rounded-md shadow-sm text-sm font-medium text-white bg-[#129BFF] hover:bg-[#129BFF]/90"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Logo upload section */}
          <div className="flex justify-between pt-2">
            <div className="flex gap-4">
              {files.map((file, index) => (
                <ImageViewCloseButton
                  file={file}
                  key={index}
                  removeImage={onRemoveImage}
                />
              ))}
              {brandToEdit?.logo && (
                <div className="w-20 h-20 object-cover rounded-lg shadow-md flex items-center justify-center bg-gray-100">
                  <img
                    src={brandToEdit.logo as string}
                    alt={brandToEdit.clientAgencyName}
                    className="max-w-full max-h-full"
                  />
                </div>
              )}
            </div>
            <FileUploadButton
              handleFile={(e) => onInputChange(brand._id, "logo", e)}
              width=""
              fileType="image"
            />
          </div>

          {/* Form fields */}
          {[
            { label: "Client/Agency", field: "clientAgencyName", type: "text" },
            { label: "Industry", field: "industry", type: "text" },
            { label: "PAN", field: "pan", type: "text" },
            { label: "GST", field: "gst", type: "text" },
            { label: "Headquarters", field: "address", type: "text" },
            { label: "Website", field: "website", type: "url" },
          ].map(({ label, field, type }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                placeholder={label}
                type={type}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={
                  (brandToEdit?.officeAddress?.[
                    field as keyof OfficeAddress
                  ] as string) ||
                  (brandToEdit?.[field as keyof Brand] as string) ||
                  ""
                }
                onChange={(e) =>
                  onInputChange(
                    brand._id,
                    field,
                    field === "clientAgencyName"
                      ? e.target.value.toUpperCase()
                      : e.target.value
                  )
                }
              />
            </div>
          ))}

          {/* Action buttons */}
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => onPocListClick(brand)}
              className="px-4 py-2 border border rounded-md shadow-sm text-sm font-medium text-white bg-[#129BFF] hover:bg-[#129BFF]/90"
            >
              POC List
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              className="px-4 py-2 border border rounded-md shadow-sm text-sm font-medium text-white bg-[#129BFF] hover:bg-[#129BFF]/90"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
};


export const BrandDetails = ({
  brand,
  onEdit,
}: {
  brand: Brand;
  onEdit: () => void;
}) => (
  <div className="mt-4 space-y-3">
    <div className="flex justify-between items-center">
      <p className="text-gray-700">
        PAN: {brand.officeAddress?.pan || "Not specified"}
      </p>
      <p className="text-gray-700">
        GST: {brand.officeAddress?.gst || "Not specified"}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <span className="text-sm font-medium text-gray-500">Industry:</span>{" "}
        {brand.industry ? (
          <span className="text-sm text-[#129BFF]">{brand.industry}</span>
        ) : (
          <span className="text-sm text-gray-700">Not specified</span>
        )}
      </div>
      <div>
        <span className="text-sm font-medium text-gray-500">Website:</span>{" "}
        {brand.officeAddress?.website ? (
          <a
            href={brand.officeAddress.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#129BFF] hover:underline"
          >
            {brand.officeAddress.website}
          </a>
        ) : (
          <span className="text-sm text-gray-700">Not specified</span>
        )}
      </div>
      <div>
        <span className="text-sm font-medium text-gray-500">Headquarters:</span>{" "}
        <span className="text-sm text-gray-700">
          {brand.officeAddress?.address || "Not specified"}
        </span>
      </div>
    </div>

    <div>
      <div className="border-b">
        <h1 className="text-[14px] font-semibold">List of POC</h1>
      </div>
      <div className="grid grid-cols-3 gap-2 p-2">
        {brand?.pocDetails?.map((poc: any, i: any) => (
          <div key={i} className={`${brand.primaryPoc === poc.pocName ? "border border-[#129BFF] rounded-[12px]" : ""} p-2 col-span-1 flex flex-col gap-1`}>
            <p className="text-[12px] text-gray-700">Name: <span className="text-[#129BFF] font-semibold">{poc.pocName}</span></p>
            <p className="text-[12px] text-gray-700">Designation: <span className="text-[#129BFF] font-semibold">{poc.pocDesignation}</span></p>
            <p className="text-[12px] text-gray-700">Contact: <span className="text-[#129BFF] font-semibold">{poc.pocContact}</span></p>
            <p className="text-[12px] text-gray-700">Email: <span className="text-[#129BFF] font-semibold">{poc.pocEmail}</span></p>
          </div>
        ))}
      </div>
      
    </div>
    <div className="flex justify-end pt-2">
      <button
        type="button"
        onClick={onEdit}
        className="px-4 py-2 border border rounded-md shadow-sm text-sm font-medium text-white bg-[#129BFF] hover:bg-[#129BFF]/90"
      >
        Edit
      </button>
     
    </div>
  </div>
);
