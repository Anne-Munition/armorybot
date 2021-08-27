import Discord from 'discord.js'
import Instagram from 'instagram-web-api'
import discordClient from '../../discord'
import log from '../../logger'

let lastIds: string[] = []

const client = new Instagram({
  username: process.env.IG_USERNAME,
  password: process.env.IG_PASSWORD,
})

export function connect(): void {
  if (!process.env.IG_USERNAME || !process.env.IG_PASSWORD) {
    log.warn('Missing IG credentials.')
    return
  }
  client
    .login()
    .then(async () => {
      log.debug('connected to instagram')
      const posts = await getRecentPosts('annemunition')
      lastIds = getIds(posts)
      lastIds.splice(3, 1)
      setInterval(pollIG, 1000 * 60 * 5)
    })
    .catch((err: Error) => {
      log.error(err.message)
      setTimeout(connect, 1000 * 60 * 5)
    })
}

function getIds(posts: node[]): string[] {
  return posts.map((x) => x.node.id)
}

async function getRecentPosts(username: string): Promise<node[]> {
  const response: IGUserPhotos = await client.getPhotosByUsername({
    username,
    first: 10,
  })
  return response.user.edge_owner_to_timeline_media.edges
}

async function pollIG(): Promise<void> {
  log.debug('polling instagram')
  const posts = await getRecentPosts('annemunition')
  const ids = getIds(posts)
  posts.forEach((post) => {
    if (lastIds.includes(post.node.id)) return
    postToDiscord(post)
  })
  lastIds = ids
}

function postToDiscord(post: node): void {
  const channel = discordClient.channels.cache.get(
    '880873358781206568',
  ) as Discord.GuildChannel
  if (!channel || !channel.isText()) return
  const url = `https://instagram.com/p/${post.node.shortcode}/`
  log.info(`New IG post: ${url}`)
  const caption = post.node.edge_media_to_caption.edges[0]
  const embed = new Discord.MessageEmbed()
    .setAuthor(
      'annemunition',
      'https://images-ext-1.discordapp.net/external/MaJAOppYRhPTjWKbD4eGOtOUAPQm-VZg-wPKMOWXN_M/%3F_nc_ht%3Dscontent-iad3-1.cdninstagram.com%26_nc_ohc%3Do9dow59ohS4AX8Jd73r%26edm%3DAJBgZrYBAAAA%26ccb%3D7-4%26oh%3D57fba2904a09ec513d5a6e6790e999eb%26oe%3D612F25F1%26_nc_sid%3D78c662/https/scontent-iad3-1.cdninstagram.com/v/t51.2885-19/s150x150/75601582_434201367494638_4620308251173453824_n.jpg',
      'https://instagram.com/annemunition/',
    )
    .setColor('#cf0071')
    .setImage(post.node.display_url)
    .setFooter(
      'Instagram',
      'https://images-ext-2.discordapp.net/external/C6jCIKlXguRhfmSp6USkbWsS11fnsbBgMXiclR2R4ps/https/www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png',
    )
  if (caption) {
    let captionText = caption.node.text
    post.node.edge_media_to_tagged_user.edges.forEach((tag) => {
      const name = tag.node.user.username
      const r = new RegExp(`@${name}`)
      captionText = captionText.replace(
        r,
        `[@${name}](https://instagram.com/${name}/)`,
      )
    })
    embed.setDescription(captionText)
  }
  channel.send({ content: `<${url}>`, embeds: [embed] })
}

export async function disconnect(): Promise<void> {
  await client.logout().catch(() => {
    // Do nothing
  })
}
