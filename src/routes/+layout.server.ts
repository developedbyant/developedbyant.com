import type { LayoutServerLoad } from "./$types";

export const load:LayoutServerLoad = async(event) => {
    const theme:"dark"|"light" = event.cookies.get("theme") || "dark" as any
    return { theme }    
}