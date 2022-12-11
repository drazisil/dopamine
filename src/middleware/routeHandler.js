/**
 *
 * @param {import("express-serve-static-core").Request} req
 * @param {import("express-serve-static-core").Response} res
 * @param {import("express-serve-static-core").RequestHandler} next
 */

export function routeHandler(req, res, next) {
    res.send('Hello World!');
}
