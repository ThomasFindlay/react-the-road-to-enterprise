import Permission from '@/components/common/permission/Permission'
import { useState } from 'react'

type HomeProps = {}

const commentsData = [
  {
    id: '1',
    authorId: '1',
    message: 'I was posted by user 1, so I can be edited',
  },
  {
    id: '2',
    authorId: '2',
    message: "I was posted by user 2, so I can't be edited",
  },
  {
    id: '3',
    authorId: '1',
    message: 'I also was posted by user 1, so I can be edited',
  },
]

const Home = (props: HomeProps) => {
  const [comments, setComments] = useState(commentsData)

  return (
    <div className="max-w-[40rem] mx-auto">
      <h1 className="text-2xl font-bold my-4">Comments</h1>

      <div>
        {/* Determine if a user should have access to the comments section */}
        <Permission
          roles={['logged-in']}
          noAccess={<p>You must be logged in to see this content.</p>}
        >
          <div className="space-y-3">
            {comments.map((comment) => {
              return (
                <div
                  className="shadow border p-3 flex justify-between"
                  key={comment.id}
                >
                  <span>{comment.message}</span>
                  {/* Check if a user should be able to see Edit link */}
                  <Permission
                    roles={['owner', 'moderator', 'admin']}
                    entityOwnerId={comment.authorId}
                  >
                    <a>Edit</a>
                  </Permission>
                </div>
              )
            })}
          </div>
        </Permission>
      </div>
    </div>
  )
}

export default Home
