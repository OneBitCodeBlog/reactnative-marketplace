const fs = require("node:fs/promises")

async function deleteFiles(filePaths) {
  await Promise.all(filePaths.map(async (path) => {
    await fs.unlink(path)
  }))
}

module.exports = deleteFiles