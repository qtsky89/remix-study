import { json } from "@remix-run/node";
import { destroyUserSession } from "~/data/auth.server";

export function action({request}) {
  if(request.method !== 'POST') {
    throw json({
        message: 'invalid request method',
      },
      {
        status: 400,
    statusText: 'method is werid. only post allowed'
      }
    )
  }

  return destroyUserSession(request)
}

