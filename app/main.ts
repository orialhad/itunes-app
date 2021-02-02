import {ApiController} from "./controllers/api-controller.js";
import {DomController} from "./controllers/dom-controller.js";

const
    apiController  = new ApiController(),
    domController = new DomController(apiController);

domController.onSearch = async searchTerm => {
    domController.clearSongList();
    let songs;
    try{
        domController.showLoader();

        songs = (await apiController.getResults(<string>searchTerm)).results;

    }
    catch (er) {
        console.log(`Error: `, er)
    }

    domController.hideLoader();

    if(songs.length){
        domController.renderPreview(songs[0]);
    }

    if(!songs.length){
        domController.notingLoaded();
    }


    domController.headingLoader(songs[28]);
    //console.log(`Main: `,songs[10]);

    songs.forEach(song=>domController.addSongToDom(song));
};






