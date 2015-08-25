// main.js


/**
 * 
 * RSA
 *
 * Does RSA math
 * 
 */
var Rsa = {
    initPrimes: function(p, q) {
        this.p = p;
        this.q = q;
        this.n = p * q;
        this.z = (p - 1) * (q - 1);
    }
};

function getPrimes(max) {
    var sieve = [], i, j, primes = [];
    for (i = 2; i <= max; ++i) {
        if (!sieve[i]) {
            primes.push(i);
            for (j = i << 1; j <= max; j += i) {
                sieve[j] = true;
            }
        }
    }
    console.log(primes);
    return primes;
}

function getCoPrimes(arr, num) {
    return arr.filter(function(el) {
        return num % el !== 0;
    });
    
}

/**
 * 
 * Validate inputs
 *
 */
var Validator = {
    isPrime: function(n) {
        if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false; 
        if (n % 2 === 0) return (n === 2);
        if (n%3 === 0) return (n === 3);
        var m = Math.sqrt(n);
        for (var i = 5;i <= m; i += 6) {
            if (n % i === 0)     return false;
            if (n % (i + 2) === 0) return false;
        }
        return true;
    },
    pqPrime: function(arr) {
        arr.forEach(function(el) {
            if (!this.isPrime(el)) {
                return false;
            }
            return true;
        });
    },
    isNotEqual: function(p, q) {
        return p !== q;
    },
    isNumber: function(num) {
        return typeof num === 'number';
    }
};

// EventListeners
var primeSubmit = document.getElementById('prime-submit');

primeSubmit.addEventListener('click', addPrimes);

function addPrimes(e) {
    e.preventDefault();
    var primeOne = document.getElementById('prime-one');
    var primeTwo = document.getElementById('prime-two');
    var error;

    // String to Number
    p = +primeOne.value;
    q = +primeTwo.value;

    clearErrors();
    
    if (!Validator.isPrime(p)) {
        document.getElementById("perror").textContent = "p is not prime";
        error = true;
    } 
    if (!Validator.isPrime(q)) {
        document.getElementById("qerror").textContent = "q is not prime";
        error = true;
    } 
    if (error) {
        return;
    } else {
        primeOne.disabled = true;
        primeTwo.disabled = true;
        Rsa.initPrimes(p, q);
        updateValues();
    }
    document.getElementById('n').textContent = Rsa.n;
}

function clearErrors() {
    var errors = document.getElementsByClassName('error');
    Array.prototype.forEach.call(errors, function(el) {
        el.textContent = "";
    });
}

function updateValues(updateClass) {
    // List of all classes that need to be updated
    var classCollection,
        elements;
    if (updateClass) {
        elements = [updateClass];
    } else {
        // Need to get some method of grabbing only available variables
        elements = ['p', 'q', 'z', 'n'];
    }
    elements.forEach(function(classes) {
        classCollection = document.getElementsByClassName(classes);
        if (classCollection.length > 0) {
            Array.prototype.forEach.call(classCollection, function(el) {
                el.textContent = Rsa[classes];
            });
        }
    });
}

var coPrimesButton = document.getElementById('coprimes');
coPrimesButton.addEventListener('click', function(e) {
    e.preventDefault();
    var prime;
    var coPrimes = getCoPrimes(getPrimes(Rsa.z), Rsa.z);
    var coPrimesList = document.createElement('ul');
    coPrimesList.setAttribute('id', 'coprimes-buttons');

    // Event delegation for coprime buttons
    coPrimesList.addEventListener('click', function(e) {
        e.preventDefault();
        if (e.target && e.target.nodeName === 'BUTTON') {
            console.log(e.target.textContent);
            Rsa.k = +e.target.textContent;
            updateValues('k');
        }
    });


    coPrimes.forEach(function(el) {
        prime = document.createElement('li');
        btn = document.createElement('button');
        btn.setAttribute('id', 'primes-' + el);
        btn.textContent = el;
        prime.appendChild(btn);
        coPrimesList.appendChild(prime);
    });
    var coPrimesParent = document.getElementById('coprimes-list');
    document.getElementById('coprimes-instruction').setAttribute('class', '');
    document.getElementById('coprimes-list').appendChild(coPrimesList);

});
