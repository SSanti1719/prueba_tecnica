import {Entity, model, property} from '@loopback/repository';

@model()
export class BodegaArticulo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'string',
  })
  bodegaId?: string;

  @property({
    type: 'string',
  })
  articuloId?: string;

  constructor(data?: Partial<BodegaArticulo>) {
    super(data);
  }
}

export interface BodegaArticuloRelations {
  // describe navigational properties here
}

export type BodegaArticuloWithRelations = BodegaArticulo & BodegaArticuloRelations;
