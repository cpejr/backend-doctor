/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/

import Env from '@ioc:Adonis/Core/Env'
import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'
import cron from 'node-cron'
import monitor from './service/monitor'

sourceMapSupport.install({ handleUncaughtExceptions: false })

// Schedule the cron job
let cronExpression = '*/' +'https://cloud.bry.com.br '+ ' * * * *'
cron.schedule(cronExpression, function () {
  monitor()
})

// Start the AdonisJs server
new Ignitor(__dirname).httpServer().start()
