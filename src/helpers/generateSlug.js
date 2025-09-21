function generateSlug(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')   // replace non-alphanum with '-'
    .replace(/^-+|-+$/g, '')       // trim leading/trailing '-'
}

module.exports = generateSlug