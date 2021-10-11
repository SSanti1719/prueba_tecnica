import {Entity, model, property} from '@loopback/repository';

@model()
export class RegistroLog extends Entity {
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
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;

  @property({
    type: 'string',
    required: true,
  })
  bodegaOrigen: string;

  @property({
    type: 'string',
    required: true,
  })
  bodegaDestino: string;

  @property({
    type: 'string',
    required: true,
  })
  producto: string;

  @property({
    type: 'number',
    required: true,
  })
  numUnidades: number;


  constructor(data?: Partial<RegistroLog>) {
    super(data);
  }
}

export interface RegistroLogRelations {
  // describe navigational properties here
}

export type RegistroLogWithRelations = RegistroLog & RegistroLogRelations;
