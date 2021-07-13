const onHeaders = require('on-headers')

module.exports = function responseTime(req, res, next) {
    const start = process.hrtime()

        onHeaders(res, () => {
            const elapsedHrTime = process.hrtime(start);
            const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
            res.setHeader('X-Response-Time', elapsedTimeInMs +'ms')
            console.log("%s : %fms", req.path, elapsedTimeInMs);
        })
 

    
      next();
}