/**
 *
 * @param {import("express-serve-static-core").Request} req
 * @param {import("express-serve-static-core").Response} res
 * @param {import("express-serve-static-core").RequestHandler} next
 */

export function logger(req, res, next) {
    const now = Date.now()
    const { ip, method, path, body } = req
    const logEntry = {
        timestamp: now,
        remote_id: ip,
        method,
        path,
        body
    }
    console.log(`${JSON.stringify(logEntry)}`)
    next()
}
