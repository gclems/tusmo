const stringIsNullOrEmpty = (text: string | null | undefined) =>
  !text || typeof text !== "string" || text.trim() === "";

export { stringIsNullOrEmpty };
