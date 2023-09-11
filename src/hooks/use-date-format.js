
export default function useDateFormat() {
    const dateConverter = (datetime) => {
        if (datetime) {
            const today = new Date(datetime);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1;
            let dd = today.getDate();
    
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
    
            return (dd + '/' + mm + '/' + yyyy);
        }
        return "N/A";
    }
    const timeConverter = (datetime) => {
        const today = new Date(datetime);
        let hh = today.getHours();
        let mm = today.getMinutes();
        let ampm = hh >= 12 ? 'pm' : 'am';
        hh = hh % 12;
        hh = hh ? hh : 12;

        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;

        return (hh + ':' + mm + ampm);
    }
    const timeFormatter = (time) => {
        let hh = time.substring(0,2);
        let mm = time.substring(3,6);
        let ampm = hh >= 12 ? 'pm' : 'am';
        hh = hh % 12;
        if (hh < 10) hh = '0' + hh;

        return (hh + ':' + mm + ampm);
    }
    const dateTimeFormatter = (date,time) => {
        return (new Date(`${date} ${time}`));
    }

    return {dateConverter,timeConverter,timeFormatter,dateTimeFormatter};
}
