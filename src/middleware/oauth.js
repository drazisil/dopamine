import bunyan from 'bunyan';
import config from 'config'
import QueryString from "qs";
import { generateAuthRequestQuery, generateRedirectURL } from "../auth/oauth2.js";

const log = bunyan.createLogger({
    name: config.get("app.name"),
    serializers: bunyan.stdSerializers,
  });

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
            log.debug('Login')
            break;

        case 'callback':
            log.debug('Callback')
            break

        default:
            return;
    }

    log.debug(pathParts)
    log.debug(query)
    const redirectURL = generateRedirectURL(config.get("web.host"), config.get("web.port"))
    const { encodedParams } = generateAuthRequestQuery(config.get("oauth.client_key"), `https://${redirectURL}`)
    log.debug(JSON.stringify(encodedParams))

}


/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
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

