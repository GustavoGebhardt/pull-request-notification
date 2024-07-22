import getPulls from "../getPulls"
require('dotenv').config()

async function checkReviewers(){
    const pulls: any = await getPulls()
    let pullsNumbers: string[] = []
    let pullReviewers: any[] = []
    let pullRevised: any[] = []

    for(let i = 0; i < pulls.length; i++){
        const number: string = pulls[i].url
        pullsNumbers.push(number.charAt(number.length-1))
        pullReviewers.push(pulls[i].requested_reviewers)
    }

    for(let i = 0; i < pullsNumbers.length; i++){
        const response = await fetch(`https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}/pulls/${pullsNumbers[i]}/reviews`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
            }
        })
        const returned = await response.json()
        pullRevised.push(returned)
    }

    console.log("pullsNumbers", pullsNumbers, "pullReviewers", pullReviewers, "pullRevised", pullRevised)

    for(let i = 0; i < pullsNumbers.length; i++){
        //Caso alguma revisão foi feita e precisa de alterações no código
        if(pullRevised[i][0].state == 'CHANGES_REQUESTED'){
            console.log("alteração no pr " + pullsNumbers[i])
        }
        //Caso não tenha sido marcado para niguem fazer as revisões e não tenha sido feita nenhuma revisão
        else if(pullReviewers[i][0] == null && pullRevised[i][0] == null){
            console.log("sem revisores e revisados " + pullsNumbers[i])
        }
        //Caso tenha sido marcado para duas pessoas fazerem as revisões e não tenha sido feita nenhuma revisão
        else if(pullReviewers[i].length == 2 && pullRevised[i][0] == null){
            console.log("com revisores e sem revisados " + pullsNumbers[i])
        }
        //Caso uma pessoa não fez a revisão e uma tenha feito revisão
        else if(pullReviewers[i].length == 1 && pullRevised[i].length == 1){
            console.log("com um revisor e um revisado " + pullsNumbers[i])
        }
    }
}

export default checkReviewers;