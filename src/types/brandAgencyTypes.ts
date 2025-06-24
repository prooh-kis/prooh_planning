
export interface OfficeAddress {
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
}

export interface Brand {
    _id: number;
    clientAgencyName: string;
    logo: string | string[];
    officeAddress: OfficeAddress;
    isEditing?: boolean;
    industry?: string;
    pocDetails?: any;
    primaryPoc?: any;
}

export interface FileData {
    file: File;
    url: string;
    fileType: string;
    fileSize: number;
    awsURL: string;
}
