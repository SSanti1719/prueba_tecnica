import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PruebaTecnicaDataSource} from '../datasources';
import {BodegaArticulo, BodegaArticuloRelations} from '../models';

export class BodegaArticuloRepository extends DefaultCrudRepository<
  BodegaArticulo,
  typeof BodegaArticulo.prototype.id,
  BodegaArticuloRelations
> {


  constructor(
    @inject('datasources.prueba_tecnica') dataSource: PruebaTecnicaDataSource,
  ) {
    super(BodegaArticulo, dataSource);

  }
}
