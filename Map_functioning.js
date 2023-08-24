class Area{
    constructor(name, link, marker){
        this.name = name;
        this.link = link;
        this.marker = marker;
    }

    goTo(){
        window.location.href = `${this.link}`;
    }

}

const map_MarshesQLG = document.getElementById("MarshesQLG");
const map_Eroph = document.getElementById("Eroph");
const map_Arctica_Incog = document.getElementById("Arctica_Incog");
const map_Leoric_Empire = document.getElementById("Leoric_Empire");
const map_Arcane_Isles = document.getElementById("Arcane_Isl");

const MarshesQLG = new Area("The Marshes of Quelaag", "loc_marshes_of_quelaag.html", map_MarshesQLG);
const Eroph = new Area("Eroph", "loc_eroph.html", map_Eroph);
const Arctica_Incog = new Area("Arctica Incognita", "loc_arctica_incog.html", map_Arctica_Incog);
const Leoric_Empire= new Area("Empire of Leoric", "loc_empire_of_leoric.html", map_Leoric_Empire);
const Arcane_Isles = new Area("The Arcane Isles", "loc_arcane_isles.html", map_Arcane_Isles);

let archzoom = 1; //always set this equal to whatever you've scaled your map to.
let zoom;

function ZoomOut(element) {
    let zoom = archzoom - 0.1;

    if(zoom < 1){
        console.log("You have zoomed out Maximally");
    }
    else{
        element.style.transform = `scale(${zoom}, ${zoom}) translate(0.05%, -0.15%)`;
        archzoom = zoom;
    }
}

function ZoomIn(element){
    let zoom = archzoom + 0.1;
    
    if(zoom < 3){
        element.style.transform = `scale(${zoom}, ${zoom}) translate(25%, 35%)`;
        archzoom = zoom;
    }
    else{
        console.log("You have maximally zoomed in.");
    }
}