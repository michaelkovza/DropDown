import {Content} from "../src/App";

const filterBySearchValue = (items: Content[], searchValue: string): Content[] => {
    return items.filter(item => {
        const transformedTitle = item.title.toLowerCase();
        const transformedSearchValue = searchValue.trim().toLowerCase();
        return transformedTitle.startsWith(transformedSearchValue);
    })
};

export default filterBySearchValue;
