import fetch from "isomorphic-fetch";

global.__DEV__ = true;
global.fetch = fetch;
