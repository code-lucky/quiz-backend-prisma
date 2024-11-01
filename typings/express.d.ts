declare namespace Express {
  export interface Request {
    user?: any; // 或者你可以将 `any` 替换为你的用户类型
    client?: any; // 或者你可以将 `any` 替换为你的用户类型
  }
}