export interface ExtruderDataModel {
    data: ExtruderDataModel[];
    success: boolean;
    message: string;
  }
  
  export interface ExtruderModel {
    createdDateDisplayDateEST: string;
    createdDateDisplayDateUTC: string;
    modifiedDateEST: string;
    extruderDetail: ExtruderDetail;
  }
  
  export interface ExtruderDetail {
    id: number;
    locationId: number;
    name: string;
    colorId: number;
    colorname: string;
    widthId: number;
    widthname: string;
    length: number;
    createdById: number;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
    createdDate: string;
    modifiedDate: string;
    weight: number;
    rollnumber?: string| null |undefined;
    comment?: string |null | undefined;
    modifiedById: number;
  }
  
  export interface ExtruderDownloadModel {
    extruderId:number;
    locationName: string;
    colorName: string;
    widthName: string;
    length: number;
    weight: number;
    rollNumber: string;
    createdDate: string;
    createdBy:string;
  }