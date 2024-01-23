export interface RollNumberFetchedModel{
    controlName: string;
    dataFetched: boolean;
}
export interface RollNumberFormValuesModel{
    colorId: number;
    colorName: string;
    widthId: number;
    widthValue: number;
    indexFetched:number;    
}
export const RollNumberFetchedList: RollNumberFetchedModel[] =[
    {
        controlName: 'colorZero0', dataFetched: false
    },
    {
        controlName: 'colorZero1', dataFetched: false
    },
    {
        controlName: 'colorZero2', dataFetched: false
    },
    {
        controlName: 'colorNinety0', dataFetched: false
    },
    {
        controlName: 'colorNinety1', dataFetched: false
    },
    {
        controlName: 'colorNinety2', dataFetched: false
    }
];