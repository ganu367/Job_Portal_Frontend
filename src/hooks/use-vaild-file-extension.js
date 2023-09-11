export default function useValidFileExtension(filename, allowedExtensions) {

    const isValidFileExtension = (filename, allowedExtensions) => {
        const fileType = filename.split('.').pop();
        if (allowedExtensions.includes(fileType)){
            return true;
        }
        return false;
    }

    return isValidFileExtension;
}