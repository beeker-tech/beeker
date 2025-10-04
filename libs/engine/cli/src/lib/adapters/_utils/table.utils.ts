import Table from 'cli-table';
import chalk from 'chalk';

export class TableUtils {
  static formatTable = <T extends object>(data: T[]) => {
    if (!data || !data.length) return '';

    const table = new Table({
      head: Object.keys(data[0]).map((key: string) => chalk.cyan(key)),
    });

    data.forEach((datum) => table.push(Object.values(datum)));

    return table.toString();
  };
}
