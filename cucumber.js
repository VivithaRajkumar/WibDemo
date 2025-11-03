// cucumber.js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  default: `--require ${__dirname}/features/step_definitions/**/*.js \
--require ${__dirname}/hooks/**/*.js \
--format progress \
--format json:reports/cucumber-report.json
--format json:${path.resolve(__dirname, '../reports/cucumber_report.json')} \
--publish-quiet \
--timeout 60000`
};
