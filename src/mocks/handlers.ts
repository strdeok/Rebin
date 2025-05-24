import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/login", () => {
    return HttpResponse.json(
      {
        success: true,
        user: {
          id: "user-123",
          username: "exampleUser",
          email: "user@example.com",
        },
      },
      {
        status: 200,
        statusText: "OK",
      }
    );
  }),

  http.put("/api/nickname", async ({ request }) => {
    const body = (await request.json()) as { username: string }; // body 파싱
    const { username } = body; // body에서 username 추출

    return HttpResponse.json(
      {
        success: true,
        user: {
          username,
        },
      },
      {
        status: 200,
        statusText: "OK",
      }
    );
  }),
  http.get("/api/favorites", () => {
    return HttpResponse.json(
      {
        success: true,
        favorites: [
          { name: "온누리약국", time: "09:00 ~ 19:00", category: "폐의약품" },
          { name: "롯데마트", time: "09:00 ~ 21:00", category: "공병" },
          { name: "행정복지센터", time: "09:00 ~ 17:00", category: "폐건전지" },
          { name: "우리약국", time: "09:00 ~ 18:00", category: "폐의약품" },
          { name: "홈플러스", time: "09:00 ~ 22:00", category: "공병" },
          { name: "공룡마트", time: "06:00 ~ 22:00", category: "공병" }
        ],
      },
      {
        status: 200,
        statusText: "OK",
      }
    );
  }),
];
