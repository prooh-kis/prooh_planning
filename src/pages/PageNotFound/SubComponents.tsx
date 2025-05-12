import { Brand, FileData, OfficeAddress } from "../../types/brandAgencyTypes";
import { FileUploadButton } from "../../components/FileUploadButton";
import { ImageViewCloseButton } from "../../components/molecules/ImageViewCloseButton";

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
}) => (
  <div className="mt-4 space-y-4">
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
        onClick={onCancel}
        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        className="px-4 py-2 border border rounded-md shadow-sm text-sm font-medium text-white bg-[#129BFF] hover:bg-[#129BFF]/90"
      >
        Save
      </button>
    </div>
  </div>
);

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

    <div className="flex justify-end pt-2">
      <button
        onClick={onEdit}
        className="px-4 py-2 border border rounded-md shadow-sm text-sm font-medium text-white bg-[#129BFF] hover:bg-[#129BFF]/90"
      >
        Edit
      </button>
    </div>
  </div>
);
