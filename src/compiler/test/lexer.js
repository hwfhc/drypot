const expect = require('chai').expect;

const worker = (function(){
    var func = [];

    return {
        exec(arr,handler){
            arr.forEach(item => {
                handler(item);
            });
        },
        add(item){
            func.push(item);
        }
    }
})();

describe('lexer',function(){
    it('common test',function(){
        var input = require('../lib/lexer')('{{ajax(`asdf${time}asdf`,a)}}');

        var arr = [
            {value: '{{',type: 'code'},
            {value: 'ajax',type: 'var'},
            {value: '(',type: 'punc'},
            {value: 'asdf',type: 'str'},
            {value: '${',type: 'punc'},
            {value: 'time',type: 'var'},
            {value: '}',type: 'punc'},
            {value: 'asdf',type: 'str'},
            {value: ',',type: 'punc'},
            {value: 'a',type: 'var'},
            {value: ')',type: 'punc'},
            {value: '}}',type: 'code'},
        ];

        {
            let data = input.peek();

            expect(data.value).to.be.equal('{{');
            expect(data.type).to.be.equal('code');

            expect(data.value).to.be.a('string');
            expect(data.type).to.be.a('string');
        }

        {
            let eof = input.eof();

            expect(eof).to.be.equal(false);
            expect(eof).to.be.a('boolean');
        }

        worker.exec(arr
            ,item => {
                var data = input.next();

                expect(data.value).to.be.equal(item.value);
                expect(data.type).to.be.equal(item.type);

                expect(data.value).to.be.a('string');
                expect(data.type).to.be.a('string');
            }
        );

        {
            let eof = input.eof();

            expect(eof).to.be.equal(true);
            expect(eof).to.be.a('boolean');
        }
    });

    describe('str test',function(){
        it('pure str',function(){
            var input = require('../lib/lexer')('{{`asdf`}}');

            var arr = [
                {value: '{{',type: 'code'},
                {value: 'asdf',type: 'str'},
                {value: '}}',type: 'code'}
            ];

            worker.exec(arr
                ,item => {
                    var data = input.next();

                    expect(data.value).to.be.equal(item.value);
                    expect(data.type).to.be.equal(item.type);

                    expect(data.value).to.be.a('string');
                    expect(data.type).to.be.a('string');
                }
            );
        });


        it('str with var: center',function(){
            var input = require('../lib/lexer')('{{`asdf${time}asdf`}}');

            var arr = [
                {value: '{{',type: 'code'},
                {value: 'asdf',type: 'str'},
                {value: '${',type: 'punc'},
                {value: 'time',type: 'var'},
                {value: '}',type: 'punc'},
                {value: 'asdf',type: 'str'},
                {value: '}}',type: 'code'}
            ];

            worker.exec(arr
                ,item => {
                    var data = input.next();

                    expect(data.value).to.be.equal(item.value);
                    expect(data.type).to.be.equal(item.type);

                    expect(data.value).to.be.a('string');
                    expect(data.type).to.be.a('string');
                }
            );
        });

        /*it('str with var: before',function(){
            var input = require('../lib/lexer')('{{`${time}asdf`}}');

            var arr = [
                {value: '{{',type: 'code'},
                {value: '${',type: 'punc'},
                {value: 'time',type: 'var'},
                {value: '}',type: 'punc'},
                {value: 'asdf',type: 'str'},
                {value: '}}',type: 'code'}
            ];

            worker.exec(arr
                ,item => {
                    var data = input.next();

                    expect(data.value).to.be.equal(item.value);
                    expect(data.type).to.be.equal(item.type);

                    expect(data.value).to.be.a('string');
                    expect(data.type).to.be.a('string');
                }
            );
        });

        it('str with var: after',function(){
            var input = require('../lib/lexer')('{{`asdf${time}`}}');

            var arr = [
                {value: '{{',type: 'code'},
                {value: 'asdf',type: 'str'},
                {value: '${',type: 'punc'},
                {value: 'time',type: 'var'},
                {value: '}',type: 'punc'},
                {value: '}}',type: 'code'}
            ];

            worker.exec(arr
                ,item => {
                    var data = input.next();

                    expect(data.value).to.be.equal(item.value);
                    expect(data.type).to.be.equal(item.type);

                    expect(data.value).to.be.a('string');
                    expect(data.type).to.be.a('string');
                }
            );
        });
        */
    });
});
