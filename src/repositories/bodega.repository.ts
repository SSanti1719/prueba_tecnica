import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {PruebaTecnicaDataSource} from '../datasources';
import {Articulo, Bodega, BodegaArticulo, BodegaRelations} from '../models';
import {ArticuloRepository} from './articulo.repository';
import {BodegaArticuloRepository} from './bodegaArticulo.repository';

export class BodegaRepository extends DefaultCrudRepository<
  Bodega,
  typeof Bodega.prototype.id,
  BodegaRelations
> {

  public readonly articulos: HasManyThroughRepositoryFactory<Articulo, typeof Articulo.prototype.id,
    BodegaArticulo,
    typeof Bodega.prototype.id
  >;

  constructor(
    @inject('datasources.prueba_tecnica') dataSource: PruebaTecnicaDataSource, @repository.getter('BodegaArticuloRepository') protected bodegaArticuloRepositoryGetter: Getter<BodegaArticuloRepository>, @repository.getter('ArticuloRepository') protected articuloRepositoryGetter: Getter<ArticuloRepository>,
  ) {
    super(Bodega, dataSource);
    this.articulos = this.createHasManyThroughRepositoryFactoryFor('articulos', articuloRepositoryGetter, bodegaArticuloRepositoryGetter,);
    this.registerInclusionResolver('articulos', this.articulos.inclusionResolver);


  }
}
