export async function daysDiff(start, end) {

    console.log("::daysDiff:::")
    let d1 = new Date(start);
    let d2 = new Date(end);


    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log('diffDays', diffDays);
    return diffDays;
}