const isJS = __dirname.endsWith('dist');
const entities = [isJS ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'];
const ssl = process.env.DATABASE_SSL === 'true' ? { ssl: { rejectUnauthorized: false } } : {};

module.exports = {
    type: process.env.TYPEORM_DRIVER_TYPE,
    url: process.env.DATABASE_URL,
    entities,
    logging: true,
    synchronize: false,
    migrations: [`db/migrations/*.${isJS ? 'js' : 'ts'}`],
    cli: {
        migrationsDir: 'db/migrations',
    },
    ...ssl,
};
