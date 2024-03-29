const http = require("http"); // On importe le package http de node
const app = require("./app"); // On importe notre application app

// Maintenant on crée le server
// La fonction normalizePort renvoie un port valide, qu'il soit sous la forme d'un numéro ou d'une chaîne
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// La fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée.
// elle est ensuite enregistrée dans le server
const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// un écouteur d'événement est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console
const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
});

server.listen(port);
