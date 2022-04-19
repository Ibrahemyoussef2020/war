/************************************************* */
/*                      variabls                   */ 
/************************************************* */
const CONTAINER = document.querySelector(".boxes-container");
const IMGS      = document.querySelectorAll(".img");
const MASSGES   = document.querySelectorAll("p");
const results   = document.querySelectorAll(".result"); 
const METERS    = document.querySelectorAll("meter");
const BOXES_COUNT = 20;
const reDBlue = 1000;

let attack = "هجوووووم";
let defense = "استعدوا للدفاع";
let victory = "استعد للهزيمة";
let lose    = "ليس بعد";
let lastVictory = "لقد انتصرنا";
let lastLose = "سحقا لقد خسرنا";

let   redBower = reDBlue;
let   blueBower = reDBlue;
let   calc = 0;
let Timein = 1000;
let Timeout = 2000;
/*********************************************** */
/*             create boxes                      */
/*************************************************/
for(b = 0 ; b <= BOXES_COUNT - 1 ; b++){
    section = document.createElement("section");
    section.classList.add("section");
    RANDOM_VAL = reDBlue / BOXES_COUNT * Math.random();
    const POINTS = ((RANDOM_VAL % 10)).toFixed(2);
    const POWER  = parseInt(POINTS.slice(2,6)) + 100;

    section.style.order =  parseInt(POINTS) ;
    section.value = POWER;
    calc += +POWER;

    face =  document.createElement("div");
    face.classList.add("face");
    spanPower = document.createElement("span");
    spanPower.innerHTML = POWER;
    face.append(spanPower) ;

    back =  document.createElement("div");
    back.classList.add("back"); 

    section.append(face,back);
    CONTAINER.appendChild(section);  
}
/*********************************************** */
                                 
/*************************************************/
const sections = document.querySelectorAll("section");

sections.forEach(section=>{
    section.classList.add("before-war");   
});
function rememberValus(){
    sections.forEach(section=>{
        section.classList.contains("before-war")?section.classList.remove("before-war"):"";   
    });
}setTimeout(rememberValus, 5000);
/*********************************************** */
/*             section   division                */
/*************************************************/
sections.forEach(section=>{
    if(section.classList.contains("rotate")){
        section.classList.add("clashed");
    } 
});  
for(s = 2; s < sections.length;s++){
    if(s % 2 === 0){ sections[s].classList.add("red") ; sections[s].title = "red"}; 
    if(s % 2 !==0){sections[s].classList.add("blue");sections[s].title = "blue"};
    
    sections[s].addEventListener("click",function(){
        this.classList.add("clashed");
        CONTAINER.classList.add("not-clickable");

        endWar(document.querySelectorAll(".clashed"));
        
        setTimeout(function(){
            CONTAINER.classList.remove("not-clickable");
        },6000);
        
        this.classList.add("rotate");
        this.classList.add("clash");

        RED_BOXES  = document.querySelectorAll(".red");
        BLUE_BOXES = document.querySelectorAll(".blue");
        clashs     = Array.from(document.querySelectorAll(".clash"));

        NO_CLICK(this); //sibling boxs is not clickble

        if(clashs.length === 1){
            MASSGES.forEach(massge =>{
                if(massge.title === this.title){
                    massge.innerText = attack;
                    massge.classList.add("anmatedMsg");
                    setTimeout(removeAnmi,Timeout);
                }
            });
        }
        else{
            MASSGES.forEach(massge =>{
                if(massge.title === this.title){
                    massge.innerText = defense;
                    massge.classList.add("anmatedMsg");
                    setTimeout(removeAnmi,Timeout);
                    console.log(clashs[1] + "1"); 
                }
            });                  
        }
        this.classList.add("not-clickable");
        if(clashs.length >=2 && clashs.length < BOXES_COUNT) {
            setTimeout(clashF,Timeout ,clashs[0] , clashs[1]);
            NO_CLICK(CONTAINER);
        }  
    });
}   
/*********************************************** */
/*                       NO_CLICK                */
/*************************************************/
function NO_CLICK(clickabl){
    clickabl.classList.add("not-clickable");

    if(clickabl.classList.contains("red")){                 
        RED_BOXES.forEach(red =>{
            red.classList.add("not-clickable");
        });
        BLUE_BOXES.forEach(blue =>{
            blue.classList.contains("not-clickable")?blue.classList.remove("not-clickable"): "";
        });
    }
    if(clickabl.classList.contains("blue")){                
        BLUE_BOXES.forEach(blue =>{
            blue.classList.add("not-clickable");
        });
        RED_BOXES.forEach(red =>{
            red.classList.contains("not-clickable")?red.classList.remove("not-clickable"): "";
        });
    }
}   
/*********************************************** */
/*              Battle   function                */
/*************************************************/
function clashF(redSoldjer,blueSoldjer){
    var victoryArm,
        LoserArm;
    if(redSoldjer.value > blueSoldjer.value){
        victoryArm = redSoldjer;
        LoserArm   = blueSoldjer;
    }
    if(redSoldjer.value <= blueSoldjer.value){
        victoryArm = blueSoldjer;
        LoserArm   = redSoldjer;      
    }
    if(redSoldjer.value === blueSoldjer.value){
        pesoduF(LoserArm,LoserArm);
    }
    if(clashs.length > 1){
        setTimeout(pesoduF,Timeout,victoryArm,LoserArm)
        setTimeout(resultF,Timeout,LoserArm)
        setTimeout(massgeF,Timeout,victoryArm,LoserArm)
        setTimeout(nextBattleF,Timeout*2);           
    }
}
/************remone animation************** */
function removeAnmi(){
    MASSGES.forEach(massge =>{
      if(massge.classList.contains("anmatedMsg")){
          massge.classList.remove("anmatedMsg");
          massge.innerText = "";
        };    
    });
}    
/************pesodu function*************** */
function pesoduF(victoryArm,LoserArm){
    victoryArm.classList.add("victory");
    LoserArm.classList.add("lose");
}
/******** msg function ********** */
function resultF(LoserArm){
    results.forEach(result =>{
    result.title === LoserArm.title? result.innerText = +result.innerText -  +LoserArm.value:"";
    });
    METERS.forEach(meter =>{
    if(meter.value < 400){
       var victory = "لقد ضعفت قوتك عليك الاستسلام";
        var lose    = "كلا سنعوض  الهزائم";
    }   
    meter.title === LoserArm.title? meter.value = +meter.value -  +LoserArm.value:"";
    })
}
/******** msg function ********** */
function massgeF(victoryArm , LoserArm){
    MASSGES.forEach(massge =>{
        massge.classList.remove("anmatedMsg");
        massge.innerText = "";    
    });
    MASSGES.forEach(massge =>{   
        if(massge.title === victoryArm.title){
            massge.innerText = victory;
            massge.classList.add("anmatedMsg");
        }
        if(massge.title !== victoryArm.title){  
            setTimeout(function(){
                massge.innerText = lose;
                massge.classList.add("anmatedMsg"); 
            },500)              
        } 
    });
}
/////////////////////////////////
//       next battle           //
/////////////////////////////////
function nextBattleF(victoryArm,LoserArm){
   sections.forEach(section =>{
     section.classList.remove("clash"); 
    });
    CONTAINER.classList.remove("not-clickable"); 
    MASSGES.forEach(massge =>{
        if(massge.classList.contains("anmatedMsg")){
            massge.classList.remove("anmatedMsg");
            massge.innerText = "";
        };    
    });
}
/////////////////////////////////
//         end war             //
/////////////////////////////////
function endWar(clashedSoldjer){
    if(clashedSoldjer.length >= BOXES_COUNT){
        if(results[0].innerText > results[1].innerText){
            MASSGES[1].innerText = lastLose;
            MASSGES[0].classList.add("anmatedMsg");
            MASSGES[0].innerText = lastVictory;
            MASSGES[1].classList.add("anmatedMsg");
            IMGS.forEach(img=>{
                img.title == results[0].title ? img.classList.add("victory-army") : img.classList.add("loser-army")
            });          
        }else if(results[0].innerText < results[1].innerText){
                MASSGES[0].innerText = lastLose;
                MASSGES[1].classList.add("anmatedMsg");
                MASSGES[1].innerText = lastVictory;
                MASSGES[0].classList.add("anmatedMsg");                
            IMGS.forEach(img=>{
                img.title == results[1].title ? img.classList.add("victory-army") : img.classList.add("loser-army");
            });
        } 
    }
}

