import config from 'config'
import QueryString from "qs";
import { generateAuthRequestQuery, generateRedirectURL } from "../auth/oauth2.js";

/**
 * 
 * @param {string} path 
 * @returns string[]
 */
function shiftPath(path) {
    const pathPaths = path.split('/');
    if (pathPaths[0].length === 0) {
        pathPaths.shift();
    }
    return pathPaths;
}

/**
 * 
 * @param {string[]} pathParts 
 * @param {QueryString.ParsedQs} query 
 */
export async function routesAuth(pathParts, query) {
    switch (pathParts[0]) {
        case 'login':
            console.info('Login')
            break;

        case 'callback':
            console.info('Callback')
            break

        default:
            return;
    }

    console.debug(pathParts)
    console.debug(query)
    const redirectURL = generateRedirectURL(config.get("web.host"), config.get("web.port"))
    const { encodedParams } = generateAuthRequestQuery(config.get("oauth.client_key"), `https://${redirectURL}`)
    console.dir(encodedParams)

}


/**
 *
 * @param {import("express-serve-static-core").Request} req
 * @param {import("express-serve-static-core").Response} res
 * @param {import("express-serve-static-core").RequestHandler} next
 */

export async function oauthMiddleware(req, res, next) {
    const { path, query } = req

    const pathParts = shiftPath(path);

    if (pathParts[0] === 'auth') {
        pathParts.shift()

        await routesAuth(pathParts, query)
        return next()
    }

    next()
}

