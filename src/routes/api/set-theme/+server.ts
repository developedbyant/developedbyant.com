import { json } from "@sveltejs/kit";
import utils from "src/lib/utils.server";
import type { RequestHandler } from "./$types";
import type { Apis } from "src/lib/api";

export const POST:RequestHandler = async(event) => {
    const apiData:Apis['/api/set-theme']['load'] = await event.request.json()
    // set cookie
    utils.cookieSet(event,"theme",apiData.theme)
    // return response
    const response:Apis['/api/set-theme']['res'] = { data:{ theme:"dark" }}
    return json(response)
}