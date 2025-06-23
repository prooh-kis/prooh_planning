import {
  addClientAgencyDetails,
  getAllClientAgencyNames,
} from "../../actions/clientAgencyAction";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message, notification } from "antd";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";
import { ADD_CLIENT_AGENCY_DETAILS_RESET } from "../../constants/clientAgencyConstants";
import { Brand, FileData } from "../../types/brandAgencyTypes";
import { BrandDetails, EditBrandForm } from "./SubComponents";

export const BrandAgencyPage = () => {
  const dispatch = useDispatch<any>();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [expandedBrandId, setExpandedBrandId] = useState<number | null>(null);
  const [brandToEdit, setBrandToEdit] = useState<Brand | null>(null);
  const [files, setFiles] = useState<FileData[]>([]);

  const [primaryPoc, setPrimaryPoc] = useState<any>(null);
  const {
    loading: loadingAdd,
    error: errorAdd,
    success,
  } = useSelector((state: any) => state.clientAgencyDetailsAdd);

  const {
    loading,
    error,
    data: allBrands,
  } = useSelector((state: any) => state.allClientAgencyNamesListGet);

  // Load brands data
  useEffect(() => {
    dispatch(getAllClientAgencyNames());
  }, [dispatch]);

  // Update local brands state when data loads
  useEffect(() => {
    if (allBrands?.length > 0) {
      setBrands(
        allBrands.map((brand: any) => ({ ...brand, isEditing: false }))
      );
    }
  }, [allBrands]);

  // Handle success/error notifications
  useEffect(() => {
    if (success) {
      notification.success({
        message: "Success",
        description: "Brand data updated successfully",
      });
      dispatch({ type: ADD_CLIENT_AGENCY_DETAILS_RESET });
      // Refresh data after successful update
      dispatch(getAllClientAgencyNames());
    }
    if (errorAdd) {
      notification.error({
        message: "Error",
        description: errorAdd.message || "Failed to update brand data",
      });
      dispatch({ type: ADD_CLIENT_AGENCY_DETAILS_RESET });
    }
  }, [success, errorAdd, dispatch]);

  const toggleExpand = useCallback((brandId: number) => {
    setExpandedBrandId((prevId) => (prevId === brandId ? null : brandId));
  }, []);

  const toggleEdit = useCallback((brandId: number) => {
    setBrands((prevBrands) =>
      prevBrands.map((brand) =>
        brand._id === brandId
          ? { ...brand, isEditing: !brand.isEditing }
          : brand
      )
    );

    setBrands((prevBrands) => {
      const foundBrand = prevBrands.find((brand) => brand._id === brandId);
      if (foundBrand) {
        setBrandToEdit(foundBrand);
        setFiles([]);
      }
      return prevBrands;
    });
  }, []);

  const getAWSUrl = useCallback(
    async (data: FileData): Promise<string | undefined> => {
      try {
        const aws = await getAWSUrlToUploadFile(
          data.fileType,
          data.file.name.split(".")[0]
        );
        await saveFileOnAWS(aws?.url, data.file);
        return aws?.awsURL;
      } catch (error: any) {
        message.error(error.message || "Failed to upload file");
        return undefined;
      }
    },
    []
  );

  const handleInputChange = useCallback(
    async (brandId: number, field: string, value: string | File) => {
      if (field === "logo" && value instanceof File) {
        const fileURL = URL.createObjectURL(value);
        const newFile: FileData = {
          file: value,
          url: fileURL,
          fileType: value.type,
          fileSize: value.size,
          awsURL: "",
        };

        setFiles((prevFiles) => [...prevFiles, newFile]);

        try {
          const awsUrl = await getAWSUrl(newFile);
          if (awsUrl) {
            setBrandToEdit((prev) => {
              if (!prev) return null;
              return {
                ...prev,
                logo: [awsUrl],
              };
            });
          }
        } catch (error) {
          console.error("Error uploading logo:", error);
        }
      } else {
        setBrandToEdit((prev) => {
          if (!prev) return null;

          const officeAddressFields = [
            "pan",
            "gst",
            "address",
            "website",
            "city",
            "stateName",
            "country",
            "phone",
            "email",
            "zipCode",
          ];

          if (officeAddressFields.includes(field)) {
            return {
              ...prev,
              officeAddress: {
                ...prev.officeAddress,
                [field]: value as string,
              },
            };
          }
          return {
            ...prev,
            [field]: value,
          };
        });
      }
    },
    [getAWSUrl]
  );

  const removeImage = useCallback((file: FileData) => {
    setFiles((prevFiles) =>
      prevFiles.filter((singleFile) => singleFile.url !== file.url)
    );
  }, []);

  const handleSave = useCallback(async () => {
    if (!brandToEdit) return;

    dispatch(
      addClientAgencyDetails({
        _id: brandToEdit._id,
        clientAgencyName: brandToEdit.clientAgencyName,
        logo: Array.isArray(brandToEdit.logo)
          ? brandToEdit.logo[0]
          : brandToEdit.logo,
        industry: brandToEdit.industry,
        officeAddress: {
          address: brandToEdit.officeAddress?.address,
          city: brandToEdit.officeAddress?.city,
          stateName: brandToEdit.officeAddress?.stateName,
          country: brandToEdit.officeAddress?.country,
          phone: brandToEdit.officeAddress?.phone,
          email: brandToEdit.officeAddress?.email,
          website: brandToEdit.officeAddress?.website,
          zipCode: brandToEdit.officeAddress?.zipCode,
          gst: brandToEdit.officeAddress?.gst,
          pan: brandToEdit.officeAddress?.pan,
        },
      })
    );
  }, [brandToEdit, dispatch]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#129BFF]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error loading brands: {error.message || "Unknown error"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Brand Directory</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="border-b border-gray-200 last:border-b-0"
          >
            {/* Brand header */}
            <div
              className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => toggleExpand(brand._id)}
            >
              <div className="w-12 h-12 mr-4 flex items-center justify-center bg-gray-100 rounded">
                {brand.logo ? (
                  <img
                    src={Array.isArray(brand.logo) ? brand.logo[0] : brand.logo}
                    alt={`${brand.clientAgencyName} logo`}
                    className="max-w-full max-h-full object-contain"
                    // onError={(e) => {
                    //   (e.target as HTMLImageElement).src =
                    //     "https://via.placeholder.com/48";
                    // }}
                    loading="lazy"
                  />
                ) : (
                  <span className="text-gray-400">Logo</span>
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {brand.clientAgencyName}
                </h2>
                <p className="text-sm text-gray-500 truncate">
                  {brand.officeAddress?.address || "No address provided"}
                </p>
              </div>

              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  expandedBrandId === brand._id ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Expanded content */}
            {expandedBrandId === brand._id && (
              <div className="px-4 pb-4">
                {brand.isEditing ? (
                  <EditBrandForm
                    brand={brand}
                    brandToEdit={brandToEdit}
                    files={files}
                    onInputChange={handleInputChange}
                    onRemoveImage={removeImage}
                    onCancel={() => toggleEdit(brand._id)}
                    onSave={handleSave}
                  />
                ) : (
                  <BrandDetails
                    brand={brand}
                    onEdit={() => toggleEdit(brand._id)}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
