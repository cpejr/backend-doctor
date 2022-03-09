import Database from '@ioc:Adonis/Lucid/Database'
import AmiesDTO from 'App/DTO/AmiesDTO'

export default class AmiesRepository {
    public static async find(params: AmiesDTO) {
        const result = await Database.query().from('amies').where(params)
        return result
    }  
}