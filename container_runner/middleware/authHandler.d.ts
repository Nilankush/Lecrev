import type { Request, Response, NextFunction } from "express";
declare const authHandler: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export default authHandler;
//# sourceMappingURL=authHandler.d.ts.map