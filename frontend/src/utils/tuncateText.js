


export function truncateText(text,length=120){

    if(text.length<=length)

        return text;

    return text.slice(0,length)+"...";

}

