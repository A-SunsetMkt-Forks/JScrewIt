/* eslint-env browser */
/*
global
alert,
art,
compMenu,
controls,
createEngineSelectionBox,
createRoll,
inputArea,
JScrewIt,
outputArea,
showModalBox,
stats
*/

(function ()
{
    'use strict';
    
    function createWorker()
    {
        if (typeof Worker !== 'undefined')
        {
            try
            {
                worker = new Worker('html/worker.js');
            }
            catch (error)
            { }
        }
    }
    
    function encode()
    {
        var output;
        var options = getOptions();
        try
        {
            output = JScrewIt.encode(inputArea.value, options);
        }
        catch (error)
        {
            resetOutput();
            updateError(error + '');
            return;
        }
        updateOutput(output);
    }
    
    function encodeAsync()
    {
        var options = getOptions();
        var data = { input: inputArea.value, options: options };
        if (waitingForWorker)
            queuedData = data;
        else
        {
            worker.postMessage(data);
            resetOutput();
            setWaitingForWorker(true);
        }
        inputArea.onkeyup = null;
    }
    
    function formatItem(value)
    {
        var text;
        if (typeof value === 'string')
            text = '"' + value + '"';
        else if (value === 0 && 1 / value < 0)
            text = '-0';
        else if (Array.isArray(value))
        {
            try
            {
                text = value.length ? '[…]' : '[]';
            }
            catch (error)
            { }
        }
        else
        {
            try
            {
                text = String(value);
            }
            catch (error)
            { }
        }
        return text;
    }
    
    function formatValue(value)
    {
        var text;
        if (Array.isArray(value))
        {
            try
            {
                text = '[' + value.map(formatItem).join(', ') + ']';
            }
            catch (error)
            { }
        }
        else
            text = formatItem(value);
        return text;
    }
    
    function formatValueType(value)
    {
        var valueType;
        switch (typeof value)
        {
        case 'function':
            valueType = 'a function';
            break;
        case 'object':
            var matches = /(\w+).$/.exec(Object.prototype.toString.call(value));
            var typeStr = matches ? matches[1] : void 0;
            switch (typeStr)
            {
            case 'Array':
                switch (value.length)
                {
                case 0:
                    valueType = 'an empty array';
                    break;
                case 1:
                    valueType = 'a one element array';
                    break;
                default:
                    valueType = 'an array';
                    break;
                }
                break;
            case 'Date':
                valueType = 'a date';
                break;
            case 'RegExp':
                valueType = 'a regular expression';
                break;
            default:
                valueType = 'an object';
                break;
            }
            break;
        }
        return valueType;
    }
    
    function getOptions()
    {
        var options = { features: currentFeatureObj.canonicalNames };
        return options;
    }
    
    function handleCompInput()
    {
        var selectedIndex = compMenu.selectedIndex;
        if (selectedIndex !== compMenu.previousIndex)
        {
            compMenu.previousIndex = selectedIndex;
            var compatibility = compMenu.options[selectedIndex].value;
            var featureObj =
                compatibility ? Feature[compatibility] : engineSelectionBox.featureObj;
            if (outOfSync || !Feature.areEqual(featureObj, currentFeatureObj))
            {
                currentFeatureObj = featureObj;
                this();
            }
            roll.rollTo(+!compatibility);
        }
    }
    
    function handleInputAreaKeyUp(evt)
    {
        if (evt.keyCode !== 9) // Tab
            encodeAsync();
    }
    
    function handleReaderLoadEnd()
    {
        var result = this.result;
        if (result != null)
            inputArea.value = result;
        inputArea.oninput();
        inputArea.disabled = false;
    }
    
    function handleRun()
    {
        var content;
        var value;
        try
        {
            value = (0, eval)(outputArea.value);
        }
        catch (error)
        {
            content = art('P', String(error));
        }
        if (value !== void 0)
        {
            var text = formatValue(value);
            var valueType = formatValueType(value);
            if (text)
            {
                var intro =
                    valueType ? 'Evaluation result is ' + valueType + ':' : 'Evaluation result is';
                content =
                    art(
                        'DIV',
                        art('P', intro),
                        art(
                            'P',
                            { style: { overflowX: 'auto' } },
                            art(
                                'DIV',
                                {
                                    style:
                                    {
                                        display:    'inline-block',
                                        textAlign:  'left',
                                        whiteSpace: 'pre'
                                    }
                                },
                                text
                            )
                        )
                    );
            }
            else
                content = art('DIV', art('P', 'Evaluation result is ' + valueType + '.'));
        }
        if (content != null)
        {
            var runThisButton = this;
            showModalBox(
                content,
                function ()
                {
                    runThisButton.focus();
                }
            );
        }
    }
    
    function handleWorkerMessage(evt)
    {
        if (queuedData)
        {
            worker.postMessage(queuedData);
            queuedData = null;
        }
        else
        {
            var data = evt.data;
            var error = data.error;
            if (error)
                updateError(data.error);
            else
                updateOutput(data.output);
            setWaitingForWorker(false);
        }
    }
    
    function init()
    {
        document.querySelector('body>*>div').style.display = 'block';
        inputArea.value = inputArea.defaultValue;
        outputArea.oninput = updateStats;
        // The CSS function calc is not recognized by Android Browser versions prior to 4.4, and
        // will thus prevent those browsers from interpreting the height style on the "Run this"
        // button.
        // This is meant as a hack for Android Browser 4.0, where setting the height would result in
        // cutting off the lower half of the button, although it will target later versions, too,
        // with little impact.
        art(
            stats.parentNode,
            art(
                'BUTTON',
                'Run this',
                {
                    style:
                    {
                        bottom:     '0',
                        fontSize:   '10pt',
                        height:     'calc(1.5em)',
                        lineHeight: '100%',
                        margin:     '0',
                        padding:    '0 .5em',
                        position:   'absolute',
                        right:      '0'
                    }
                },
                art.on('click', handleRun)
            )
        );
        (function ()
        {
            var selectedIndex;
            var COMPACT = Feature.COMPACT;
            if (Feature.AUTO.includes(COMPACT))
            {
                currentFeatureObj = COMPACT;
                selectedIndex = 1;
            }
            else
            {
                currentFeatureObj = Feature.DEFAULT;
                selectedIndex = 0;
            }
            compMenu.selectedIndex = compMenu.previousIndex = selectedIndex;
        }
        )();
        var changeHandler;
        if (worker)
        {
            changeHandler = encodeAsync;
            worker.onmessage = handleWorkerMessage;
            encodeAsync();
        }
        else
        {
            var encodeButton = art('BUTTON', 'Encode', art.on('click', encode));
            art(controls, encodeButton);
            changeHandler = noEncode;
            outputArea.value = '';
        }
        if (typeof File !== 'undefined')
        {
            var loadFileInput =
                art(
                    'INPUT',
                    { accept: '.js', style: { display: 'none' }, type: 'file' },
                    art.on('change', loadFile)
                );
            var openLoadFileDialog = HTMLElement.prototype.click.bind(loadFileInput);
            var loadFileButton = art('BUTTON', 'Load file…', art.on('click', openLoadFileDialog));
            art(controls, loadFileButton, loadFileInput);
        }
        inputArea.oninput = changeHandler;
        var compHandler = handleCompInput.bind(changeHandler);
        compMenu.onchange = compHandler;
        // Firefox does not always trigger a change event when an option is selected using the
        // keyboard; we must handle keydown events asynchronously, too.
        compMenu.onkeydown = setTimeout.bind(null, compHandler);
        engineSelectionBox =
            art(
                createEngineSelectionBox(),
                { className: 'engineSelectionBox' },
                art.on('input', compHandler)
            );
        roll = createRoll();
        art(
            roll.container,
            art(
                'DIV',
                { className: 'frame' },
                art('SPAN', 'Custom Compatibility Selection'),
                engineSelectionBox
            )
        );
        art(controls.parentNode, roll);
        if (inputArea.createTextRange)
        {
            var range = inputArea.createTextRange();
            range.move('textedit', 1);
            range.select();
        }
        else
            inputArea.setSelectionRange(0x7fffffff, 0x7fffffff);
        inputArea.focus();
    }
    
    function loadFile()
    {
        inputArea.disabled = true;
        inputArea.value = '';
        var file = this.files[0];
        var reader = new FileReader();
        reader.addEventListener('loadend', handleReaderLoadEnd);
        reader.readAsText(file);
    }
    
    function noEncode()
    {
        if (outputSet)
            updateStats(true);
    }
    
    function resetOutput()
    {
        outputSet = false;
        outputArea.value = '';
        stats.textContent = '…';
    }
    
    function setWaitingForWorker(value)
    {
        waitingForWorker = value;
        outputArea.disabled = value;
    }
    
    function updateError(error)
    {
        showModalBox(art('P', String(error)));
    }
    
    function updateOutput(output)
    {
        outputArea.value = output;
        updateStats();
    }
    
    function updateStats(newOutOfSync)
    {
        var length = outputArea.value.length;
        var html = length === 1 ? '1 char' : length + ' chars';
        outOfSync = !!newOutOfSync;
        if (newOutOfSync)
        {
            if (worker)
                inputArea.onkeyup = handleInputAreaKeyUp;
            html += ' – <i>out of sync</i>';
        }
        outputSet = true;
        stats.innerHTML = html;
    }
    
    var Feature = JScrewIt.Feature;
    
    var currentFeatureObj;
    var engineSelectionBox;
    var outOfSync;
    var outputSet;
    var queuedData;
    var roll;
    var waitingForWorker;
    var worker;
    
    document.addEventListener('DOMContentLoaded', init);
    createWorker();
}
)();
