//Daniel Cholewa
//Dec 13th

//Controls the budget
var budgetControl = (function() {

    var Expense = function(id,desc,value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    }
    
    var Income = function(id,desc,value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        
        totals: {
            exp: 0,
            inc: 0
        }
        
    };
    
    return {
        addItem: function(type,des,val){
            var newItem, id;
            
            if (data.allItems[type].length > 0 ){
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }
            
            if (type === 'exp'){
                newItem = new Expense (id,des,val);
            } else if (type === 'inc'){
                newItem = new Income (id,des,val);
            }
            
            data.allItems[type].push(newItem);
            return newItem;
        },
        
        testing: function (){
            console.log(data);
        }
    }
    
})();

//Controls the User interface
var uiControl = (function() {
    
    var domString = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        btnAdd: '.add__btn'
    };
    
    return {
       getInput: function(){
           return {
                type: document.querySelector(domString.inputType).value,
                desc: document.querySelector(domString.inputDesc).value,
                value: document.querySelector(domString.inputValue).value
           };
       }, 
        
        getDomStrings: function(){
            return domString;
        }
    };

                 
})();


//Controls the full app
var controller = (function(budgetCont, UICont){
    
var eventListen = function(){
        
        var DOM = uiControl.getDomStrings();
        document.querySelector(DOM.btnAdd).addEventListener('click',conAddItem);
    
        document.addEventListener('keypress',function(event){

            if (event.keyCode === 13 || event.which === 13) {
                conAddItem(); 
            }

    });
}
    
    var conAddItem = function(){
        var input, newItem
        //Get input
        //Add item to right col
        //add new item to UI
        //Calc Budget
        //Display 
        input = uiControl.getInput();
        newItem = budgetCont.addItem(input.desc,input.type,input.value);
        
    };
    
    return {
        init: function() {
            console.log('App Start');
            eventListen();
        }
    };
    

})(budgetControl, uiControl);

controller.init();



