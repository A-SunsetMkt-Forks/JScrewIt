(function (self)
{
    function createOutput()
    {
        function appendLengths(char)
        {
            compatibilities.forEach(
                function (compatibility)
                {
                    var content;
                    try
                    {
                        content = JScrewIt.encode(char, false, compatibility).length;
                    }
                    catch (e)
                    {
                        content = 'ERROR';
                    }
                    result += padLeft(content, 8);
                }
            );
        }
        
        var result = '   ';
        compatibilities.forEach(
            function (compatibility)
            {
                result += padBoth(compatibility, 8);
            }
        );
        result += '\n   ' + Array(compatibilities.length + 1).join(' -------');
        result += '\nNL ';
        appendLengths('\n');
        var MIN = 32, MAX = 127;
        for (var code = MIN; code < MAX; ++code)
        {
            var char = String.fromCharCode(code);
            result += '\n`' + char + '`';
            appendLengths(char);
        }
        return result;
    }
    
    function init(env)
    {
        JScrewIt = (env || self).JScrewIt;
        compatibilities = ['DEFAULT'];
        if (!isIE())
        {
            compatibilities.push('NO_IE');
        }
    }
    
    function isIE()
    {
        var navigator = self.navigator;
        var result = navigator && /\b(MSIE|Trident)\b/.test(navigator.userAgent);
        return result;
    }
    
    function padBoth(str, length)
    {
        str += '';
        result = padLeft(padRight(str, length + str.length >> 1), length);
        return result;
    }
    
    function padLeft(str, length)
    {
        str += '';
        result = Array(length - str.length + 1).join(' ') + str;
        return result;
    }
    
    function padRight(str, length)
    {
        str += '';
        result = str + Array(length - str.length + 1).join(' ');
        return result;
    }
    
    function prettyFormat(char)
    {
        var output;
        if (/[\0-\7]/.test(char))
        {
            output = '\\' + char.charCodeAt(0);
        }
        else if (char == '\b')
        {
            output = '\\b';
        }
        else if (char == '\f')
        {
            output = '\\f';
        }
        else if (char == '\n')
        {
            output = '\\n';
        }
        else if (char == '\r')
        {
            output = '\\r';
        }
        else if (char == '\t')
        {
            output = '\\t';
        }
        else if (char == '\v')
        {
            output = '\\v';
        }
        else if (char == '"')
        {
            output = '\\"';
        }
        else if (char == '\\')
        {
            output = '\\\\';
        }
        else if (/[\0-\x1f\x7f-\x9f]/.test(char))
        {
            output = char.charCodeAt(0).toString(16);
            if (output.length < 2) output = '0' + output;
            output = '\\x' + output;
        }
        else
        {
            output = char;
        }
        return output;
    }
    
    function run()
    {
        describe(
            'JScrewIt',
            function()
            {
                compatibilities.forEach(
                    function (compatibility)
                    {
                        it(
                            'should encode with ' + compatibility + ' compatibility',
                            function()
                            {
                                testChars(
                                    function (code)
                                    {
                                        var char = String.fromCharCode(code);
                                        var result = JScrewIt.encode(char, false, compatibility);
                                        expect(eval(result)).toEqual(char);
                                        expect(result).toMatch(/^[!+()[\]]*$/);
                                        expect(result.length).not.toBeGreaterThan(
                                            JScrewIt.encode(char).length
                                        );
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }
    
    function testChars(test)
    {
        var code;
        for (code = 0; code < 128; ++code)
        {
            test(code);
        }
        for (; code < 0x00010000; code <<= 1)
        {
            test(code + 33);
        }
    }
    
    var compatibilities;
    var JScrewIt;
    
    self.TestSuite =
    {
        createOutput: createOutput,
        init: init,
        run: run
    };
    
})(typeof(exports) === 'undefined' ? window : exports);
