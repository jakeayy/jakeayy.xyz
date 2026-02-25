import type { RequestHandler } from "@sveltejs/kit";

// implement projects API with items from const.ts

export const GET: RequestHandler = ({  }) => {
    return new Response("works")
}