export interface crossplyInsertModel {    
    crossplyLocationId: number;
    crossplyColorId: number;
    crossplyWidthId: number;    
    crossplyRollNumber: string;
    crossplyLength: number;
    crossplyWeight: number;
    crossplyCreatedById: number;
    crossplyComment: string;

    colorZeroColorId: number;
    colorZeroWidthId: number;
    colorZeroRollNumber: number;   

    colorNinetyColorId: number;
    colorNinetyWidthId: number;
    colorNinetyRollNumber: number;    
}

export interface ErrorMessageModel {
    errorMessage: string[];
    hasError: boolean;
}