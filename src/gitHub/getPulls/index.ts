require('dotenv').config()

async function getPulls(){
    const response = await fetch(`https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}/pulls`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
        }
    })
    const returned = await response.json()
    return await returned
}

export default getPulls;