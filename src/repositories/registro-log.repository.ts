import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PruebaTecnicaDataSource} from '../datasources';
import {RegistroLog, RegistroLogRelations} from '../models';

export class RegistroLogRepository extends DefaultCrudRepository<
  RegistroLog,
  typeof RegistroLog.prototype.id,
  RegistroLogRelations
> {
  constructor(
    @inject('datasources.prueba_tecnica') dataSource: PruebaTecnicaDataSource,
  ) {
    super(RegistroLog, dataSource);
  }
}
