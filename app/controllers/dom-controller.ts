import {SongResult} from "../../types/interfaces/itunes-api-result.js";
import {ApiController} from "./api-controller.js";


export class DomController {
    artistTitle: JQuery;
    container: JQuery;
    buttonInput: JQuery;
    searchInput: JQuery;
    gridListButton: JQuery;
    previewPane: JQuery;
    loader: JQuery;
    //songDiv: JQuery;

    onSearch: (search: string) => void;

    constructor(public apiCtrl: ApiController) {
        window[`domCtrl`] = this;

        this.container = $(`#results-container`);
        this.buttonInput = $(`#searchButton`);
        this.searchInput = $(`#searchInput`);
        this.artistTitle = $(`#artist-title`);
        this.gridListButton = $(`#grid-List`);
        this.previewPane = $(`#preview-pane`);
        this.loader = $('#loader');
        // this.songDiv = $(`.song-div`);

        this.buttonInput.click(() => this.onSearchClick());
        // this.searchInput.keyup((ev) => {
        //     this.onSearchClick()
        // });
        this.searchInput.on(`keyup`, (ev) => {
            if (ev.key === `Enter`) {
                this.onSearchClick()
            }
        });

        this.gridListButton.click(() => {
            this.container.toggleClass(`listView`)
            this.previewPane.toggleClass(`listView`)

        });


    }

    private onSearchClick() {
        const searchTerm = this.searchInput.val();
        console.log(searchTerm);
        if (!searchTerm) {
            return
        }
        if (typeof this.onSearch === `function`) {
            this.onSearch(<string>searchTerm)
        }


    }
    headingLoader(song: SongResult):void{

        const heading = `<h1 id="searchTitle">${song.artistName}</h1>`
        console.log(`dom: `,song.artistName)
        this.artistTitle.html(heading);

    }

    addSongToDom(song: SongResult): void {
        //console.log(song);

        let
            shotTrackName = song.trackName.substring(0, 17),
            shotAlbumName = song.collectionName.substring(0,19);



        const div = $(`
                    <div class="song-div">
                            <div class="name-wrapper">
                                 <div class="trackName">
                                     ${shotTrackName}${shotTrackName.length < song.trackName.length ? "..." : ""} 
                                </div>
                                <div class="trackNameHidden">
                                     ${song.trackName} 
                                </div>
                            </div>
                            
                            <div class="album-wrapper">
                                <div class="albumName">
                                    ${shotAlbumName}${shotAlbumName.length < song.collectionName.length ? "..." : ""}
                                </div>
                                <div class="albumNameHidden">
                                     ${song.collectionName}
                                </div>
                            </div>
                    </div>    
                   `)
            .click(() => {
                this.renderPreview(song);
                this.activeClass();
            });

        this.container.append(div);
        this.searchInput.val(``);

    }

    clearSongList() {
        this.container.empty()

    }

    renderPreview(song: SongResult) {
        let objectYear = song.releaseDate;
        let stringYear = objectYear.toString();
        stringYear = stringYear.substring(0, 4);


        this.previewPane
            .empty()
            .append(`
                    
                <div class="preview-container">
                    
                    <div class="preview-track">
                        ${song.trackName}
                    </div>
                    <div class="preview-artist">
                         ${song.artistName}  
                    </div> 
                     <div class="preview-track-number">
                        Track No. ${song.trackNumber}
                    </div>
                    
                    <div class="preview-album">
                        ${song.collectionName} <br>${stringYear}
                    </div>
                    
                   
                    
                    <div class="preview-art">
                        <img src="${song.artworkUrl100} " class="artwork">
                    </div>
                    
                    <div class="preview-audio">
                               <audio
                                preload="auto"
                                controls
                                type="audio/x-m4a"
                                src="${song.previewUrl}"
                            </div>
                </div>
                
            `);


    }
    showLoader(){
        this.loader.addClass("show")
    }
    hideLoader(){
        this.loader.removeClass("show")
    }

    notingLoaded(){
        const error = `<h1 id="searchTitle">No results found</h1>`
        this.artistTitle.html(error);
        this.previewPane.empty();
    }

    activeClass(){
        // console.log(`add class:`,$(`song-div`);
        $(`song-div`).addClass(`active`);

    }
}

