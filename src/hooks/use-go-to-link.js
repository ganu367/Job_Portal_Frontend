export default function useGoToLink() {
    const httpRegex = /^https?:\/\/+/i;
    const goToLink = (url) => {
        const link = document.createElement('a');
        link.href = httpRegex.test(url) ? `${url}` : `http://${url}`;
        link.setAttribute("target","_blank");
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    return goToLink;
}