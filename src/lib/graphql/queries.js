// eslint-disable

export const listDocumentTypes = `query ListDocumentTypes(
  $filter: ModelDocumentTypeFilterInput
  $limit: Int
  $nextToken: String
) {
  listDocumentTypes(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      isDefault
      code
    }
    nextToken
  }
}
`;

export const getDocument = `query GetDocument($id: String!) {
  getDocument(id: $id) {
    id
    images {
      id
      data
    }
    status {
      id
      name
      iconName
      message
    }
    dateOfCapture
  }
}
`;

export const listDocuments = `query ListDocuments(
  $filter: ModelDocumentFilterInput
  $limit: Int
  $nextToken: String
) {
  listDocuments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      dateOfCapture
      status {
        id
        code
        name
        iconName
        message
      }
      type {
        id
        code
        name
      }
      images 
    }
    nextToken
  }
}
`;

export const listStatuses = `query ListStatuses(
  $filter: ModelStatusFilterInput
  $limit: Int
  $nextToken: String
) {
  listStatuses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      isDefault
      code
      iconName
      message
    }
    nextToken
  }
}
`;
export const getSetting = `query GetSetting($id: ID!) {
  getSetting($userId: String, $key: String) {
    key
    value
  }
}
`;
export const listSettings = `query ListSettings(
  $filter: ModelSettingFilterInput
  $limit: Int
  $nextToken: String
) {
  listSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      key
      value
    }
    nextToken
  }
}
`;
