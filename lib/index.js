"use strict";

var ReqFastPromiseWrapper = require('./req-fast-promise');

var rfp = ReqFastPromiseWrapper.default;
Object.defineProperty(rfp, 'ReqFastPromise', {
  value: ReqFastPromiseWrapper.ReqFastPromise
});
module.exports = rfp;