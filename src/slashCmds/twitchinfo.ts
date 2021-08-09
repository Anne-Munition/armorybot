import * as twitch from '../twitch/twitch_api'
import { capitalize, displayName } from '../utilities'

export const info: SlashInfo = {
  global: false,
  guilds: [
    '84764735832068096', // Armory
    '140025699867164673', // DBKynd
  ],
}

export const permissions: SlashPerms = [
  {
    id: '84778943529365504', // Moderators - Armory
    type: 'ROLE',
    permission: true,
  },
  {
    id: '140025967044198400', // Moderators - DBKynd
    type: 'ROLE',
    permission: true,
  },
]

export const commandData: SlashData = {
  name: 'twitchinfo',
  defaultPermission: false,
  description: 'Get the subscription status of a Twitch viewer by name or id.',
  options: [
    {
      name: 'viewer',
      type: 'STRING',
      description: 'Twitch user login or ID.',
      required: true,
    },
  ],
}

export const run: SlashRun = async (interaction): Promise<void> => {
  await interaction.deferReply()
  const viewer = interaction.options.getString('viewer', true)
  const [user] = await twitch.getUsers([viewer])
  if (!user) {
    await interaction.editReply(
      `The Twitch channel **${viewer}** does not exist.`,
    )
    return
  }
  const subscription = await twitch.getSubscription(user.id)

  const name = displayName(user)
  const sub = `\nSubscribed: **${Boolean(subscription.length)}**`
  let str = /^\d+$/.test(viewer)
    ? `${user.id} => **${name}**`
    : `${name} => **${user.id}**`
  if (user.broadcaster_type) {
    const type = `\n${capitalize(user.broadcaster_type)}`
    str += type
  }
  str += sub
  await interaction.editReply(str)
}
