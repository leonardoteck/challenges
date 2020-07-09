/**
 * Executes all promises simultaneously and only returns when every and each one has completed.
 * @param {Array<T>} array
 * @param {(item: T, index: number, array: Array<T>) => Promise<void>} callback
 * @returns {Promise<Array<void>>}
 */
export async function asyncForEach<T>(array: T[], callback: (item: T, index: number, array: T[]) => Promise<void>): Promise<void[]> {
    return Promise.all(array.reduce((accumulated, current, index) =>
        accumulated.concat(callback(current, index, array)), [] as Array<Promise<void>>));
}
