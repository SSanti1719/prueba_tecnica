import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'prueba_tecnica',
  connector: 'mongodb',
  url: 'mongodb+srv://prueba_tecnica:8PfbchTtbvEQWR8l@cluster0.fdl8s.mongodb.net/test',
  host: 'cluster0.fdl8s.mongodb.net',
  port: 27017,
  user: 'prueba_tecnica',
  password: '8PfbchTtbvEQWR8l',
  database: 'prueba_tecnicaDB',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PruebaTecnicaDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'prueba_tecnica';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.prueba_tecnica', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
