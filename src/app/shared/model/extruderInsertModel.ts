export interface ExtruderInsertModel {
    locationId: number;
    colorId: number;
    widthId: number;
    userId: number;
    weight: number;
    length: number;
    comment: string;
    rollNumber: string;
}


export interface ExtruderDetail{
    id:number;
    locationId:number;
    name:string;
    colorId:number;
    colorname: string;
    widthId: number;
    widthname: string;
    length:number;
    createdById: number;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
    createdDate: string;
    modifiedDate: string;
    weight:number;
    rollnumber: string;
    comment: string;
    modifiedById: number;
}


export interface ExtruderSummary {
    extruderColorId: number;
    extruderColorName: string; 
    widthId: number;
    widthName: string;
    totalLength:number;
    totalWeight:number;
    details: ExtruderDetail[];   
}
     
