// cucumber.js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  default: `--require ${__dirname}/features/step_definitions/**/*.js \
  
--require ${__dirname}/hooks/**/*.js \

--format: ['json:reports/results.json', 'progress'], \
--publish-quiet \
--timeout 60000`

};
