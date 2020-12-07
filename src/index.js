const ReqFastPromiseWrapper = require('./req-fast-promise')
const rfp = ReqFastPromiseWrapper.default
Object.defineProperty(rfp, 'ReqFastPromise', {
    value: ReqFastPromiseWrapper.ReqFastPromise
})
module.exports = rfp