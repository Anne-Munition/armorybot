import express from 'express'
import Embed from '../../database/services/embed_service'
import path from 'path'

const router = express.Router()

router.get('/twitter/:id', async (req, res, next) => {
  try {
    const file = path.join(__dirname, '../views', `twitter.pug`)
    // const embed = await Embed.search(req.params.type, req.params.id)
    res.render(file, {
      username: 'AnneMunition',
      video:
        'https://video.twimg.com/amplify_video/1422014222003707906/vid/480x270/oFlmboEM02NxYcci.mp4?tag=14',
      image:
        'http://pbs.twimg.com/amplify_video_thumb/1422014222003707906/img/Nt0zxeAoF4ulvnoe.jpg',
      color: '#eeec1d',
      description:
        'I had so much fun playing It Takes Two yesterday with Fromage - we&#39;ll finish the rest of it tomorrow! 😂',
    })
  } catch (err) {
    next(err)
  }
})

router.get('/tiktok/:id', async (req, res, next) => {
  try {
    const file = path.join(__dirname, '../views', `tiktok.pug`)
    // const embed = await Embed.search(req.params.type, req.params.id)
    res.render(file, {
      username: 'AnneMunition',
      video:
        'https://video.twimg.com/amplify_video/1422014222003707906/vid/480x270/oFlmboEM02NxYcci.mp4?tag=14',
      image:
        'http://pbs.twimg.com/amplify_video_thumb/1422014222003707906/img/Nt0zxeAoF4ulvnoe.jpg',
      color: '#eeec1d',
    })
  } catch (err) {
    next(err)
  }
})

export default router
