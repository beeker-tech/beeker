import chalk from 'chalk';
import { TableUtils } from './table.utils';

export const displayMessage = (message: string) =>
  process.stdout.write(message + '\n');
export const displayInfo = (message: string) =>
  process.stdout.write(chalk.cyan(message + '\n'));
export const displaySuccess = (message: string) =>
  process.stdout.write(chalk.green(message + '\n'));
export const displayWarning = (message: string) =>
  process.stdout.write(chalk.yellow(message + '\n'));
export const displayError = (message: string) =>
  process.stdout.write(chalk.red(message + '\n'));
export const displayTable = (data: object[]) =>
  process.stdout.write(TableUtils.formatTable(data) + '\n');
export const displayLineBreak = () => process.stdout.write('\n');
export const clearLastLine = () => {
  process.stdout.moveCursor(0, -1);
  process.stdout.clearLine(1);
};
