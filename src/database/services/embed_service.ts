import Embed, { EmbedDoc } from '../models/embed_model'

async function search(type: string, id: string): Promise<string | null> {
  const doc = await Embed.findOne({ type, id })
  return doc ? doc.embed : null
}

async function save(
  type: string,
  id: string,
  embed: string,
): Promise<EmbedDoc> {
  return new Embed({
    type,
    id,
    embed,
  }).save({ new: true })
}

export default {
  search,
  save,
}
