import { NextResponse } from "next/server";

const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "ITinNepal Public Read API",
    version: "1.0.0",
    description:
      "Public REST API for discovering, searching, and comparing verified IT colleges, degrees, fees, and admission criteria in Nepal.",
  },
  servers: [
    {
      url: "/api/v1",
      description: "Default API v1 Server",
    },
  ],
  paths: {
    "/search": {
      get: {
        summary: "Search and filter IT colleges with full-text search and facets",
        parameters: [
          { name: "q", in: "query", schema: { type: "string" }, description: "Keyword query" },
          { name: "district", in: "query", schema: { type: "string" }, description: "District ID" },
          { name: "program", in: "query", schema: { type: "string" }, description: "Program slug" },
          {
            name: "type",
            in: "query",
            schema: { type: "string", enum: ["GOVERNMENT", "COMMUNITY", "PRIVATE"] },
          },
          { name: "fee_min", in: "query", schema: { type: "number" } },
          { name: "fee_max", in: "query", schema: { type: "number" } },
          { name: "entrance", in: "query", schema: { type: "boolean" } },
          {
            name: "sort",
            in: "query",
            schema: {
              type: "string",
              enum: ["relevance", "fee_asc", "fee_desc", "seats", "verified"],
            },
          },
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
        ],
        responses: {
          200: { description: "Search results with pagination and facets" },
        },
      },
    },
    "/search/suggest": {
      get: {
        summary: "Instant autosuggestion for search bars",
        parameters: [{ name: "q", in: "query", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Matching colleges and programs" },
        },
      },
    },
    "/colleges": {
      get: {
        summary: "List all verified colleges with pagination",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 20 } },
        ],
        responses: {
          200: { description: "List of colleges" },
        },
      },
    },
    "/colleges/{slug}": {
      get: {
        summary: "Get full profile of a college by slug",
        parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "College profile details" },
          404: { description: "College not found" },
        },
      },
    },
    "/programs": {
      get: {
        summary: "List all available IT programs (BSc CSIT, BIT, BCA, BE Computer)",
        responses: {
          200: { description: "List of programs" },
        },
      },
    },
    "/programs/{slug}": {
      get: {
        summary: "Get program overview and requirements",
        parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Program details" },
          404: { description: "Program not found" },
        },
      },
    },
    "/colleges/{slug}/programs/{program}/admission": {
      get: {
        summary: "Get admission rules, eligibility, entrance exam details and documents checklist",
        parameters: [
          { name: "slug", in: "path", required: true, schema: { type: "string" } },
          { name: "program", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          200: { description: "Admission rules and checklist" },
          404: { description: "Not found" },
        },
      },
    },
    "/compare": {
      post: {
        summary: "Compare 2 to 4 colleges side-by-side",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  collegeSlugs: {
                    type: "array",
                    items: { type: "string" },
                    minItems: 2,
                    maxItems: 4,
                  },
                },
                required: ["collegeSlugs"],
              },
            },
          },
        },
        responses: {
          200: { description: "Side-by-side comparison data" },
          422: { description: "Validation error" },
        },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(openApiSpec, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
