export const posts = [
    {
        postId: 1,
        body: 'This is a post by userId 2',
        timestamp: Date.now(),
        likes: [2,3],
        comments: [1,2,3,4]
    },
    {
        postId: 2,
        body: 'This is a post by userId 1',
        createdAt: Date.now() + 5,
        likes: [5,6],
        comments: [1,4]
    },
    {
        postId: 3,
        body: 'This is another post by userId 2',
        timestamp: Date.now() + 10,
        likes: [4,5,6],
        comments: [1,2,3,4,9]
    },
    {
        postId: 4,
        body: 'This is a post by userId 3',
        timestamp: Date.now() + 15,
        likes: [4,5,6],
        comments: [1,2,3,4,9]
    }
]