export default function IDtoObject(id, x, y) {
    const idToSprite = {
        0: "grass",
        1: "flower1",
        2: "flower2",
        3: "foliage1",
        4: "foliage2",
        5: "foliage3",
        9: "cliffinsidetr",
        10: "cliffb",
        11: "cliffbl",
        12: "cliffbr",
        13: "cliffl",
        14: "cliffr",
        15: "clifft",
        16: "clifftl",
        17: "clifftr",
        18: "cliffedgel",
        19: "cliffedger",
        20: "water",
        21: "coastt",
        22: "coasttl",
        23: "coasttr",
        24: "coastedgetl",
        25: "coastedgetr",
        26: "laketl",
        27: "laketr",
        28: "lakebl",
        29: "lakebr",
        30: "roadu",
        31: "roadd",
        32: "roadl",
        33: "roadr",
        34: "roadud",
        35: "roadul",
        36: "roadur",
        37: "roaddl",
        38: "roaddr",
        39: "roadlr",
        40: "roadudl",
        41: "roadudr",
        42: "roadulr",
        43: "roaddlr",
        44: "roadudlr",
        50: "housetl",
        51: "housetr",
        52: "housebl",
        53: "housebr",
        60: "bakerytl",
        61: "bakerytr",
        62: "bakerybl",
        63: "bakerybr",
        70: "blacksmithtl",
        71: "blacksmithtr",
        72: "blacksmithbl",
        73: "blacksmithbr",
        80: "farmtl",
        81: "farmtr",
        82: "farmbl",
        83: "farmbr",
        90: "schooltl",
        91: "schooltr",
        92: "schoolbl",
        93: "schoolbr",
        100: "well",
        110: "tree1",
        111: "tree2"
    }
    let idObj = {
        SPRITE: idToSprite[id],
        BUILDABLE: false,
        DESTROYABLE: true,
        POSITION: [x, y], //mainly just for debugging
        RELATEDTILES: [[x, y]]
    }
    if (!idObj.SPRITE)
    {
        idObj.SPRITE = "siopao"
        return idObj
    }
        
    if (id <= 5)
        idObj.BUILDABLE = true
    if (id <= 29)
        idObj.DESTROYABLE = false
    
    if (id >= 50 && id <= 99) //ID's for 2x2 buildings, this code gets the three other tiles related to it
    {
        let [xOff, yOff] = ([[1, 1], [-1, 1], [1, -1], [-1, -1]])[id % 10] //in order of tl, tr, bl, br, gets the x and y offsets corresponding to that location to get other locations
        idObj.RELATEDTILES = [[x, y], [x + xOff, y], [x, y + yOff], [x + xOff, y + yOff]] //gets all possible combinations of x and y with or without offset, resulting in all other tiles
    }
    return idObj

}