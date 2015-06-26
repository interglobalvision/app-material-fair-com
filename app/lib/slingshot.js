Slingshot.fileRestrictions("imageUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif",],
  maxSize: 4 * 1024 * 1024, // 4 MB
});

Slingshot.fileRestrictions("docUploads", {
  allowedFileTypes: ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",],
  maxSize: 10 * 1024 * 1024, // 10 MB
});