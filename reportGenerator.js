import reporter from 'multiple-cucumber-html-reporter';
import path from 'path';
import fs from 'fs';

const jsonReport = path.resolve('./reports/cucumber_report.json');
const htmlDir = path.resolve('./reports/html');

if (fs.existsSync(jsonReport)) {
  reporter.generate({
    jsonDir: './reports',
    reportPath: htmlDir,
    metadata: {
      browser: { name: 'chrome', version: 'latest' },
      device: 'Local Test',
      platform: { name: 'Windows', version: '11' }
    },
  });
  console.log(' HTML report generated at:', htmlDir);
} else {
  console.warn(' No JSON found — ensure Cucumber executed scenarios!');
}
