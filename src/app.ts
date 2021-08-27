import commandLoader from './command_loader'
import * as database from './database'
import * as discord from './discord'
import * as instagram from './socials/instagram/instagram'
import * as timeouts from './timeouts'
import * as twitch from './twitch/twitch'

export async function start(): Promise<void> {
  await database.connect()
  await commandLoader.loadAllCommands()
  // await commandLoader.loadCommand('permissions')
  await discord.connect()
  // await timeouts.init()
  // twitch.startTimers()
  instagram.connect()
}

export async function stop(): Promise<void> {
  await instagram.disconnect()
  discord.disconnect()
  await database.disconnect()
}
