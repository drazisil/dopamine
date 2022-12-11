/**
 * Module to handle the OAuth 2.0 flow
 * @link {https://www.rfc-editor.org/rfc/rfc6749}
 * 
 * Steps:
 *  A. Client -> Auth Request -> Resource Owner
 *  B. Client <- Auth Grant <- Resource Owner
 * 
 *  C. Client -> Auth Grant -> Auth Server
 *  D. Client <- Access Token & Refresh Token <- Auth Server
 * 
 *  E. Client -> Access Token -> Resource Server
 *  F. Client -< Protected Resource <- Resource Server
 * 
 *  G. If access token is rejected, send refresh token to auth server to get fresh set
 */

/**
 * @param {string} clientHost
 * @param {string} clientPort
 */
export function generateRedirectURL(clientHost, clientPort) {
    return `${clientHost}:${clientPort}/auth/callback`
}


/**
 * @param {string} clientId
 * @param {string} redirectURL
 */
export function generateAuthRequestQuery(clientId, redirectURL) {
    const encodedParams = {
        response_type: 'code',
        client_id: encodeURIComponent(clientId),
        redirect_uri: encodeURIComponent(redirectURL)
    }

    return { encodedParams }
}
