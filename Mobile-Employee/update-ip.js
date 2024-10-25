// const os = require("os");
// const fs = require("fs");
// const path = require("path");

// function getLocalIpAddress() {
//   const networkInterfaces = os.networkInterfaces();
//   for (const interfaceName in networkInterfaces) {
//     const interfaces = networkInterfaces[interfaceName];
//     for (const iface of interfaces) {
//       if (iface.family === "IPv4" && !iface.internal) {
//         return iface.address;
//       }
//     }
//   }
//   return null;
// }

// function updateConfigIp(newIp) {
//   const configPath = path.join(__dirname, "config.ts");
//   const configContent = fs.readFileSync(configPath, "utf8");

//   const updatedContent = configContent.replace(
//     /export const IP = ".*";/,
//     `export const IP = "${newIp}";`
//   );

//   fs.writeFileSync(configPath, updatedContent, "utf8");
//   console.log(`Updated IP address in config.ts to: ${newIp}`);
// }

// const localIp = getLocalIpAddress();
// if (localIp) {
//   updateConfigIp(localIp);
// } else {
//   console.log("Could not find local IP address.");
// }
