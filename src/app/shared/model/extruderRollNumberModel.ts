export interface extruderRollNumberModelRoot {
    data: extruderRollNumberModel[];
    success: boolean;
    message: string;
  }
  
  export interface extruderRollNumberModel {
    id: number;
    colorId: number;
    colorname: string;
    widthname: string;
    length: number;
    weight: number;
    rollnumber?: string;
    createdById: number;
    fullname: string;
    createdDate: string;
  }

  export interface extruderRollNumberRequestModel{
    colorId: number;
    colorname: string;
    widthId: number;
    widthname: string;
    hasData:boolean;
  }