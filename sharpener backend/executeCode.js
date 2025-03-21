const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const executeCode = (code, language) => {
  return new Promise((resolve, reject) => {
    const tempDir = path.join(__dirname, "temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir); // Create temp folder if not exists

    const extension = language === "java" ? "java" : "py";
    const fileName =
      language === "java" ? "Solution.java" : `script.${extension}`;
    const filePath = path.join(tempDir, fileName);

    // Write user code into the temporary file
    fs.writeFileSync(filePath, code);

    let compileCommand, runCommand;

    if (language === "java") {
      compileCommand =
        os.platform() === "win32"
          ? `javac "${filePath}" -d "${tempDir}"`
          : `javac ${filePath} -d ${tempDir}`;

      runCommand =
        os.platform() === "win32"
          ? `cd "${tempDir}" && java Solution`
          : `cd ${tempDir} && java Solution`;

      // Compile Java Code
      exec(compileCommand, (compileError, _, compileStderr) => {
        if (compileError) {
          fs.unlinkSync(filePath); // Remove file after execution
          return reject(compileStderr || compileError.message); // Return compilation errors
        }

        // Run Java Code
        exec(runCommand, { timeout: 5000 }, (runError, stdout, stderr) => {
          fs.unlinkSync(filePath);
          const classFile = path.join(tempDir, "Solution.class");
          if (fs.existsSync(classFile)) fs.unlinkSync(classFile); // Clean up class file

          if (runError) {
            return reject(stderr || runError.message);
          }
          resolve(stdout);
        });
      });
    } 
    else {
      runCommand =
        os.platform() === "win32"
          ? `python "${filePath}"`
          : `python3 ${filePath}`;

      // Run Python Code
      exec(runCommand, { timeout: 5000 }, (error, stdout, stderr) => {
        fs.unlinkSync(filePath);
        if (error) {
          return reject(stderr || error.message);
        }
        resolve(stdout);
      });
    }
  });
};

module.exports = { executeCode };
