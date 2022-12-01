export function handler(): Response {
  return new Response("", {
    status: 307,
    headers: { Location: "/uswds" },
  });
}