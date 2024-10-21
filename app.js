class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity
        this.loadFactor = loadFactor
        this.size = 0
        this.buckets = Array(this.capacity).fill(null).map(() => [])
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.capacity
        }

        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key)
        const bucket = this.buckets[index]

        for (let pairs of bucket) {
            if (pairs[0] === key) {
                pairs[1] = value
                return
            }
        }

        bucket.push([key, value])
        this.size++

        if (this.size >= this.loadFactor * this.capacity) {
            this.increaseSize()
        }
    }

    get(key) {
        const index = this.hash(key)
        const bucket = this.buckets[index]
        for (let pairs of bucket) {
            if (pairs[0] === key) {
                return pairs[1]
            }
        }
        return null
    }

    has(key) {
        const index = this.hash(key)
        const bucket = this.buckets[index]
        for (let pairs of bucket) {
            if (pairs[0] === key) {
                return true
            }
        }
        return false
    }

    remove(key) {
        const index = this.hash(key)
        const bucket = this.buckets[index]
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1)
                this.size--
                return true
            }
        }
        return false
    }

    length() {
        return this.size
    }

    clear() {
        this.buckets = Array(this.capacity).fill(null).map(() => [])
        this.size = 0
    }

    keys() {
        const keysArray = []
        for (let bucket of this.buckets) {
            for (let pairs of bucket) {
                keysArray.push(pairs[0])
            }
        }
        return keysArray
    }

    values() {
        const valuesArray = []
        for (let bucket of this.buckets) {
            for (let pairs of bucket) {
                valuesArray.push(pairs[1])
            }
        }
        return valuesArray
    }

    entries() {
        const entriesArray = []
        for (let bucket of this.buckets) {
            for (let pairs of bucket) {
                entriesArray.push(pairs)
            }
        }
        return entriesArray
    }

    increaseSize() {
        const currentBuckets = this.buckets;
        this.capacity = this.capacity * 2
        this.buckets = Array(this.capacity).fill(null).map(() => [])
        this.size = 0

        for (let bucket of currentBuckets) {
            for (let pairs of bucket) {
                this.set(pairs[0], pairs[1])
            }
        }
    }
}

class HashSet {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity
        this.size = 0
        this.loadFactor = loadFactor
        this.buckets = Array(this.capacity).fill(null).map(() => [])
    }

    hash(key){
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.capacity
        }

        return hashCode;
    }

    set(key){
        const index = this.hash(key)
        const bucket = this.buckets[index]

        for (let keys in bucket) {
            if(bucket[keys] === key){
                bucket[keys] = key
            }
        }

        bucket.push(key)
        this.size++

        if (this.size >= this.loadFactor * this.capacity) {
            this.increaseSize()
        }
    }

    has(key){
        const index = this.hash(key)
        const bucket = this.buckets[index]
        for (let keys of bucket) {
            if (keys === key) {
                return true
            }
        }
        return false
    }

    remove(key){
        const index = this.hash(key)
        const bucket = this.buckets[index]
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i] === key) {
                bucket.splice(i, 1)
                this.size--
                return true
            }
        }
        return false
    }

    size(){
        return this.size
    }

    clear() {
        this.buckets = Array(this.capacity).fill(null).map(() => [])
        this.size = 0
    }

    keys(){
        const keysArray = []
        for (let bucket of this.buckets) {
            for (let keys of bucket) {
                keysArray.push(keys)
            }
        }
        return keysArray
    }

    increaseSize() {
        const currentBuckets = this.buckets;
        this.capacity = this.capacity * 2
        this.buckets = Array(this.capacity).fill(null).map(() => [])
        this.size = 0

        for (let bucket of currentBuckets) {
            for (let keys of bucket) {
                this.set(keys)
            }
        }
    }
}

const test = new HashMap() // or HashMap() if using a factory test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set("lion", "brown")
console.log(test.loadFactor)
console.log(test.entries())
console.log(test.capacity)
test.set('moon', 'silver')
console.log(test.loadFactor)
console.log(test.entries())
console.log(test.capacity)
test.set("lion", "pink")
console.log(test.get("lion"))
console.log(test.has("lion"))
console.log(test.remove("lion"))
console.log(test.length())
console.log(test.keys())
console.log(test.values())
console.log(test.entries())
test.clear()
console.log(test.length())

const testSet = new HashSet() // or HashMap() if using a factory test.set('apple', 'red')
testSet.set('banana')
testSet.set('carrot')
testSet.set('dog')
testSet.set('elephant')
testSet.set('frog')
testSet.set('grape')
testSet.set('hat')
testSet.set('ice cream')
testSet.set('jacket')
testSet.set('kite')
testSet.set('lion')
testSet.set("lion")
console.log(testSet.keys())