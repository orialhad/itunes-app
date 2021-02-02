import {ItunesApiResult} from "../../types/interfaces/itunes-api-result.js";

const URL = `https://itunes.apple.com/search?term=`

export class ApiController {
    async getResults(search: string): Promise<ItunesApiResult> {

        let results: ItunesApiResult = await (await fetch(URL + search + `&limit=200`)).json();
        results.results.sort((a, b) => {
            return(a.trackNumber-b.trackNumber)
        });
        results.results.sort((a, b) => {
            return (a.collectionName < b.collectionName) ? -1 : (a.collectionName === b.collectionName) ? 0 : 1
        });



        return results

    }
}



//