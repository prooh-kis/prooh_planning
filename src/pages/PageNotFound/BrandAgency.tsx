import { ImageViewCloseButton } from '../../components/molecules/ImageViewCloseButton';
import { addClientAgencyDetails, getAllClientAgencyNames } from '../../actions/clientAgencyAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileUploadButton } from '../../components/FileUploadButton';
import { message } from 'antd';
import { getAWSUrlToUploadFile, saveFileOnAWS } from '../../utils/awsUtils';

interface Brand {
  _id: number;
  clientAgencyName: string;
  logo: string | string[];
  officeAddress: {
    pan?: string;
    gst?: string;
    address?: string;
    website?: string;
    city?: string;
    stateName?: string;
    country?: string;
    phone?: string;
    email?: string;
    zipCode?: string;
  };
  isEditing?: boolean;
  industry?: any;
}

interface FileData {
  file: File;
  url: string;
  fileType: string;
  fileSize: number;
  awsURL: string;
}

export const BrandAgencyPage = () => {
  const dispatch = useDispatch<any>();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [expandedBrandId, setExpandedBrandId] = useState<number | null>(null);
  const [brandToEdit, setBrandToEdit] = useState<Brand | null>(null);
  const [files, setFiles] = useState<FileData[]>([]);

  const {
    loading, 
    error, 
    data: allBrands
  } = useSelector((state: any) => state.allClientAgencyNamesListGet);

  useEffect(() => {
    if (allBrands && allBrands.length > 0) {
      setBrands(allBrands.map((brand: any) => ({ ...brand, isEditing: false })));
    }
  }, [allBrands]);
  
  useEffect(() => {
    dispatch(getAllClientAgencyNames());
  }, [dispatch]);

  const toggleExpand = (brandId: number) => {
    setExpandedBrandId(prevId => prevId === brandId ? null : brandId);
  };

  const toggleEdit = (brandId: number) => {
    setBrands(prevBrands => 
      prevBrands.map(brand => 
        brand._id === brandId 
          ? { ...brand, isEditing: !brand.isEditing } 
          : brand
      )
    );

    const foundBrand = brands.find(brand => brand._id === brandId);
    if (foundBrand) {
      setBrandToEdit(foundBrand);
      setFiles([]); // Reset files when starting to edit
    }
  };

  const getAWSUrl = async (data: FileData): Promise<string | undefined> => {
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
  };

  const handleInputChange = async (brandId: number, field: string, value: string | File) => {
    if (field === "logo" && value instanceof File) {
      const fileURL = URL.createObjectURL(value);
      const newFile: FileData = {
        file: value,
        url: fileURL,
        fileType: value.type,
        fileSize: value.size,
        awsURL: "",
      };

      setFiles(prevFiles => [...prevFiles, newFile]);

      try {
        const awsUrl = await getAWSUrl(newFile);
        if (awsUrl) {
          setBrandToEdit(prev => {
            if (!prev) return null;
            return {
              ...prev,
              logo: [awsUrl]
            };
          });
        }
      } catch (error) {
        console.error("Error uploading logo:", error);
      }
    } else {
      setBrandToEdit(prev => {
        if (!prev) return null;
        
        if (field === "pan" || field === "gst" || field === "address" || field === "website") {
          return {
            ...prev,
            officeAddress: {
              ...prev.officeAddress,
              [field]: value as string
            }
          };
        }
        return {
          ...prev,
          [field]: value
        };
      });
    }
  };

  const removeImage = (file: FileData) => {
    setFiles(prevFiles => prevFiles.filter(singleFile => singleFile.url !== file.url));
  };

  const handleSave = async () => {
    if (!brandToEdit) return;

    dispatch(addClientAgencyDetails({
      clientAgencyName: brandToEdit.clientAgencyName,
      logo: brandToEdit.logo[0],
      industry: brandToEdit.industry,
      officeAddress: {
        address: brandToEdit.officeAddress.address,
        city: brandToEdit.officeAddress.city,
        state: brandToEdit.officeAddress.stateName,
        country: brandToEdit.officeAddress.country,
        phone: brandToEdit.officeAddress.phone,
        email: brandToEdit.officeAddress.email,
        website: brandToEdit.officeAddress.website,
        zipCode: brandToEdit.officeAddress.zipCode,
        gst: brandToEdit.officeAddress.gst,
        pan: brandToEdit.officeAddress.pan,
      },
    }));

    // Exit edit mode
    setBrands(prevBrands => 
      prevBrands.map(brand => 
        brand._id === brandToEdit._id 
          ? { ...brandToEdit, isEditing: false } 
          : brand
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Brand Directory</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#129BFF]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Error loading brands: {error.message || 'Unknown error'}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {brands?.map((brand) => (
            <div key={brand?._id} className="border-b border-gray-200 last:border-b-0">
              <div 
                className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => toggleExpand(brand?._id)}
              >
                <img 
                  src={Array.isArray(brand?.logo) ? brand?.logo[0] : brand?.logo} 
                  alt={`${brand.clientAgencyName} logo`} 
                  className="w-12 h-12 object-contain mr-4"
                  // onError={(e) => {
                  //   (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48';
                  // }}
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">{brand?.clientAgencyName}</h2>
                  <p className="text-sm text-gray-500">{brand?.officeAddress?.address}</p>
                </div>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${expandedBrandId === brand?._id ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {expandedBrandId === brand?._id && (
                <div className="px-4 pb-4">
                  {brand.isEditing ? (
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-between pt-2">
                        <div className="flex gap-4">
                          {files.map((file, index) => (
                            <ImageViewCloseButton
                              file={file}
                              key={index}
                              removeImage={removeImage}
                            />
                          ))}
                          {brandToEdit?.logo && brandToEdit?.logo !== "" ? (
                            <div className="flex items-center gap-4">
                              <div className="relative inline-block">
                                <div className="w-20 h-20 object-cover rounded-lg shadow-md flex items-center justify-center">
                                  <img src={brandToEdit?.logo as string} alt={brandToEdit?.clientAgencyName} />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-4">
                              {[1].map((_, i) => (
                                <div key={i} className="relative inline-block">
                                  <div className="w-20 h-20 object-cover rounded-lg shadow-md flex items-center justify-center">
                                    <i className="fi fi-rr-picture flex items-center text-[36px] text-[#D7D7D7]"></i>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                        </div>
                        <div className="flex items-center">
                          <FileUploadButton
                            handleFile={(e) => handleInputChange(brand._id, 'logo', e)}
                            width=""
                            fileType={"image"}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                        <input
                          title="in"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={brandToEdit?.industry || ''}
                          onChange={(e) => handleInputChange(brand._id, 'industry', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PAN</label>
                        <input
                          title="pa"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={brandToEdit?.officeAddress?.pan || ''}
                          onChange={(e) => handleInputChange(brand._id, 'pan', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GST</label>
                        <input
                          title="gs"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={brandToEdit?.officeAddress?.gst || ''}
                          onChange={(e) => handleInputChange(brand._id, 'gst', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Headquarters</label>
                        <input
                          title="ad"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={brandToEdit?.officeAddress?.address || ''}
                          onChange={(e) => handleInputChange(brand._id, 'address', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <input
                          title="we"
                          type="url"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={brandToEdit?.officeAddress?.website || ''}
                          onChange={(e) => handleInputChange(brand._id, 'website', e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          onClick={() => toggleEdit(brand._id)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#129BFF]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 border border rounded-md shadow-sm text-sm font-medium text-white bg-[#129BFF] hover:bg-[#129BFF50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#129BFF70]"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-700">PAN: {brand.officeAddress?.pan || 'Not specified'}</p>
                        <p className="text-gray-700">GST: {brand.officeAddress?.gst || 'Not specified'}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Industry:</span>{' '}
                          {brand.industry ? (
                            <h1 className="text-sm text-[#129BFF] hover:underline">
                              {brand.industry}
                            </h1>
                          ) : (
                            <span className="text-sm text-gray-700">Not specified</span>
                          )}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Website:</span>{' '}
                          {brand.officeAddress?.website ? (
                            <a href={brand.officeAddress.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#129BFF] hover:underline">
                              {brand.officeAddress.website}
                            </a>
                          ) : (
                            <span className="text-sm text-gray-700">Not specified</span>
                          )}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Headquarters:</span>{' '}
                          <span className="text-sm text-gray-700">{brand.officeAddress?.address || 'Not specified'}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => toggleEdit(brand._id)}
                          className="px-4 py-2 border border rounded-md shadow-sm text-sm font-medium text-white bg-[#129BFF] hover:bg-[#129BFF50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#129BFF70]"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};