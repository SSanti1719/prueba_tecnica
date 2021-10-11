import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Bodega} from '../models';
import {BodegaRepository} from '../repositories';

export class BodegaController {
  constructor(
    @repository(BodegaRepository)
    public bodegaRepository : BodegaRepository,
  ) {}

  @post('/bodegas')
  @response(200, {
    description: 'Bodega model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bodega)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bodega, {
            title: 'NewBodega',
            exclude: ['id'],
          }),
        },
      },
    })
    bodega: Omit<Bodega, 'id'>,
  ): Promise<Bodega> {
    return this.bodegaRepository.create(bodega);
  }

  @get('/bodegas/count')
  @response(200, {
    description: 'Bodega model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Bodega) where?: Where<Bodega>,
  ): Promise<Count> {
    return this.bodegaRepository.count(where);
  }

  @get('/bodegas')
  @response(200, {
    description: 'Array of Bodega model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bodega, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Bodega) filter?: Filter<Bodega>,
  ): Promise<Bodega[]> {
    return this.bodegaRepository.find(filter);
  }

  @patch('/bodegas')
  @response(200, {
    description: 'Bodega PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bodega, {partial: true}),
        },
      },
    })
    bodega: Bodega,
    @param.where(Bodega) where?: Where<Bodega>,
  ): Promise<Count> {
    return this.bodegaRepository.updateAll(bodega, where);
  }

  @get('/bodegas/{id}')
  @response(200, {
    description: 'Bodega model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bodega, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Bodega, {exclude: 'where'}) filter?: FilterExcludingWhere<Bodega>
  ): Promise<Bodega> {
    return this.bodegaRepository.findById(id, filter);
  }

  @patch('/bodegas/{id}')
  @response(204, {
    description: 'Bodega PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bodega, {partial: true}),
        },
      },
    })
    bodega: Bodega,
  ): Promise<void> {
    await this.bodegaRepository.updateById(id, bodega);
  }

  @put('/bodegas/{id}')
  @response(204, {
    description: 'Bodega PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bodega: Bodega,
  ): Promise<void> {
    await this.bodegaRepository.replaceById(id, bodega);
  }

  @del('/bodegas/{id}')
  @response(204, {
    description: 'Bodega DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bodegaRepository.deleteById(id);
  }
}
