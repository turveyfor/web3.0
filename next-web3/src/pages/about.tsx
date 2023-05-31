 function About({posts}: any) {
    return(
        <div>{posts.name}</div>
    )
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/hello')
    const posts = await res.json()
    console.log('posts', posts)
    debugger;
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            posts,
        },
    }
}

 export default About
