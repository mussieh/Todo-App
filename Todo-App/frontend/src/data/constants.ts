export enum FilterType {
    All,
    Active,
    Completed,
}

export const getAllFilterButtonStyle = (filterType: FilterType) => {
    return filterType === FilterType.All ? "text-brightBlue" : "";
};
export const getActiveFilterButtonStyle = (filterType: FilterType) => {
    return filterType === FilterType.Active ? "text-brightBlue" : "";
};
export const getCompletedFilterButtonStyle = (filterType: FilterType) => {
    return filterType === FilterType.Completed ? "text-brightBlue" : "";
};
