import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in dev mode and seeder is development
     * only
     */
    if (seeder.default.developmentOnly && !Application.inDev) {
      return
    }

    await new seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../Endereco'))
    await this.runSeeder(await import('../Consultorio'))
    await this.runSeeder(await import('../Usuario'))
    await this.runSeeder(await import('../Formulario'))
    await this.runSeeder(await import('../FormularioExameActigrafia'))
    
    // await this.runSeeder(await import('../Consulta'))
    await this.runSeeder(await import('../Exame'))
    // await this.runSeeder(await import('../ExameMarcado'))
  }
}
