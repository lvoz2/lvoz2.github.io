import {Octokit as Octokit$1} from "/-/@octokit/core@v3.5.1-ULgnpRlNk5cDFHwYGRcX/dist=es2020,mode=imports/optimized/@octokit/core.js";
import {requestLog} from "/-/@octokit/plugin-request-log@v1.0.4-sYNxBIYInFYCKdqYFxRt/dist=es2020,mode=imports/optimized/@octokit/plugin-request-log.js";
import {paginateRest} from "/-/@octokit/plugin-paginate-rest@v2.14.0-eVw8j1SIGR7ocfturqIk/dist=es2020,mode=imports/optimized/@octokit/plugin-paginate-rest.js";
import {legacyRestEndpointMethods} from "/-/@octokit/plugin-rest-endpoint-methods@v5.5.0-1HQEZnl5KjjlW3OYCkVU/dist=es2020,mode=imports/optimized/@octokit/plugin-rest-endpoint-methods.js";
const VERSION = "18.7.0";
const Octokit = Octokit$1.plugin(requestLog, legacyRestEndpointMethods, paginateRest).defaults({
  userAgent: `octokit-rest.js/${VERSION}`
});
export {Octokit};
export default null;
