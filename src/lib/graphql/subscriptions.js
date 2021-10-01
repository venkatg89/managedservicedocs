// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateDocumentType = `subscription OnCreateDocumentType(
  $id: ID
  $name: String
  $isDefault: Boolean
) {
  onCreateDocumentType(id: $id, name: $name, isDefault: $isDefault) {
    id
    name
    isDefault
  }
}
`;
export const onUpdateDocumentType = `subscription OnUpdateDocumentType(
  $id: ID
  $name: String
  $isDefault: Boolean
) {
  onUpdateDocumentType(id: $id, name: $name, isDefault: $isDefault) {
    id
    name
    isDefault
  }
}
`;
export const onDeleteDocumentType = `subscription OnDeleteDocumentType(
  $id: ID
  $name: String
  $isDefault: Boolean
) {
  onDeleteDocumentType(id: $id, name: $name, isDefault: $isDefault) {
    id
    name
    isDefault
  }
}
`;
export const onCreateDocument = `subscription OnCreateDocument($id: String) {
  onCreateDocument(id: $id) {
    id
  }
}
`;
export const onUpdateDocument = `subscription OnUpdateDocument($id: String) {
  onUpdateDocument(id: $id) {
    id
  }
}
`;
export const onDeleteDocument = `subscription OnDeleteDocument($id: String) {
  onDeleteDocument(id: $id) {
    id
  }
}
`;
export const onCreateImage = `subscription OnCreateImage($id: String) {
  onCreateImage(id: $id) {
    id
  }
}
`;
export const onUpdateImage = `subscription OnUpdateImage($id: String) {
  onUpdateImage(id: $id) {
    id
  }
}
`;
export const onDeleteImage = `subscription OnDeleteImage($id: String) {
  onDeleteImage(id: $id) {
    id
  }
}
`;
export const onCreateStatus = `subscription OnCreateStatus($id: String) {
  onCreateStatus(id: $id) {
    id
  }
}
`;
export const onUpdateStatus = `subscription OnUpdateStatus($id: String) {
  onUpdateStatus(id: $id) {
    id
  }
}
`;
export const onDeleteStatus = `subscription OnDeleteStatus($id: String) {
  onDeleteStatus(id: $id) {
    id
  }
}
`;
export const onCreateSetting = `subscription OnCreateSetting($id: ID, $name: String, $value: String) {
  onCreateSetting(id: $id, name: $name, value: $value) {
    key
    value
    userId
  }
}
`;
export const onUpdateSetting = `subscription OnUpdateSetting($id: ID, $name: String, $value: String) {
  onUpdateSetting(id: $id, name: $name, value: $value) {
    key
    value
    userId
  }
}
`;
export const onDeleteSetting = `subscription OnDeleteSetting($id: ID, $name: String, $value: String) {
  onDeleteSetting(id: $id, name: $name, value: $value) {
    key
    value
    userId
  }
}
`;
