var expect = require('chai').expect;
var argv = require('optimist').argv;

describe('node-syntax-tests', function() 
{
    it('should not throw when using classes', function()
    {
        expect(() =>
            eval(
                `
                class A 
                {
                    constructor(name) {
                        this.name = name;
                    }
                }
                let name = "nazwa";
                let a = new A(name);

                expect(a.name).to.eql(name);
                `
            )
        ).to.not.throw();
    });

    it('should not throw when using arrow functions', function() {
        expect(() => 
            eval(
                `
                let toUpper = name => name.toUpperCase();

                let text = "text";
                expect(toUpper(text)).to.eql("TEXT");
                `
            )
        ).to.not.throw();
    });

    it('should throw when using block scoped variables out of scope', function()
    {
        expect(() =>
            eval(
                `
                {
                    let a = 5;
                }
                expect(a).to.eql(5)
                `
            )
        ).to.throw();
    });

    it('should not throw when using Object.create to instantiate new objects', function()
    {
        expect(() =>
            eval(
                `
                var obj = {
                    test: 5,
                    getIncrementedTest: function() {
                        ++this.test;
                        return this.test;
                    }
                };
        
                var obj2 = Object.create(obj);
                expect(obj2.getIncrementedTest()).to.eql(6);
                `
            )
        ).to.not.throw();
    });

    it('should not throw when declaring function with default parameters', function()
    {
        expect(() =>
            eval(
                `
                function join(a, b, separator = '')
                {
                    return a + separator + b;
                }
                `
            )
        ).to.not.throw();        
    });

    it('should not throw when calling function with default parameters', function()
    {
        expect(() =>
            eval(
                `
                function join(a, b, separator = '')
                {
                    return a + separator + b;
                }

                expect(join('a','b')).to.eql('ab');
                `
            )
        ).to.not.throw();        
    });

    it('should not throw when using list decomposition', function()
    {
        expect(() =>
            eval(
                `
                var list = ['a','b','c'];
                var [a, b, c] = list;

                expect(a).to.eql('a');
                expect(b).to.eql('b');
                expect(c).to.eql('c');
                `
            )
        ).to.not.throw();    
    });

    it('should not throw when using string interpolation', function()
    {
        expect(() =>
            eval(
                "                       \
                const a = '1';          \
                const b = '2';          \
                const c = `${a}${b}`;   \
                                        \
                expect(c).to.eql('12'); \
                "
            )
        ).to.not.throw();    
    });

    it('should not throw when using rest parameters syntax', function()
    {
        expect(() =>
            eval(
                `
                function sum(...numbers)
                {
                    var result = 0;
                    numbers.forEach(x => result += x);

                    return result;
                }

                var res = sum(1,2,3,4);
                expect(res).to.eql(10);
                `
            )
        ).to.not.throw();    
    });

    it('should interpret "this" inside function as called function', function()
    {
        function changeThis()
        {
            this.abc = 5;
        }

        changeThis();
        expect(this.abc).to.be.undefined;
    })

    it('should interpret "this" inside arrow function as context in which function was called', function()
    {
        var changeThis = () => {
            this.abc = 5;
            return this;
        }

        changeThis();
        expect(this.abc).to.eql(5);
    })

    it('should not throw when working on big ints', function()
    {
        expect(() =>
            eval(
                `
                const bigNumber = BigInt(842071692136750991);
                `
            )
        ).to.not.throw();    
    });

    it('should not throw when using optional chaining operator', function()
    {
        expect(() =>
            eval(
                `
                var obj = {
                    a: 2
                }
                var b = obj?.c;
                `
            )
        ).to.not.throw();    
    });

    it('should not throw when using replaceAll for strings', function()
    {
        // skip this test in continuous integration
        if(argv.ciMode)
        {
            this.skip();
        }

        expect(() =>
            eval(
                `
                const para = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

                const replaced = para.replaceAll('dog','cat');

                expect(replaced).to.eql('The quick brown fox jumps over the lazy cat. If the cat reacted, was it really lazy?');
                `
            )
        ).to.not.throw();    
    });

    it('should not throw when using number separators', function()
    {
        expect(() =>
            eval(
                `
                var a = 10_000;
                var b = 5;

                expect(a-b).to.eql(9_995);
                `
            )
        ).to.not.throw();    
    });

    it('should not throw when using private modifier for getter', function()
    {
        expect(() =>
            eval(
                `
                class A
                {
                    #num = 5;

                    get num()
                    {
                        return this.#num;
                    }
                }

                var obj = new A();

                expect(obj.num).to.eql(5);
                `
            )
        ).to.not.throw();    
    });

    it('should throw when trying to call private getter directly', function()
    {
        expect(() =>
            eval(
                `
                class A
                {
                    #num = 5;

                    get num()
                    {
                        return this.#num;
                    }
                }

                var obj = new A();

                expect(obj.#num).to.eql(5);
                `
            )
        ).to.throw();    
    });

    it('should throw when trying to call private method directly', function()
    {
        expect(() =>
            eval(
                `
                class A
                {
                    #num = 5;

                    #getNum()
                    {
                        return this.#num;
                    }
                }

                var obj = new A();

                expect(obj.#getNum).to.eql(5);
                `
            )
        ).to.throw();    
    });
});