import { apiClient } from "./client";

export const createDynamoUser = (Username) =>
  apiClient.post("/create_dynamo_user", {
    body: {
      Username,
    },
    resource: "create_user_item",
  });

export const getDynamoUser = (Username) =>
  apiClient.post("/get_dynamo_user", {
    body: {
      Username,
    },
    resource: "get_user",
  });

export const scanUserByKeyword = (Keyword) =>
  apiClient.post("/scan_user_by_keyword", {
    body: {
      Keyword,
    },
    resource: "scan_user_by_keyword",
  });
