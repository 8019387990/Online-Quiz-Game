const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dns.promises
  .resolveSrv("_mongodb._tcp.onlinecomplaintdb.gj6lsca.mongodb.net")
  .then(console.log)
  .catch(console.error);