import { useAxiosPrivate, useAlert, useSecondIndex } from "./";

export default function useGetFile() {
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const getSecondIndex = useSecondIndex();

    const getFile = async (path) => {
        // console.log("path: ", path);
        axiosPrivate.get("/api/utility/send-file", {params: {file_path: path}}, {responseType: "arraybuffer"})
        .then((response) => {
            // console.log(response?.data);
            return response?.data;
        })
        .then((base64str) => {
            const link = document.createElement('a');
            link.href = "data:application/octet-stream;base64," + base64str;
            // var subPath = path.substring(path.lastIndexOf('/'));
            var path2 = path.substring(path.lastIndexOf('/'));
            // console.log("path2: ", path2);
            var subPath = path2.substring(getSecondIndex(path2,'_'));
            // console.log("subpath: ", subPath);
            link.setAttribute("download",subPath); //path.substring(subPath.substring(getSecondIndex(subPath,'_')))
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
        .catch((err) => {
            setAlert({msg: `Error: ${err?.message}`, type: "error"});
        });
    }

    return getFile;
}