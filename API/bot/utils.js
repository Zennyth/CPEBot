const publicChannels = ['général', 'Salons textuels'];

module.exports = {
    publicChannels: publicChannels,
    privateChannels: (cache) => {
        return cache.filter(ch => !publicChannels.includes(ch.name));
    }
}