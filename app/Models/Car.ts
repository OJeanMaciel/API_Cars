import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Car extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public marca_id: number

  @column()
  public marca_nome: string

  @column()
  public nome_modelo: number

  @column()
  public ano: number

  @column()
  public combustivel: string

  @column()
  public num_portas: number

  @column()
  public valor_fipe: number

  @column()
  public cor: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
