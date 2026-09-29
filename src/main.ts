import { env } from "./infrastructure/env/index.js";
import { createHttpServer } from "./app.js";

const http = await createHttpServer();

await http.listen(env.PORT);