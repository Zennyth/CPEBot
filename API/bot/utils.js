const publicChannels = ['général', 'Salons textuels'];

module.exports = {
    privateChannels: (cache) => {
        return cache.filter(ch => !publicChannels.includes(ch.name));
    }
}