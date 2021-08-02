const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export default {
    formatWithLanguage: (stringToFormat,language) => {
        const dateToFormat = new Date(stringToFormat);
        //return `${dateToFormat.toLocaleDateString(language)} ${dateToFormat.toLocaleTimeString(language)}`;
        return dateToFormat.toLocaleDateString(language, options);
    }
}