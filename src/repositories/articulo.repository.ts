import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PruebaTecnicaDataSource} from '../datasources';
import {Articulo, ArticuloRelations} from '../models';

export class ArticuloRepository extends DefaultCrudRepository<
  Articulo,
  typeof Articulo.prototype.id,
  ArticuloRelations
> {


  constructor(
    @inject('datasources.prueba_tecnica') dataSource: PruebaTecnicaDataSource,
  ) {
    super(Articulo, dataSource);

  }
}
