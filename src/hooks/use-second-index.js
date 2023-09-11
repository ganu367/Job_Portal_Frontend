export default function useSecondIndex() {
    function getSecondIndex(str, char) {
        var firstIndex = str.indexOf(char);
        if (firstIndex == -1) {
            return -1;
        }
        var secondIndex = str.indexOf(char, firstIndex + 1);
        if (secondIndex == -1) {
            return -1;
        }
        return (secondIndex + 1);
    }

    return getSecondIndex;
}