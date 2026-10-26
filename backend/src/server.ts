import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function shutdown(signal?: string) {

    console.log(`Shutting down server...${signal ? ` Signal: ${signal}` : ""}`);
    server.close(() => {
        console.log("Server closed");
        process.exit(0);
    });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
