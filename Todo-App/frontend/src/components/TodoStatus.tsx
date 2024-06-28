import {
    FilterType,
    getActiveFilterButtonStyle,
    getAllFilterButtonStyle,
    getCompletedFilterButtonStyle,
} from "../data/constants";

type TodoStatusProps = {
    filterType: FilterType;
    onFilterChange: React.Dispatch<React.SetStateAction<FilterType>>;
    getItemsLeft: () => number;
    clearCompleted: () => void;
};

const TodoStatus = ({
    filterType,
    onFilterChange,
    getItemsLeft,
    clearCompleted,
}: TodoStatusProps) => {
    return (
        <div className="flex justify-between items-center text-[1.4rem] text-lightDarkGrayishBlue p-[2rem] bg-white dark:bg-darkVeryDarkDesaturatedBlue rounded-lg">
            <p className="sm:text-[1.2rem]">{getItemsLeft()} items left</p>
            <div className="flex gap-[1.9rem] sm:hidden">
                <button
                    onClick={() => onFilterChange(FilterType.All)}
                    className={`font-bold hover:text-lightVeryDarkGrayishBlue hover:dark:text-darkLightGrayishBlueHover ${getAllFilterButtonStyle(
                        filterType
                    )}`}
                >
                    All
                </button>
                <button
                    onClick={() => onFilterChange(FilterType.Active)}
                    className={`font-bold hover:text-lightVeryDarkGrayishBlue hover:dark:text-darkLightGrayishBlueHover ${getActiveFilterButtonStyle(
                        filterType
                    )}`}
                >
                    Active
                </button>
                <button
                    onClick={() => onFilterChange(FilterType.Completed)}
                    className={`font-bold hover:text-lightVeryDarkGrayishBlue hover:dark:text-darkLightGrayishBlueHover ${getCompletedFilterButtonStyle(
                        filterType
                    )}`}
                >
                    Completed
                </button>
            </div>
            <button
                onClick={() => clearCompleted()}
                className="hover:text-lightVeryDarkGrayishBlue hover:dark:text-darkLightGrayishBlueHover sm:text-[1.2rem]"
            >
                Clear Completed
            </button>
        </div>
    );
};

export default TodoStatus;
