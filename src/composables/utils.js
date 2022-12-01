

export function nthIndex(str, pat, n){
    var L= str.length, i= -1;
    while(n-- && i++<L){
        i= str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}

// Lord and Savior: https://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string

export function  capitalized(name) {return name[0].toUpperCase() + name.slice(1);}

export function capitalising (data) {
    let capitalized = []
    data.split(' ').forEach(word => {
        return capitalized.push(
            word.charAt(0).toUpperCase() +
            word.slice(1).toLowerCase()
        );
    })
    return capitalized.join(' ')
}