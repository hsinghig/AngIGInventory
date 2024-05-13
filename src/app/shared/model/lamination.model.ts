export interface laminationModelRoot {
    data: laminationModel[];
    success: boolean;
    message: string;
}

export interface laminationModel {
    laminationId: number;
    laminationLocationName: string;
    laminationColorName: string;
    referenceNumber: string;
    laminationLength: number;
    laminationWeight: number;
    laminationComment: string;
    laminationCreatedDate: string;
    laminationFirstName: string;
    laminationLastName: string;
    laminationEmail: string;
}

export interface laminationDetailModelRoot {
    data: laminationDetailModel[];
    success: boolean;
    message: string;
}

export interface laminationDetailModel {
    laminationDetailId: number;
    isExtruder: boolean;
    isCrossply: boolean;
    isMiscellaneous: boolean;
    rollNumberId: number;
    laminationDetailLength: number;
    laminationDetailWeight: number;
    laminationDetailColor: string;
    laminationDetailWidth: string;
    createdDate: string;
    laminationDetailFirstName: string;
    laminationDetailLastName: string;
    laminationDetailEmail: string;
    laminationId: number;
    laminationLocationName: string;
    laminationColorName: string;
    referenceNumber: string;
    laminationLength: number;
    laminationWeight: number;
    laminationComment: string;
    laminationCreatedDate: string;
    displayId: number;
    location: string;
    color: string;
    width: string;
    rollNumber: string;
    length: number;
    weight: number;
}

export interface laminationDetailInsertModel {
    id: number;
    laminationId: number;
    isExtruder: boolean;
    isCrossply: boolean;
    rollNumberId: number;
    length: number;
    weight: number;
    colorId: number;
    widthId: number;    
    createdById: number;
}

export interface laminationInsertModel {
    locationId: number;
    colorId: number;
    referenceNumber: string;
    length: number;
    weight: number;
    comment: string;    
    createdById: number;
    laminationDetailList: laminationDetailInsertModel[];
}

export interface laminationSummaryModel {
    lamination: laminationModel;
    laminationDetailList: laminationDetailModel[];
}
