export function SelectTeamName({
    optionsList,
    defaultOption,
    handleSelectChange,
    teamClassName,
}) {
    return (
        <select
            onChange={handleSelectChange}
            className={
                teamClassName +
                " m-2 p-2.5 text-sm rounded-lg focus:bg-gray-600 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:bg-gray-600"
            }
        >
            <option selected>{defaultOption}</option>
            {optionsList}
        </select>
    );
}
