#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const fsPromise = fs.promises;
const { F_OK, COPYFILE_EXCL } = fs.constants;

const notCopyPath = ["bin", "dist", "node_modules", ".DS_Store"];

const mewjobName = process.argv[2] || "lightly";

copyAll(
  path.resolve(__dirname, "../app"),
  path.resolve(process.env.PWD, "./", mewjobName)
).then(() => {
  console.log("创建完成");
});

/**
 * copy 指定目录下的所有文件
 * @param {string} path 被 copy 的项目路径
 * @param {string} targetDir copy 的目标路径
 * @returns Promise<void>
 */
function copyAll(path, targetDir) {
  return fsPromise
    .access(targetDir, F_OK)
    .then(() => fsPromise.readdir(path))
    .then((files) =>
      Promise.all(
        files
          .filter((file) => notCopyPath.every((item) => !file.includes(item)))
          .map((file) => {
            const _path = path + "/" + file;
            const _targetDir = targetDir + "/" + file;
            return fsPromise
              .stat(_path)
              .then((stat) => ({ stat, _path, _targetDir }));
          })
      )
    )
    .then((fileStats) => {
      fileStats.forEach((file) => {
        const { stat, _path, _targetDir } = file;
        if (stat.isFile()) {
          fsPromise
            .copyFile(_path, _targetDir, COPYFILE_EXCL)
            .then(() => {
              console.log(_path, "copy成功");
            })
            .catch((err) => {
              console.error(err, _path, "复制文件错误。");
            });
        } else if (stat.isDirectory()) {
          copyAll(_path, _targetDir);
        }
      });
    })
    .catch((err) => {
      fs.mkdirSync(targetDir);
      copyAll(path, targetDir);
    });
}
