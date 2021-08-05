import axios from 'axios'
import Discord from 'discord.js'
import Embed from '../database/services/embed_service'
import client from '../discord'

const TikTokScraper = require('tiktok-scraper')

export default async function () {
  console.log('getting tiktoks')
  try {
    const posts = await TikTokScraper.user('annemunition', {
      number: 1,
    })
    console.log(`got ${posts.collector.length} tiktok posts`)
    console.log('check database for existing entry')
    const existing = await Embed.search('tiktok', posts.collector[0].id)
    if (!existing) {
      console.log('existing entry not found')
      const html = await axios
        .get(
          `https://www.tiktok.com/oembed?url=${posts.collector[0].webVideoUrl}`,
        )
        .then(({ data }) => data.html)
      const newDoc = await Embed.save('tiktok', posts.collector[0].id, '')
      console.log(newDoc)
    }
    const channel = client.channels.cache.get('872903342928584714')
    await channel.send(
      `${process.env.URL}/embed/tiktok/${posts.collector[0].id}`,
    )
  } catch (error) {
    console.log(error)
  }
}
