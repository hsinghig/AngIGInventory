

export interface ExtruderReportColorModel{
    colorId: number;
    colorName: string;
    detailList: ExtruderReportWidthDetailModel[];
}
export interface ExtruderReportWidthDetailModel {
    widthId: number;
    widthName: string;
    totalWeight: number;
    totalLength: number;
}
export interface ExtruderReportWidthModel{
    widthId: number;
    widthName: string;   
    detailList: ExtruderReportColorDetailModel[];
}
export interface ExtruderReportColorDetailModel {
    colorId: number;
    colorName: string;
    totalWeight: number;
    totalLength: number;
}

export interface ExtruderReportSummary{   
    colName: string;
    colorId: number;
    colorName: string;
    widthName: string;
    widthId: number;
    totalLength: number;
    totalWeight: number;
}



