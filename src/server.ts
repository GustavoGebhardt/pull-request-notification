import checkReviewers from "./gitHub/checkReviewers";
require('dotenv').config()

checkReviewers()
setInterval(() => {checkReviewers()}, parseInt(process.env.EXECUTION_INTERVAL!) * 3600000) //Multiplica o valor em 1 hora 3600000