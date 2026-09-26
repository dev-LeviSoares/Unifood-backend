import { env } from "./infrastructure/env/index.js";
import { createHttpServer } from "./app.js";

const http = createHttpServer();

await http.listen(env.PORT);
