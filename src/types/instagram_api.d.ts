interface node {
  node: {
    __typename: 'GraphImage'
    id: string
    dimensions: { height: number; width: number }
    display_url: string
    display_resources: DisplayResource[]
    is_video: boolean
    should_log_client_event: boolean
    tracking_token: string
    edge_media_to_tagged_user: { edges: Tagged[] }
    edge_media_to_caption: { edges: Caption[] }
    shortcode: string
    edge_media_to_comment: {
      count: number
      page_info: PageInfo
      edges: Comment[]
    }
    comments_disabled: boolean
    taken_at_timestamp: number
    edge_media_preview_like: { count: number }
    gating_info: null
    media_preview: string
    owner: { id: string }
    thumbnail_src: string
    thumbnail_resources: DisplayResource[]
  }
}

interface IGUserPhotos {
  user: {
    edge_owner_to_timeline_media: {
      count: number
      page_info: PageInfo
      edges: node[]
    }
  }
}

interface DisplayResource {
  src: string
  config_width: number
  config_height: number
}

interface Caption {
  node: {
    text: string
  }
}

interface PageInfo {
  has_next_page: boolean
  end_cursor: string
}

interface Comment {
  node: {
    id: string
    text: string
    create_at: number
  }
}

interface Tagged {
  node: {
    user: {
      username: string
      id: string
    }
    x: number
    y: number
  }
}
