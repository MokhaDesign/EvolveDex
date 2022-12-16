

export function nthIndex(str, pat, n){
    var L= str.length, i= -1;
    while(n-- && i++<L){
        i= str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}

// Lord and Savior: https://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string

export function  capitalized(string) {
    let arrStr
    arrStr = string.split(" ")
    for (let i = 0; i < arrStr.length; i++) {
        arrStr[i] = arrStr[i].charAt(0).toUpperCase() + arrStr[i].slice(1);
    }

    return arrStr.join(" ");
}