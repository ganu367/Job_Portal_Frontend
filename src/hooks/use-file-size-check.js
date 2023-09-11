export default function useFileSizeCheck(fileSize) {

    const isFileSizeValid = (fileSize) => {
        // console.log(fileSize);
        if (fileSize > 1000000) {
            return false;
        }
        return true;
    }

    return isFileSizeValid;
}