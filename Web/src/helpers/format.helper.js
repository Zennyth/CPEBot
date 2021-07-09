
export default {
    formatWithLanguage: (stringToFormat,language) => {
        const dateToFormat = new Date(stringToFormat);
        return `${dateToFormat.toLocaleDateString(language)} ${dateToFormat.toLocaleTimeString(language)}`;
    }
}