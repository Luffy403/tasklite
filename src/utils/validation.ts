import { MAX_TITLE_LENGTH } from "./constants.js";

export function isValidTaskTitle(title:string) : boolean{
    const trimedTitle = title.trim();

    if(trimedTitle.length === 0 || trimedTitle.length > MAX_TITLE_LENGTH){
        return false;
    }
    return true;
}

export function normalizeTitle(title:string) : string{
    let normalizeTitle = title.trim();
    normalizeTitle = normalizeTitle.replace(/\s+/g, ' ');
    return normalizeTitle;
}