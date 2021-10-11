import {
  CountSchema, Filter, repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, HttpErrors,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Credentials
} from '../config/interface';
import {
  Articulo, Bodega, BodegaArticulo
} from '../models';
import {ArticuloRepository, BodegaArticuloRepository, BodegaRepository, RegistroLogRepository} from '../repositories';

export class BodegaArticuloController {
  constructor(
    @repository(BodegaRepository) protected bodegaRepository: BodegaRepository,
    @repository(BodegaArticuloRepository) protected BodegaArticuloRepository: BodegaArticuloRepository,
    @repository(RegistroLogRepository) protected RegistroLogRepository: RegistroLogRepository,
    @repository(ArticuloRepository) protected ArticuloRepository: ArticuloRepository,
  ) { }

  @get('/bodegas/{id}/articulos', {
    responses: {
      '200': {
        description: 'Array of Bodega has many Articulo through BodegaArticulo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Articulo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Articulo>,
  ): Promise<BodegaArticulo[]> {
    return this.BodegaArticuloRepository.find({where: {bodegaId: id}}, filter);
  }

  @post('/bodegas/{id}/articulos', {
    responses: {
      '200': {
        description: 'create a Articulo model instance',
        content: {'application/json': {schema: getModelSchemaRef(BodegaArticulo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Bodega.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BodegaArticulo, {
            title: 'NewArticuloInBodega',
            exclude: ['id', 'bodegaId'],
          }),
        },
      },
    }) bodegaArticulo: Omit<BodegaArticulo, 'id'>,
  ): Promise<BodegaArticulo> {
    if (bodegaArticulo.cantidad < 0) {
      throw new HttpErrors.BadRequest("La cantidad debe ser un numero positivo!")
    }
    const existencia = await this.BodegaArticuloRepository.findOne({
      where: {bodegaId: id, articuloId: bodegaArticulo.articuloId}
    })
    if (existencia) {
      throw new HttpErrors.BadGateway("No puede crear una entidad ya existente en la base de datos");
    } else {
      bodegaArticulo.bodegaId = id;
      return this.BodegaArticuloRepository.create(bodegaArticulo);
    }
  }

  @patch('/bodegas/{id}/articulos', {
    responses: {
      '200': {
        description: 'Bodega.Articulo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BodegaArticulo, {
            partial: true,
            exclude: ['id', 'bodegaId'],
          }),
        },
      },
    })
    bodegaArticulo: BodegaArticulo | any,
  ): Promise<void> {
    if (bodegaArticulo.cantidad < 0) {
      throw new HttpErrors.BadRequest("La cantidad no debe ser negativa.")
    }
    const idRepo = await this.BodegaArticuloRepository.findOne({where: {bodegaId: id, articuloId: bodegaArticulo.articuloId}})
    await this.BodegaArticuloRepository.updateById(idRepo?.id, bodegaArticulo);
  }



  @patch('/bodegas/transferir', {
    responses: {
      '200': {
        description: 'Bodega.Articulo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async transferir(
    @requestBody() credentials: Credentials
  ): Promise<void> {

    if (credentials.cantidad < 0) {
      throw new HttpErrors.BadRequest("La cantidad no debe ser negativa.");
    }
    console.log(credentials);

    const bodegaOrigen = await this.BodegaArticuloRepository.findOne({where: {bodegaId: credentials.bodegaOrigen, articuloId: credentials.articulo}});
    const bodegaDestino = await this.BodegaArticuloRepository.findOne({where: {bodegaId: credentials.bodegaDestino, articuloId: credentials.articulo}})

    if (bodegaOrigen && bodegaDestino) {
      if (credentials.cantidad > bodegaOrigen.cantidad) {
        throw new HttpErrors.BadRequest("La cantidad ingresada del articulo es mayor a la cantidad que posee la bodega de origen");
      }
      const cantidadTotalOrigen = bodegaOrigen.cantidad - credentials.cantidad;
      const cantidadTotalDestino = bodegaDestino.cantidad + credentials.cantidad;
      const nombreOrigen = await this.bodegaRepository.findOne({where: {id: bodegaOrigen.bodegaId}});
      const nombreDestino = await this.bodegaRepository.findOne({where: {id: bodegaDestino.bodegaId}});
      const nombreProd = await this.ArticuloRepository.findOne({where: {id: credentials.articulo}})
      bodegaOrigen.cantidad = cantidadTotalOrigen;
      bodegaDestino.cantidad = cantidadTotalDestino;

      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido);
      const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
      const registro = {
        fecha: hoy.toLocaleDateString(),
        hora: hora,
        bodegaOrigen: nombreOrigen?.nombre,
        bodegaDestino: nombreDestino?.nombre,
        producto: nombreProd?.nombre,
        numUnidades: credentials.cantidad
      }

      if (cantidadTotalOrigen == 0) {
        await this.BodegaArticuloRepository.deleteById(bodegaOrigen.id);
        await this.BodegaArticuloRepository.updateById(bodegaDestino.id, bodegaDestino);
        await this.RegistroLogRepository.create(registro);
      } else {
        await this.BodegaArticuloRepository.updateById(bodegaOrigen.id, bodegaOrigen);
        await this.BodegaArticuloRepository.updateById(bodegaDestino.id, bodegaDestino);
        await this.RegistroLogRepository.create(registro);
      }
    }
  }

}
