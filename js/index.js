var app;
var vp;
//escape quotes 3 times and newlines twice
var data_json = '{"_blockspring_spec":true,"_errors":[],"data":[{"name":"Abby Fifer-Mandell","image":"Abby_Fifer_Mandell.png","text":"\\\"Giving ourselves criteria is often what we need to give ourselves options.\\\" \\n\\n\\\"So you want to be an entrepreneur? Go to soul cycle or rock climbing first.\\\"","x":400,"y":900},{"name":"Adlai Wertman","image":"Adlai_Wertman.png","text":"\\\"I dare you to get bored and take the time to find a head heart balance. Get quiet.\\\"","x":400,"y":400},{"name":"Alicia Keys","image":"Alicia_Keys.png","text":"\\\"Hollywood is glamorous in the way that all facades are.\\\"","x":900,"y":350},{"name":"Brie Larson","image":"Brie_Larson.png","text":"Brie’s decision to go into acting was all based on a gut instinct at 6. She shared with the class that everyone is called to a path, one you discover by following those \\\"I got to do that\\\" moments. You’ll find out why later. She pushed us asking, \\\"What does it look like to live up to your potential?\\\"\\n\\n\\\"Be interested in your life. Question everything and collect the data.\\\"\\n","x":600,"y":600},{"name":"Carmen Lee","image":"Carmen_Lee.png","text":"From an intern application I wrote: \\\"Professor Carmen Lee is a real-life superhero; no cape necessary. Professor Lee saves the world with her thoughtful syllabus, kind understanding, and tenacious pursuit of excellence. An expert in communication, she provides all of the class information in the clearest way possible- not just for me, but for every kind of learner: for those who need visuals to understand and for those who physically cannot make it to class consistently. From the start of class, she is clear about her high expectations for us, but she provides every possibility for her students to exceed them if they put the work in. Now forced to conduct her class in a new way, she has completely adapted the course. It fits the same goals as before, but accounts for students who may not have consistent wifi or for those now on the opposite side of the world. Professor Carmen Lee is a hero for empowering her students with information and tools to succeed while demanding excellence.\\\"","x":300,"y":100},{"name":"Dr. Allissa Richardson","image":"Dr_Alissa_Richardson.png","text":"Allissa just released a book, \\\"Bearing Witness While Black.\\\" Her research focuses on how marginalized communities use mobile and social media to produce new forms of journalism. Her most recent book could not have come out at a more pertinent time-- in it she explores 15 journalist-activists who document the BLM movement using only their phones. During my time in her class, Ethics in Media, she led us through the many challenges our society is facing. With only seven in the class our dicussions were in-depth and I appreciate how she encouraged us to address these issues head on, while also teaching strategy to do so.","x":500,"y":200},{"name":"Dr. Stacy L Smith","image":"Dr_Stacy_L_Smith.png","text":"\\\"Find what you love and become an expert on it\\\"","x":600,"y":200},{"name":"Rena Ronson","image":"Rena_Ronson.png","text":"I met Rena near the beginning of my time at USC, a season of personal transition and uncertainty about what major to pursue. She encouraged me that one’s major doesn’t really matter as much as your ability to learn as you go. Even after only meeting with me once, she introduced me to several others in entertainment. I left our conversation feeling empowered and encouraged by her warm presence.","x":700,"y":200},{"name":"Shabnam Mogharadi","image":"Shabnam_Mogharadi.png","text":"\\\"Few things have the power like religion.\\\"\\n\\nAdvice to undergrads:\\nDo a semester abroad\\nDo as many internships from as many different sides within your field of interest as possible\\nLearn hard, specific, tactile skills; the soft you can learn later","x":1000,"y":1000},{"name":"Shilla Kim-Parker","image":"Shilla_Kim-Parker.png","text":"For a college grad: \\\"Just experiment with so many things.\\\"\\n\\nAt the time we met Shilla was working on Thrilling on the side and was a Chief of Staff at Disney. In her experience, it’s a dream job if you work well with the executive; her boss brought her with them, making her their right hand, allowing her to work on HR, creative, and communications. \\n\\nI introduced Shilla to my high school friend who now works for her. I asked Kenzie about what she’s learned from Shilla: \\\"One of my favorite things that she’s taught me is how to lead with kindness and how important it is to actually listen to people when they bring up issues and then follow through with a solution. She is an exceptional boss and human.\\\"","x":1000,"y":800},{"name":"Cara Espocito","image":"Cara_Esposito.png","text":null,"x":700,"y":500},{"name":"Chimamanda Ngozi Adiche","image":"Chimamanda_Ngozi_Adiche.png","text":null,"x":400,"y":200}]}';
var obj = JSON.parse(data_json);
var data = obj.data;
var NUM_PEOPLE = data.length;
var nameToTextbox = {}; //map from name to generated textbox
var activeName = null;

PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;
// PIXI.settings.ROUND_PIXELS = true;

//return power of two mipmapped texture
// function getMipmappedTexture(texture) {  
//     var canvas = document.createElement("canvas"),
//         context = canvas.getContext("2d"),
//         bt = texture.baseTexture;
    
//     bt.update();  
    
//     canvas.width = PIXI.utils.nextPow2(bt.width);
//     canvas.height = PIXI.utils.nextPow2(bt.height);
//     context.drawImage(bt.resource.source, 0, 0);
    
//     var newBaseTexture = new PIXI.BaseTexture(canvas, PIXI.SCALE_MODES.LINEAR);  
//     newBaseTexture.mipmap = true;
//     var newTexture = new PIXI.Texture(newBaseTexture);
//     newTexture.frame = new PIXI.Rectangle(0, 0, bt.width, bt.height);
//     return newTexture;
// }

var body = document.getElementById("main");
//no antialiasing (wasn't doing anything)
app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, backgroundColor: 0xfff3c9, resolution: window.devicePixelRatio});
// var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xfff3c9, resolution: window.devicePixelRatio});
// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
// PIXI.settings.MIPMAP_TEXTURES = PIXI.MIPMAP_MODES.ON;

body.appendChild(app.view);

//create the main viewport
vp = new Viewport.Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: 2000,
    worldHeight: 2000,

    interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
});
//configure plaza boundaries
vp.clampZoom({minWidth: 400, minHeight: 400, maxWidth: 3500, maxHeight: 3500});
// vp.clamp({left: -2000, right: 2000, top: -2000, bottom: 2000});

// add the viewport to the stage
app.stage.addChild(vp)
// app.stage.sortableChildren = true;
// activate plugins

//enable vp 
vp
    .drag()
    .pinch()
    .wheel()
    .decelerate()



//preload assets
app.loader.baseUrl = "images";
//could parse from text file in the future

for (let i = 0; i < NUM_PEOPLE; i++){
    app.loader.add(data[i].image);
}
app.loader.add("background.png"); //add background image!


app.loader.onProgress.add(showProgress);
app.loader.onComplete.add(doneLoading);
app.loader.onError.add(showError);

app.loader.load();


function showProgress(e) {
    console.log(e.progress);
}

function showError(e) {
    console.error("ERROR: " + e.message);
}

function doneLoading(e) {
    console.log("Done loading!");
    plaza();
}

function makeTextboxes(){
    //returns a container with all generated textboxes
    var textGroup = new  PIXI.Container();

    for (let i = 0; i < NUM_PEOPLE; i++) {
        var textbox = generateTextbox(data[i]);
        textbox.visible = 0;
        nameToTextbox[data[i].name] = textbox;
        textGroup.addChild(textbox);
    }

    return textGroup;
}


function generateTextbox(person){
    const HEIGHT = 200;
    const WIDTH = 250;
    var name = person.name; //for now
    var text = person.text;
    
    var scrollboxSettings = {boxWidth: WIDTH, boxHeight: HEIGHT, overflowX: 'none', dragScroll: true }
    const scrollbox = new Scrollbox.Scrollbox(scrollboxSettings);
    scrollbox.position.set(person.x+40, person.y)
    scrollbox.sortableChildren = true;

    // var textSettings = new Pixi.TextStyle({fontFamily : 'Arial', fontSize: 12,  align : 'left', wordWrap: true, wordWrapWidth: WIDTH - scrollbox.scrollbarSize - 4});
    const textSettings = new PIXI.TextStyle({
        fontFamily: "Comic Sans MS",
        fontSize: 12,
        fill: 0x333333,
        alight: 'left',
        wordWrap: true,
        wordWrapWidth: WIDTH - scrollbox.scrollbarSize - 4
    });


    // add text body to the scrollbox's content
    const textSprite = new PIXI.Text(text, textSettings)
    // scrollbox.beginFill(0xff0000, 0.25).drawRect(0,0,WIDTH,textSprite.height)
    background = scrollbox.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
    background.width = WIDTH;
    if (textSprite.height < HEIGHT) {
        background.height = textSprite.height
        scrollbox.height = textSprite.height
    } else{
        background.height = HEIGHT;
    }
    textSprite.x = 2;
    textSprite.y = 0;
    background.tint = 0xfff3c9;
    background.zIndex = -1;
    scrollbox.content.addChild(textSprite);
    scrollbox.update();
    return scrollbox;

}

function plaza() {

    // const buttons = [];


    vp.sortableChildren = true;
    // app.stage.sortableChildren = true;


    // Shadows are the lowest
    // var shadowGroup = new PIXI.display.Group(-1, false);
    var backgroundGroup = new PIXI.Container();
    var peopleGroup = new  PIXI.Container();
    var textGroup = new  PIXI.Container();
    // peopleGroup.on('sort', (sprite) => {
    //     // people go down
    //     sprite.zOrder = sprite.y;
    // });
    peopleGroup.sortableChildren = true;

    const back = new PIXI.TilingSprite(app.loader.resources["background.png"].texture, 10000, 10000);
    back.x = -1000;
    back.y = -1000;
    back.scale.set(0.3);
    back.zIndex = -1;
    backgroundGroup.addChild(back);
    for (let i = 0; i < NUM_PEOPLE; i++) {
        // var buttonTexture = getMipmappedTexture(app.loader.resources[image_filenames[i]].texture);
        var buttonTexture = app.loader.resources[data[i].image].texture;
        // buttonTexture.mipmap = true;
        // if (i < image_filenames.length-1){
        //     var buttonTexture = getMipmappedTexture(app.loader.resources[image_filenames[i]].texture);
        // } else {
        //     var buttonTexture = app.loader.resources[image_filenames[i]].texture;
        //     buttonTexture.mipmap = true;
        // }
        // var j = i+1;
        // if (j >= image_filenames.length){
        //     j = 0;
        // }
        // var downTexture = app.loader.resources[image_filenames[j]].texture; //same for now

        const button = new PIXI.Sprite(buttonTexture);
        button.scale.set(0.25);
        //use z index

        button.name = data[i].name; //identifier
        button.anchor.set(0.5,0.1); //sets anchor approx at their head
        // console.log(positions_dict[image_filenames[i]]);
        button.x = data[i].x;
        button.y = data[i].y;
        button.zIndex = button.y;

        // make the button interactive...
        button.interactive = true;
        button.buttonMode = true;
        // button.anchor.set(0.5);

        console.log(window.innerWidth)
        console.log(window.innerHeight)
        button
        // Mouse & touch events are normalized into
        // the pointer* events for handling different
        // button events.
            .on('pointerdown', function()   {this.isdown = true;
                                            // this.texture = app.loader.resources["Alicia_Keys.png"].texture;
                                            //if no text is open, allow clicks. if a textbox is open, you must click x (or escape) before changing!
                                            //snap/snapzoom to this.name's position
                                            if (activeName){
                                                nameToTextbox[activeName].visible = 0;
                                            }
                                            activeName = this.name;
                                            nameToTextbox[this.name].visible = 1;
                                            // vp.snapZoom({width: 400, removeOnComplete: true});
                                            // vp.snap(this.x-window.innerWidth/7,this.y-60, {topLeft: true, removeOnComplete: true});


                                            // vp.snap(this.x+250,this.y+window.innerHeight/5, {removeOnComplete: true});
                                            // vp.follow(this);
                                            // vp.snap(positions_dict[this.name][0],positions_dict[this.name][1], {removeOnComplete: true, removeOnInterrupt: true});
                                            
                                            // vp.snapZoom({width: 400, removeOnComplete: false});
                                            console.log(this.name);
                                            this.alpha = 1;})
            .on('pointerup',   function()   {this.isdown = false;
                                            // if (this.isOver) {
                                            //     this.texture = textureButtonOver;
                                            // } else {
                                            //     this.texture = buttonTexture;
                                            // }
                                            // this.texture = app.loader.resources[this.name].texture;
                                        })
            .on('pointerupoutside', function(buttonTexture)   {this.isdown = false;
                                            // if (this.isOver) {
                                            //     this.texture = textureButtonOver;
                                            // } else {
                                            //     this.texture = buttonTexture;
                                            // }
                                            // this.texture = buttonTexture;
                                        })
            .on('pointerover', onButtonOver)
            .on('pointerout', onButtonOut);    
        

                                        
        //add it to the group
        peopleGroup.addChild(button);

        //add text to vp
        // textGroup.addChild(generateTextbox(data[i]));
        
        // add button to array
        // buttons.push(button);
    }

    var textGroup = makeTextboxes();

    // add it to the stage
    vp.addChild(backgroundGroup);
    vp.addChild(peopleGroup);
    vp.addChild(textGroup);
    vp.sortChildren;
    app.stage.sortChildren;
}



function onButtonOver() { //hover
    // this.isOver = true;
    // if (this.isdown) {
    //     return;
    // }
    // this.texture = textureButtonOver;
}

function onButtonOut() {
    // this.isOver = false;
    // if (this.isdown) {
    //     return;
    // }
    // this.texture = textureButton;
}

// hit area where alpha = 1 (no transparent boxes)
PIXI.Sprite.prototype.containsPoint = function (point) {
    const tempPoint = {x: 0, y: 0 }
    this.worldTransform.applyInverse(point, tempPoint);
    // console.log(tempPoint);

    const width = this._texture.orig.width;
    const height = this._texture.orig.height;
    const x1 = -width * this.anchor.x;
    let y1 = 0;

    let flag = false;

    if (tempPoint.x >= x1 && tempPoint.x < x1 + width) {
        y1 = -height * this.anchor.y;

        if (tempPoint.y >= y1 && tempPoint.y < y1 + height) {
            flag = true;
        }
    }

    if (!flag) {
        return false
    }
    // bitmap check
    const tex = this.texture;
    const baseTex = this.texture.baseTexture;
    const res = baseTex.resolution;
    if (!baseTex.hitmap) {

        if (!genHitmap(baseTex, 127)) {
            return true;
        }
        
    }

    const hitmap = baseTex.hitmap;
    // this does not account for rotation yet!!!
    let dx = Math.round((tempPoint.x - x1 + tex.frame.x) * res);
    let dy = Math.round((tempPoint.y - y1 + tex.frame.y) * res);
    let ind = (dx + dy * baseTex.realWidth);
    let ind1 = ind % 32;
    let ind2 = ind / 32 | 0;
    return (hitmap[ind2] & (1 << ind1)) !== 0;
}

function genHitmap(baseTex, threshold) {
    if (!baseTex.resource) {
        //renderTexture
        return false;
    }
    const imgSource = baseTex.resource.source;
    let canvas = null;
    if (!imgSource) {
        return false;
    }
    let context = null;
    if (imgSource.getContext) {
        canvas = imgSource;
        context = canvas.getContext('2d');
    } else if (imgSource instanceof Image) {
        canvas = document.createElement('canvas');
        canvas.width = imgSource.width;
        canvas.height = imgSource.height;
        context = canvas.getContext('2d');
        context.drawImage(imgSource, 0, 0);
    } else {
        //unknown source;
        return false;
    }

    const w = canvas.width, h = canvas.height;
    let imageData = context.getImageData(0, 0, w, h);
    let hitmap = baseTex.hitmap = new Uint32Array(Math.ceil(w * h / 32));
    for (let i = 0; i < w * h; i++) {
        let ind1 = i % 32;
        let ind2 = i / 32 | 0;
        if (imageData.data[i * 4 + 3] >= threshold) {
            hitmap[ind2] = hitmap[ind2] | (1 << ind1);
        }
    }
    return true;
}