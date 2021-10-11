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
import {RegistroLog} from '../models';
import {RegistroLogRepository} from '../repositories';

export class RegistrosLogController {
  constructor(
    @repository(RegistroLogRepository)
    public registroLogRepository : RegistroLogRepository,
  ) {}

  @post('/registro-logs')
  @response(200, {
    description: 'RegistroLog model instance',
    content: {'application/json': {schema: getModelSchemaRef(RegistroLog)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroLog, {
            title: 'NewRegistroLog',
            exclude: ['id'],
          }),
        },
      },
    })
    registroLog: Omit<RegistroLog, 'id'>,
  ): Promise<RegistroLog> {
    return this.registroLogRepository.create(registroLog);
  }

  @get('/registro-logs/count')
  @response(200, {
    description: 'RegistroLog model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RegistroLog) where?: Where<RegistroLog>,
  ): Promise<Count> {
    return this.registroLogRepository.count(where);
  }

  @get('/registro-logs')
  @response(200, {
    description: 'Array of RegistroLog model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RegistroLog, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RegistroLog) filter?: Filter<RegistroLog>,
  ): Promise<RegistroLog[]> {
    return this.registroLogRepository.find(filter);
  }

  @patch('/registro-logs')
  @response(200, {
    description: 'RegistroLog PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroLog, {partial: true}),
        },
      },
    })
    registroLog: RegistroLog,
    @param.where(RegistroLog) where?: Where<RegistroLog>,
  ): Promise<Count> {
    return this.registroLogRepository.updateAll(registroLog, where);
  }

  @get('/registro-logs/{id}')
  @response(200, {
    description: 'RegistroLog model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RegistroLog, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RegistroLog, {exclude: 'where'}) filter?: FilterExcludingWhere<RegistroLog>
  ): Promise<RegistroLog> {
    return this.registroLogRepository.findById(id, filter);
  }

  @patch('/registro-logs/{id}')
  @response(204, {
    description: 'RegistroLog PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroLog, {partial: true}),
        },
      },
    })
    registroLog: RegistroLog,
  ): Promise<void> {
    await this.registroLogRepository.updateById(id, registroLog);
  }

  @put('/registro-logs/{id}')
  @response(204, {
    description: 'RegistroLog PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() registroLog: RegistroLog,
  ): Promise<void> {
    await this.registroLogRepository.replaceById(id, registroLog);
  }

  @del('/registro-logs/{id}')
  @response(204, {
    description: 'RegistroLog DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.registroLogRepository.deleteById(id);
  }
}
