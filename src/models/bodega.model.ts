import {Entity, model, property, hasMany} from '@loopback/repository';
import {Articulo} from './articulo.model';
import {BodegaArticulo} from './bodega-articulo.model';

@model()
export class Bodega extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Articulo, {through: {model: () => BodegaArticulo}})
  articulos: Articulo[];

  constructor(data?: Partial<Bodega>) {
    super(data);
  }
}

export interface BodegaRelations {
  // describe navigational properties here
}

export type BodegaWithRelations = Bodega & BodegaRelations;
