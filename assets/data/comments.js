export const comments = [
    {
        commentId: 1,
        userId: 2,
        body: 'This is a post by userId 2',
        timestamp: Date.now() + 1,
        likes: [2],
        comments: [1,2,3,4,9]
    },
    {
        commentId: 2,
        userId: 1,
        body: 'This is a post by userId 1',
        timestamp: Date.now() + 2,
        likes: [3,4],
        comments: [3,4]
    },
    {
        postId: 3,
        userId: 2,
        body: 'This is another post by userId 2',
        timestamp: Date.now() + 3,
        likes: [1,2],
        comments: [1,2]
    },
    {
        postId: 4,
        userId: 3,
        body: 'This is a post by userId 3',
        timestamp: Date.now() + 4,
        likes: [4,5,6],
        comments: [1,2,3,4,9]
    }
]