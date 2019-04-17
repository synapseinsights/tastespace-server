// Middleware check if user is logged in add them to the request object, otherwise bounce them to login page with an error
const isAuthenticated = (req, res, next) => {
    // check if user is logged in
    // if they are attach them to the req and call next
    // if not send them to login page
}

export default isAuthenticated;