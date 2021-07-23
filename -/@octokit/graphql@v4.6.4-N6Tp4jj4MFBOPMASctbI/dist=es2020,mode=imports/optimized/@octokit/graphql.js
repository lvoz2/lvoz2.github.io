import {request as request2} from "/-/@octokit/request@v5.6.0-oo0xsXdfsSew32Ctijvb/dist=es2020,mode=imports/optimized/@octokit/request.js";
import {getUserAgent} from "/-/universal-user-agent@v6.0.0-fUAPE3UH5QP7qG0fd0dH/dist=es2020,mode=imports/optimized/universal-user-agent.js";
const VERSION = "4.6.4";
class GraphqlError extends Error {
  constructor(request3, response) {
    const message = response.data.errors[0].message;
    super(message);
    Object.assign(this, response.data);
    Object.assign(this, {headers: response.headers});
    this.name = "GraphqlError";
    this.request = request3;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
const NON_VARIABLE_OPTIONS = [
  "method",
  "baseUrl",
  "url",
  "headers",
  "request",
  "query",
  "mediaType"
];
const FORBIDDEN_VARIABLE_OPTIONS = ["query", "method", "url"];
const GHES_V3_SUFFIX_REGEX = /\/api\/v3\/?$/;
function graphql(request3, query, options) {
  if (options) {
    if (typeof query === "string" && "query" in options) {
      return Promise.reject(new Error(`[@octokit/graphql] "query" cannot be used as variable name`));
    }
    for (const key in options) {
      if (!FORBIDDEN_VARIABLE_OPTIONS.includes(key))
        continue;
      return Promise.reject(new Error(`[@octokit/graphql] "${key}" cannot be used as variable name`));
    }
  }
  const parsedOptions = typeof query === "string" ? Object.assign({query}, options) : query;
  const requestOptions = Object.keys(parsedOptions).reduce((result, key) => {
    if (NON_VARIABLE_OPTIONS.includes(key)) {
      result[key] = parsedOptions[key];
      return result;
    }
    if (!result.variables) {
      result.variables = {};
    }
    result.variables[key] = parsedOptions[key];
    return result;
  }, {});
  const baseUrl = parsedOptions.baseUrl || request3.endpoint.DEFAULTS.baseUrl;
  if (GHES_V3_SUFFIX_REGEX.test(baseUrl)) {
    requestOptions.url = baseUrl.replace(GHES_V3_SUFFIX_REGEX, "/api/graphql");
  }
  return request3(requestOptions).then((response) => {
    if (response.data.errors) {
      const headers = {};
      for (const key of Object.keys(response.headers)) {
        headers[key] = response.headers[key];
      }
      throw new GraphqlError(requestOptions, {
        headers,
        data: response.data
      });
    }
    return response.data.data;
  });
}
function withDefaults(request$1, newDefaults) {
  const newRequest = request$1.defaults(newDefaults);
  const newApi = (query, options) => {
    return graphql(newRequest, query, options);
  };
  return Object.assign(newApi, {
    defaults: withDefaults.bind(null, newRequest),
    endpoint: request2.endpoint
  });
}
const graphql$1 = withDefaults(request2, {
  headers: {
    "user-agent": `octokit-graphql.js/${VERSION} ${getUserAgent()}`
  },
  method: "POST",
  url: "/graphql"
});
function withCustomRequest(customRequest) {
  return withDefaults(customRequest, {
    method: "POST",
    url: "/graphql"
  });
}
export {graphql$1 as graphql, withCustomRequest};
export default null;
