export default interface PaginationModel{
    page:number,
    pageSize:number,
    filterCriterias?:FilterCriteria[]
}

export interface FilterCriteria{
    field:string,
    value:string
}