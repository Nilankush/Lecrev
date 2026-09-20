import auth from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";
const authHandler = async (req, res, next) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    });
    if (!session) {
        return res.status(401).json({ msg: "unauthorized." });
    }
    ;
    req.user = session.user;
    req.session = session.session;
    return next();
};
export default authHandler;
//# sourceMappingURL=authHandler.js.map