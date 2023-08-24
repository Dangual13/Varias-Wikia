//This first part only involves stuff regarding Searchbars
class Article{
    constructor(name, link) {
        this.name = name;
        this.link = link;
    }
}

//Underneath all articles inside of the wiki are defined.
//I prefixed _art to all Articles, because otherwise other properties would be accessed.

//main articles.
const art_Arcanite = new Article("Arcanite", "arcanite.html");
const art_Characters = new Article("Characters", "characters.html");
const art_History = new Article("History", "history.html");
const art_Map = new Article("Map", "map.html");
const art_Pantheon = new Article("Pantheon", "pantheon.html");
const art_Races = new Article("Races", "races.html");

//Antarian War Campaign Arcs
const art_cpgn_Antarianwar = new Article("The Antarian War (Campaign)", "cpgn_antarianwar.html");
const art_aw_arc1 = new Article("Act 1: Hornatia, Town of Heroes and Mysteries", "arc_aw_1.html");
const art_aw_arc2 = new Article("Act 2: The Long Road to Tyrhos", "arc_aw_2.html");
const art_aw_arc3 = new Article("Act 3: All aboard the Polaris!", "arc_aw_3.html");
const art_aw_arc4 = new Article("Act 4: The Hidden Citadel", "arc_aw_4.html");
const art_aw_arc5 = new Article("Act 5: [placeholder]", "arc_aw_5.html");

//Remnants of Tiangkong Campaign Arcs
const art_cpgn_Rot = new Article("Remnants of Tiangkong (Campaign)", "cpgn_rot.html");
const art_rot_arc1 = new Article("Act 1: Welcome to Weidan", "arc_rot_1.html");

//Locations - Continents
const art_loc_MarshesQLG = new Article("The Marshes of Quelaag", "loc_marshes_of_quelaag.html");
const art_loc_Eroph = new Article("Eroph", "loc_eroph.html");
const art_loc_Arcane_Isles = new Article("The Arcane Isles", "loc_arcane_isles.html");
const art_loc_Arctica_Incognita = new Article("Arctica Incognita", "loc_arctica_incog.html");
const art_loc_Leoric_Empire = new Article("The Empire of Leoric", "loc_empire_of_leoric.html");

//Locations - Eroph - Antaria - Cities
const art_loc_RaptusMagna = new Article("Raptus Magna", "loc_raptusmagna.html");

//Factions - Antaria
const art_fac_LancesOfSiez = new Article("Lances of Siez", "fac_lancesofsiez.html");

//Arcane Techniques
const art_SoulForging = new Article("Soul-forging", "soulforging.html");
const art_AetherTech = new Article("Aether-Tech", "aethertech.html");
const art_BrimstoneFireArms = new Article("Brimstone Firearms", "brimstonefirearms.html");

//this is an array containing all articles of the wiki, its basically the table of contents
let WikiContents = [art_AetherTech,
                    art_cpgn_Antarianwar,
                    art_loc_Arcane_Isles,
                    art_Arcanite, 
                    art_loc_Arctica_Incognita,
                    art_BrimstoneFireArms,
                    art_Characters, 
                    art_loc_Leoric_Empire,
                    art_loc_Eroph,
                    art_History, 
                    art_fac_LancesOfSiez,
                    art_Map,
                    art_loc_MarshesQLG,
                    art_Pantheon,
                    art_Races,
                    art_loc_RaptusMagna,
                    art_cpgn_Rot,
                    art_SoulForging,]

//Array defining the Antarian War Campaign with all its sessions
let AntarianWarCampaign = [art_aw_arc1,
                           art_aw_arc2,
                           art_aw_arc3,
                           art_aw_arc4,]

//Same for Remnants of Tiangkong campaign
let RoTCampaign = [art_rot_arc1,]
//this is the end of all the article bookkeeping stuff

//Define everything that has to do with the Searchbar and the results that show up underneath it.
const SearchCardTemplate = document.querySelector("[data-articleCard-template]"); //define what a searchcard is (the template)
const SearchWrapper = document.getElementById("SearchWrapper"); //define what the wrapper is
const SearchBar = document.getElementById("NavBarSearch"); //define what the searchbar is

//below three functions are for toggling visibility via events
function makeVisible(element) {
    element.style.visibility = "visible";
}
function makeHidden(element){
    element.style.visibility = "hidden";
}
//this one is exclusively for tabs.
function showHide(element, button){
    if(element.style.display == "block") {
        element.style.display = "none";
        button.src = "Images/UI/expandBtn.svg";
    }
    else{
        element.style.display = "block";
        button.src = "Images/UI/hideBtn.svg";
    }
}

//Below ensures working navbar.
function Navigate(){ //checks if the address of the webpage indicates an article being searched for, in case it indicates that an existing article is searched for that article is opened.
    let adress = window.location.href.toLowerCase().replaceAll("+", " ");
    if(adress.includes("?navsearchbar=")){
        WikiContents.forEach((Article) =>{
            if(adress.includes(`?navsearchbar=${Article.name.toLowerCase()}`)){
                window.location.href = Article.link;
            }
            else{}
        })
    }
    else{}
}
setInterval(Navigate, 50); //makes it so that every 50 milliseconds its being checked if a person has searched for an article.

//loop through each article in the wiki and create a searchcard for it
WikiContents.forEach((Article) => { 
    const SearchCard = SearchCardTemplate.content.cloneNode(true).children[0]; //make an instance of the searchcard template
    SearchCard.id = Article.name;
    SearchCard.innerHTML = `<a href = ${Article.link}>${Article.name}</a>`; //put the desired html in said searchcard
    SearchWrapper.append(SearchCard); //put the created searchcard into the wrapper
    return {name: Article.name, link: Article.link, element: SearchCard}
})

//Makes Article appear/disappear based on Searchbar Input
SearchBar.addEventListener("input", (searchInput) =>{
    const value = searchInput.target.value.toLowerCase();
    WikiContents.forEach((Article) => {
        let SearchCard = document.getElementById(Article.name); //Get the desired SearchCard pertaining to the element.
        const isVisible = Article.name.toLowerCase().includes(value); //Toggles the boolean isVisible based on whether or not the Name of the Article contains the input of the searchbar
        if(isVisible){ //if-else declaration making the Searchcard visible based on whether the user is searching for it or not.
            SearchCard.style.display = "block";
        }
        else{
            SearchCard.style.display = "none";
        }
    })
})

/*
    When no session logs were present on a page, an error would be thrown
    causing all code underneath to not be run, instead I put it in an error-handler
    which gives a simple console log message stating that no session logs are present
    so that the rest of the code can still execute.
*/
try{
    const CampaignoutlineItemTemplate = document.querySelector("[data-campaignoutline-listitem]");
    const AntarianWarStoryLog = document.getElementById("AntarianWarStoryLog");

    //fill Session log of Antarian War Campaign with Sessions
    AntarianWarCampaign.forEach((Article) => { 
        const Bulletpoint = CampaignoutlineItemTemplate.content.cloneNode(true).children[0]; //make an instance of the searchcard template
        Bulletpoint.id = Article.name;
        Bulletpoint.innerHTML = `<a href = ${Article.link}>${Article.name}</a>`; //put the desired html in said searchcard
        AntarianWarStoryLog.append(Bulletpoint); //put the created searchcard into the wrapper
    })

    //fill Story log of Remnants of Tiangkong Campaign with Story
    const RoTStoryLog = document.getElementById("RoTStoryLog");
    RoTCampaign.forEach((Article) => { 
        const Bulletpoint = CampaignoutlineItemTemplate.content.cloneNode(true).children[0]; //make an instance of the searchcard template
        Bulletpoint.id = Article.name;
        Bulletpoint.innerHTML = `<a href = ${Article.link}>${Article.name}</a>`; //put the desired html in said searchcard
        RoTStoryLog.append(Bulletpoint); //put the created searchcard into the wrapper
    })
}
catch(e){
    console.log("No Campaign Story Logs present on this page. If this shouldn't be the case check your HTML.");
}

//underlying code allows working table of contents
const TableOfContents = document.getElementById("ToC");
const Subtopics = document.getElementsByTagName("h1");
const TOCLinkTemplate = document.querySelector("[data-toc-link");
let i; //predifine i so that it can be used within the for-loop

if(TableOfContents == null){
    console.log("No Table of Contents Present")
}
else if(Subtopics == null){
    console.log("No need for Table of Contents");
    TableOfContents.style.display = "none"; //make sure that an empty table of content disappears.
}
else{
    for(let i = 1; i++; i > Subtopics.length){ //can't do anonymous function this time due to a for-loop
        const ToCLink = TOCLinkTemplate.content.cloneNode(true).children[0]; //Clone the Template
        ToCLink.id = Subtopics[i-2].id.replaceAll("_", " "); //The replace all is to make the end-result prettier (actual spaces instead of separation by _)
        ToCLink.innerHTML = `<ul><a href = #${Subtopics[i-2].id}>${ToCLink.id}</a><ul>` //fill the HTML
        TableOfContents.append(ToCLink); //Append the newly generated link to the actual Table of Contents

        /*
            Code above uses i-2 instead of just i because it would skip the first 2 items of the HTMLCollection. Sadly I can't start iterating over i = 0 for some reason
            (maybe because null values can't be passed to children of HTMLCollections).
        */
    }
}
