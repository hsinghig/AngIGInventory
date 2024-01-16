export interface crossplyModelRoot {
    data: crossplyModel[];
    success: boolean;
    message: string;
}

export interface crossplyModel {
    crossplyId: number;
    crossplyLocation: string;
    crossplyColor: string;
    crossplyWidth: string;
    crossplyLength: number;
    crossplyWeight: number;
    crossplyComment: string;
    crossplyCreatedDate: string;
    crossplyRollNumber: string;
    crossplyFirstName: string;
    crossplyLastName: string;
    crossplyEmail: string;
    crossplyFullName: string;
}

export interface crossplyDetailModelRoot {
    data: crossplyDetailModel[];
    success: boolean;
    message: string;
}
export interface crossplyDetailModel {
    crossplyDetailId: number;
    crossplyId: number;
    colorZeroExtruderId: number;
    colorZeroRollNumber: string;
    colorZeroLocation: string;
    colorZeroColor: string;
    colorZeroWidth: string;
    colorZeroLength: number;
    colorZeroWeight: number;
    colorNinetyExtruderId: number;
    colorNinetyRollNumber: string;
    colorNinetyLocation: string;
    colorNinetyColor: string;
    colorNinetyWidth: string;
    colorNinetyLength: number;
    colorNinetyWeight: number;
    crossplyDetailFirstName: string;
    crossplyDetailLastName: string;
    crossplyDetailEmail: string;
}

export interface crossplyDetailInsertModel {
    crossplyId: number;
    colorZeroRollNumber: number;
    colorNinetyRollNumber: number;
    colorZeroColorId: number;
    colorZeroWidthId: number;
    colorNinetyColorId: number;
    colorNinetyWidthId: number;
    createdById: number;
    createdBy: string;
    comment: string;
}

export interface crossplyInsertModel {
    locationId: number;
    colorId: number;
    widthId: number;
    rollNumber: string;
    length: number;
    weight: number;
    userId: number;
    comment: string;
    crossplyDetailList: crossplyDetailInsertModel[];
}

export interface crossplySummaryModel {
    crossply: crossplyModel;
    crossplyDetailList: crossplyDetailModel[];
}

