import { HandlerContext } from "$fresh/server.ts";
import { appRouter } from "../../../router.ts";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export const handler = async (
  req: Request,
  _ctx: any,
): Promise<Response> => {
  const trpcRes = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
  } as any);

  return new Response(trpcRes.body, {
    headers: trpcRes.headers,
    status: trpcRes.status,
  });
};
