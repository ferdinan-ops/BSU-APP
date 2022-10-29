import * as cookie from "cookie";

export function unauthPage(context) {
  return new Promise((resolve) => {
    const cookies = context.req.headers.cookie;
    if (cookies) {
      const allCookies = cookie.parse(cookies);

      if (allCookies.bsuToken) {
        return context.res.writeHead(302, { location: "/" }).end();
      }
    }
    return resolve("unaithorized");
  });
}

export function authPage(context) {
  return new Promise((resolve) => {
    const cookies = context.req.headers.cookie;
    if (!cookies) {
      return context.res.writeHead(302, { location: "/auth/login" }).end();
    }

    const allCookies = cookie.parse(cookies);
    if (!allCookies.bsuToken) {
      return context.res.writeHead(302, { location: "/auth/login" }).end();
    }

    return resolve({ token: allCookies.bsuToken });
  });
}