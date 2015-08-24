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
    return primes;
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

function updateValues() {
    // List of all classes that need to be updated
    var elements = ['p', 'q', 'z', 'n'];
    elements.forEach(function(classes) {
        var classCollection = document.getElementsByClassName(classes);
        Array.prototype.forEach.call(classCollection, function(el) {
            el.textContent = Rsa[classes];
        });
    });
}
