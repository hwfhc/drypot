const expect = require('chai').expect;

const input = require('../lib/input')('abc');

describe('initUser',function(){
    it('eof() test',function(){
        var item = input.eof();
        expect(item).to.be.equal(false);
        expect(item).to.be.a('boolean');
    });


    it('next() test',function(){
        var item = input.next();
        expect(item).to.be.equal('a');
        expect(item).to.be.a('string');
    });

    it('peek() test',function(){
        var item = input.peek();
        expect(item).to.be.equal('b');
        expect(item).to.be.a('string');
    });

    it('second next() test',function(){
        var item = input.next();
        expect(item).to.be.equal('b');
        expect(item).to.be.a('string');
    });

    it('before() test',function(){
        var item = input.before();
        expect(item).to.be.equal('b');
        expect(item).to.be.a('string');
    });

    it('third next() test',function(){
        var item = input.next();
        expect(item).to.be.equal('c');
        expect(item).to.be.a('string');
    });

    it('second eof() test',function(){
        var item = input.eof();
        expect(item).to.be.equal(true);
        expect(item).to.be.a('boolean');
    });
});
