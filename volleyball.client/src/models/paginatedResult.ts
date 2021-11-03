export default interface PaginatedResult<T>{
    hasMore:boolean,
    items:T[]
}