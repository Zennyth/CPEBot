module.exports = {
    delay:  ms => new Promise(resolve => setTimeout(resolve, ms)),
    reducer: (array, prop) => {
        const reducerFilter = (acc, currentElement) => {
            if(!acc.includes(currentElement[prop])) acc.push(currentElement[prop]);
        }
        return array.reduce(reducerFilter, []);
    }
}