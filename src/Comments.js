import React from 'react'

function Comments({username, commentText}) {
  return (
    <div>
        <b>{username}</b> {commentText}
    </div>
  )
}

export default Comments