import sendMessage from "../../sendMessage"
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

    for(let i = 0; i < pullsNumbers.length; i++){
        //Caso alguma revisão foi feita e precisa de alterações no código
        if(pullRevised[i][0].state == 'CHANGES_REQUESTED'){
            await sendMessage(`Pull Request: ${pulls[i].title} #${pullsNumbers[i]} Alteração de código solicitada.`)
        }
        //Caso não tenha sido marcado para niguem fazer as revisões e não tenha sido feita nenhuma revisão
        else if(pullReviewers[i][0] == null && pullRevised[i][0] == null){
            await sendMessage(`Pull Request: ${pulls[i].title} #${pullsNumbers[i]} Nenhum revisor selecionado.`)
        }
        //Caso tenha sido marcado para duas pessoas fazerem as revisões e não tenha sido feita nenhuma revisão
        else if(pullReviewers[i].length == 2 && pullRevised[i][0] == null){
            await sendMessage(`Pull Request: ${pulls[i].title} #${pullsNumbers[i]} Nenhuma revisão concluida.`)
        }
        //Caso uma pessoa não fez a revisão e uma tenha feito revisão
        else if(pullReviewers[i].length == 1 && pullRevised[i].length == 1){
            await sendMessage(`Pull Request: ${pulls[i].title} #${pullsNumbers[i]} Uma revisão de duas concluida.`)
        }
    }
}

export default checkReviewers;