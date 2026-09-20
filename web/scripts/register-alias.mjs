// Lets plain Node run the data scripts against src/ files that use the
// tsconfig "@/..." path alias and extension-less relative imports, and that
// import JSON without an attribute. Usage: node --import ./scripts/register-alias.mjs <script>
import { register } from "node:module";
register("./ts-alias-loader.mjs", import.meta.url);
