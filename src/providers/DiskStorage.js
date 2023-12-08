const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

// RENAME SERVE PRA RENOMEAR MAS TAMBÉM PRA REALOCAR ARQUIVOS
class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  // STAT REVELA O STATUS DO ARQUIVO (SE ESTÁ ABERTO ETC.)
  // UNLINK REMOVE O ARQUIVO
  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
