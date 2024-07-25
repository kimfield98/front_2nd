module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start",
      url: ["http://localhost:5173"],
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci_reports",
    },
  },
};