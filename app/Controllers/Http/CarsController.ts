import {v4 as uuidv4} from 'uuid'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Car from 'App/Models/Car'

import  Application  from '@ioc:Adonis/Core/Application'

export default class CarsController {
  private validationOptions = {
    types: ['images'],
    size: '2mb',
  }


  public async store({request, response}: HttpContextContract) {

    const body = request.body()

    const image = request.file('image', this.validationOptions)

    if(image) {
      const imageName = `${uuidv4()}.${image.extname}`

      await image.move(Application.tmpPath('uploads'), {
        name: imageName
      })

      body.image = imageName
    }

    const car = await Car.create(body)

    response.status(201)

    return {
      message: "Momento criado com sucesso!",
      data: car,
    }
  }

  public async index() {
    const cars = await Car.all()

    return {
      data: cars,
    }
  }

  public async show({ params }: HttpContextContract) {
    const car = await Car.findOrFail(params.id)

    return {
      data: car,
    }
  }

  public async destroy({params}: HttpContextContract){
    const car = await Car.findOrFail(params.id)
    await car.delete()

    return {
      message: "Carro excluido com Sucesso!",
      data: car,
    }
  }

  public async update({params, request}: HttpContextContract){

    const body = request.body()

    const car = await Car.findOrFail(params.id)

    car.marca_nome = body.marca_nome

    car.nome_modelo = body.nome_modelo

    car.ano = body.ano

    car.combustivel = body.combustivel

    car.num_portas = body.num_portas

    car.valor_fipe = body.valor_fipe

    car.cor = body.cor

    if(car.image != body.image || !car.image) {
      const image = request.file('image', this.validationOptions)

      if (image) {
        const imageName = `${uuidv4()}.${image.extname}`

        await image.move(Application.tmpPath('uploads'), {
          name: imageName
        })

        car.image = imageName
        }
    }

    await car.save()

    return {
      message: 'Carro atualizado com sucesso!',
      data: car,
    }
  }
}
