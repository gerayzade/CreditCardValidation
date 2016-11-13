function checkDigits(cardNumber, objCard) {
    cardNumber.replace(/[^0-9]+/g,'');
    var prefixString = "";
    var error = "";
    var countL, countP, prefixLength, rightmost, digit, i, doubled, sum = 0;
    var cardLength = cardNumber.length;
    
    if (!cardNumber.match(/^[0-9]+$/)) {
        error = "card number should contain only digits"
        return false;
    }
    
    // Check if the prefix of the card number corresponds to its type
    
    error = "IIN must start with {";
    
    for (i = 0; i < objCard.prefix.length; i++) {
        prefixLength = objCard.prefix[i].length;
        prefixString = cardNumber.substring(0, prefixLength);
        
        if (objCard.prefix[i].match(/-/)) {
            var range = objCard.prefix[i].split("-");
            var rangeMin = parseInt(range[0]);
            var rangeMax = parseInt(range[1]);
            
            prefixString = cardNumber.substring(0, range[0].length);
            
            var prefixNum = parseInt(prefixString);
            
            if (prefixNum >= rangeMin && prefixNum <= rangeMax) {
               countP = 1; 
            }
        }
        
        if (prefixString == objCard.prefix[i]) {
            countP = 1;
        }
        
        error += " " + objCard.prefix[i].toString();
        if (i != objCard.prefix.length - 1) {
            error += ", "
        } else {
            error += " }."; 
        }
    }
    
    if (!countP) { 
        return false;
    }
    
    // Check if the length of the card number corresponds to its type
    
    error = "length must be in {";
    
    for (i = 0; i < objCard.validLength.length; i++) {
        if (objCard.validLength[i].match(/-/)) {
            var range = objCard.validLength[i].split("-");
            var rangeMin = parseInt(range[0]);
            var rangeMax = parseInt(range[1]);
            
            if (cardLength >= rangeMin && cardLength <= rangeMax) {
               countL = 1; 
            }
        }
        
        if (cardLength == objCard.validLength[i]) {
            countL = 1;
        }
        
        error += " " + objCard.validLength[i].toString();
        if (i != objCard.validLength.length - 1) {
            error += ", "
        } else {
            error += " }."; 
        }
    }
    
    if (!countL) { 
        return false;
    }
    
    // The Luhn Algorithm
    
    for (i = 0; i < cardLength; i++) {
        rightmost = cardLength - i;
        digit = parseInt(cardNumber.substring(rightmost - 1, rightmost));
        if(i % 2 == 1){
            doubled = digit * 2;
            if (doubled > 9) {
                doubled -= 9;
            }
        } else {
            doubled = digit;
        }
        sum += doubled;
    }
    
    error = "checksum is incorrect";
    
    if (!sum) { 
        return false; 
    }
    
    if (sum % 10 == 0){
        return true;
    } else {
        return false;
    }
};
