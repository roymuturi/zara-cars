// Supabase pg_graphql client.
//
// Thin, dependency-free fetch client that POSTs to the Supabase GraphQL
// endpoint. Only client-safe config is used (public endpoint + publishable/anon
// key). No service-role / secret keys are ever read here.
//
// Response shape: { data?, errors? } per the GraphQL spec.

export interface GraphQLErrorField {
  message: string;
  path?: readonly (string | number)[];
  extensions?: Record<string, unknown>;
}

export class GraphQLError extends Error {
  constructor(
    public readonly message: string,
    public readonly errors: readonly GraphQLErrorField[]
  ) {
    super(message);
    this.name = "GraphQLError";
  }
}

export interface GqlRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export interface GqlResponse<T> {
  data: T | null;
  errors?: readonly GraphQLErrorField[];
}

function endpoint(): string {
  return import.meta.env.VITE_GRAPHQL_ENDPOINT || "";
}

function authHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const key =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    "";
  if (key) headers["apikey"] = key;
  const bearer = token || key;
  if (bearer) headers["Authorization"] = `Bearer ${bearer}`;
  return headers;
}

// Graceful no-op when the GraphQL endpoint is not configured (local dev /
// tests). Returns a typed empty result so components render loading/empty
// states instead of throwing. The real inventory is never hard-coded here.
export class NoEndpointError extends Error {
  constructor() {
    super(
      "Supabase GraphQL endpoint is not configured. Set VITE_GRAPHQL_ENDPOINT and VITE_SUPABASE_ANON_KEY/Publishable key."
    );
    this.name = "NoEndpointError";
  }
}

export async function graphql<T>(
  request: GqlRequest,
  token?: string
): Promise<T> {
  const url = endpoint();
  if (!url) {
    throw new NoEndpointError();
  }
  const res = await fetch(url, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    throw new GraphQLError(
      `GraphQL request failed with ${res.status} ${res.statusText}`,
      []
    );
  }
  const json: GqlResponse<T> = (await res.json()) as GqlResponse<T>;
  if (json.errors && json.errors.length > 0) {
    throw new GraphQLError(
      json.errors[0]?.message ?? "GraphQL error",
      json.errors
    );
  }
  return (json.data ?? ({} as T)) as T;
}

export { authHeaders };
