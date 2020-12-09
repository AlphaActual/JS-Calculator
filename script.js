//KALKULATOR


    
        // definiranje glavnog spremnika za brojeve   
        var storageArray = []; 
     

        //postavljanje event listenera na sve brojeve
        for (i = 0;i<10;i++){ 
            
            document.getElementById(i).addEventListener("click", function(){
                storeNumber(Number(this.id)); // pretvaranje u broj važno je kasnije u funkciji "storeNumber"
             
            });
        
        };
        //postavljanje event listenera na  operatore i točku
        var otherButtons = ["+","-","*","/","."];
        otherButtons.forEach(myFunction);
    
        function myFunction(value) {
            document.getElementById(value).addEventListener("click", function(){
                storeNumber(this.id); // id je jednak vrijednosti broja tj. znaku i sprema se u glavni spremnik pritiskom na ovu dugmad
             
            });
        };
        //postavljanje listenera na dugme CLEAR
        document.getElementById("clear").addEventListener("click", function(){
            clearAll(); // čisti spremnik i display
            checkMaxChar(); // enablea svu dugmad ako je bila disablana
            
         
        });
        //postavljanje listenera na dugme jednakosti =
        document.getElementById("=").addEventListener("click", function(){
            calculateResult(); // pokreće funkciju za izračun riješenja
            
            
         
        });
    
        //postavljanje listenera na dugme REMOVE
        document.getElementById("remove").addEventListener("click", function(){
            removeSingleDigit(); // uklanja zadnju unesenu znamenku
            checkMaxChar(); // enablea svu dugmad ako je bila disablana
         
        });
    
        //selektor za display
        var display = document.querySelector(".displayedValue");
    
        // funkcija koja ubacuje svaki BROJ ili znak u array storageArray
        var storeNumber = function(id){
            
            function storeDigit (){
                storageArray.push(id);
                displayResult();
            };
    
           // 1. slučaj - ako je unesena znamenka broj odmah ju pohrani u array i prikaži na displayu
           if(typeof (id) === "number"){
              
               
                    storeDigit();
    
               
            // 2. slučaj - upiši i prikaži ako je unesena znamenka string tj znak
           }else if (storageArray.length !== 0){ // i ako spremnik nije prazan
                    if ((typeof(storageArray[storageArray.length - 1]) === "number")){ // i ako je zadnja znamenka u spreminku BROJ(sprečava pojavu dva znaka uzastopno)
                        
                        storeDigit();
    
                    }else{ // ako je zadnja znamenka u spremniku ZNAK tj. string
                        if(id === "-" ){ // i ako je ta znamenka jednaka znaku -
                            if(storageArray[storageArray.length - 1] !== "-"){// i ako prethodni znak nije minus upiši i prikaži
                                storeDigit(); // ovime se dozvoljava upis izraza npr. 9/-1 ali ne i 9--1
                                
                            };
                                    
                        };
                    };
            
           }else{ // dozvoljava da prvi unos u prazan spremnik bude znak "-" kako bi se mogli unijeti i negativni brojevi 
               if(id === "-"){
                
                storeDigit();
    
               };
           };
           
           
        };
    
        //funkcija koja prikazuje rezultat
        var displayResult = function(){
            var toDisplay;
            if(storageArray.length === 0){
                toDisplay = "|";
                
            }else{
                toDisplay = storageArray.join("");
            };
            
            display.innerHTML = toDisplay;
            blink();
            // provjerava maksimalni dozvoljeni broj znamenaka na displayu
            checkMaxChar();
            
            
        };
    
        //funkcija koja briše sve. Pritisak na dugme "C"
        var clearAll = function(){
            
            storageArray.length = 0;
            displayResult();
            
        };
    
        // pritisak na tipku = aktivira funkciju za izračun riješenja
        var calculateResult = function(){
            if(storageArray.length != 0){
                // provjerava da zadnnji element nije neki od znakova kako bi se izbjegle greske u racunanju
                if(storageArray[storageArray.length - 1] == "+" || 
                   storageArray[storageArray.length - 1] == "-" || 
                   storageArray[storageArray.length - 1] == "*" || 
                   storageArray[storageArray.length - 1] == "/" ){
                // ako jest funkcija pop ga prvo izbacuje iz arraya i potom nastavlja kalkulaciju pozivajuci joinAndCalculate
                        storageArray.pop();
                        joinAndCalculate();
                }else{
                        joinAndCalculate();
                };
    
            };
            //metoda eval računa riješenje stringa arraya koji smo dobili metodom join
            //prikaz rezultata u html i pražnjenje arraya te stavljanje rezultata kao prvog elementa kako bi se od njega nastavilo računanje
            function joinAndCalculate(){
                var finalResult = eval(storageArray.join(""));
                display.innerHTML = finalResult;
                storageArray.length = 0;
                storageArray.push(finalResult);
            };
    
        };
        
        //funkcija koja uklanja zadnju znamenku ako ima što za ukloniti
        function removeSingleDigit(){
            if (storageArray.length !== 0){
                storageArray.pop();
                displayResult();
            };
            
        };
        // funkcija koja provjerava maksimalni broj znakova kako bi se spriječio overflow displaya
        function checkMaxChar(){
            var elems = document.getElementsByClassName("disableControl") // tu dobivamo array classa svih dugmadi s tom klasom
            // ako je na displayu više od 17 znakova, blokiraj svu dugmad osim =,C, i <x
            if(storageArray.join("").length >= 16){
                // ovaj loop blokira željenu dugmad
                for(var i = 0; i < elems.length; i++) {
                elems[i].disabled = true;
                
                 };
    
            }else{
                // ovaj ju odblokira
                for(var i = 0; i < elems.length; i++) {
                elems[i].disabled = false;};
                
            };
            
        };
    
        // funkcija koja određuje treba li na displayu znak | blinkati 
        var myInterval; // važno je da je myInterval u global scopeu, kako bi stanje intervala ostalo usnimljeno tj kako bi clearInterval imao pristup tome.
        
        // funkcija se pokreće pri loadanju stranice (body tag ima onload="blink();") te pri stiskanju svakog dugmeta (funkcija displayResult)
        function blink() {
            var disValue = document.getElementById('disValue'); // selektor displaya
            
            // provjerava početno stanje, ako je array prazan pokreni interval za blinkanje znaka |
            if(storageArray.length === 0){
                myInterval = setInterval(function(){disValue.style.visibility = (disValue.style.visibility == 'hidden' ? 'visible' : 'hidden');}, 1000);
                
            }else{
    
                // ako array sadrži podatak/podatke zaustavi blinkanje i postavi vidljivost.
                clearInterval(myInterval);
                disValue.style.visibility = "visible";      
            };
            
         };
    
    
    
    // Implementacija korištenja tipkovnice pri unosu
         document.onkeydown = function(event){
            var keySymbol = event.key; // ovdje se iz objekta event uzima vrijednost znaka kao string i pohranjuje u varijablu keySimbol
            // definiranje dozvoljenih znakova i brojeva na tipkovnici, svaki input koji nije u ovim arrayima ce se ignorirati
            var allowedNumberDigits = ["0","1","2","3","4","5","6","7","8","9"];
            var allowedSymbols = [".","+","-","*","/","="];
    
            if(storageArray.join("").length < 16){ // ovisno o popunjenosti displaya unos se ili ignorira ili prosljeđuje na obradu i prikaz
    
                if (keySymbol in allowedNumberDigits){ // test ako je simbol unutar arraya brojeva konvertira ga u broj i šalje u storeNumber
                    /* 
                in operator ovdje funkcionira zato što se svaka znamenka arraya allowedNumberDigits ujedno podudara sa svojim indexom npr. "1" ima index 1
                isti princip ne funkcionira kad su u pitanju znakovi.
        
                var cars = ["Saab", "Volvo", "BMW"];
                 "Saab" in cars // Returns false (specify the index number instead of value)
                 0 in cars // returns true
                 */
        
                    storeNumber(Number(keySymbol));
                    
                    
        
                }else if(allowedSymbols.indexOf(keySymbol) !== -1){ // provjerava array simbola
                    // indexOf provjerava sadrži li array value simbola koji tražimo, prazan array je -1
        
                            storeNumber(keySymbol);
    
                    };
                };
    
                // ako simbol nije broj ili znak već tipke Enter,Backspace ili Delete svaki slučaj zove svoju funkciju
                // ako simbol nije niti broj niti znak niti jedna od ovih tipki unos će biti ignoriran
                switch (keySymbol) {
                    case "Enter" :
                        calculateResult();
                        break;
                    case "Backspace" :
                        removeSingleDigit();
                        break; 
                    case "Delete" :
                        clearAll();
                        break; 
                    default : ;
                        
                };
            };
            