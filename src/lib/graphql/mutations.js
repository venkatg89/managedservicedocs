// eslint-disable
// this is an auto generated file. This will be overwritten

export const createDocument = `mutation CreateDocument($input: CreateDocumentInput!) {
  createDocument(input: $input) {
    id
    images
    dateOfCapture
  }
}
`;
export const updateDocument = `mutation UpdateDocument($input: UpdateDocumentInput!) {
  updateDocument(input: $input) {
    id
  }
}
`;
export const deleteDocument = `mutation DeleteDocument($input: DeleteDocumentInput!) {
  deleteDocument(input: $input) {
    id
  }
}
`;
export const createImage = `mutation CreateImage($input: CreateImageInput!) {
  createImage(input: $input) {
    id
  }
}
`;
export const updateImage = `mutation UpdateImage($input: UpdateImageInput!) {
  updateImage(input: $input) {
    id
  }
}
`;
export const deleteImage = `mutation DeleteImage($input: DeleteImageInput!) {
  deleteImage(input: $input) {
    id
  }
}
`;
export const createStatus = `mutation CreateStatus($input: CreateStatusInput!) {
  createStatus(input: $input) {
    id
  }
}
`;
export const updateStatus = `mutation UpdateStatus($input: UpdateStatusInput!) {
  updateStatus(input: $input) {
    id
  }
}
`;
export const deleteStatus = `mutation DeleteStatus($input: DeleteStatusInput!) {
  deleteStatus(input: $input) {
    id
  }
}
`;
export const createSetting = `mutation CreateSetting($input: CreateSettingInput!) {
  createSetting(input: $input) {
    key
    value
    userId
  }
}
`;
export const updateSetting = `mutation UpdateSetting($input: UpdateSettingInput!) {
  updateSetting(input: $input) {
    key
    value
    userId
  }
}
`;
export const deleteSetting = `mutation DeleteSetting($input: DeleteSettingInput!) {
  deleteSetting(input: $input) {
    key
    value
    userId
  }
}
`;
