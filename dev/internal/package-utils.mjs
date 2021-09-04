import { lint }                                 from '@fasttime/lint';
import fastGlob                                 from 'fast-glob';
import { rm }                                   from 'fs/promises';
import { createRequire }                        from 'module';
import { isAbsolute, join, relative, resolve }  from 'path';
import { rollup }                               from 'rollup';
import rollupPluginCleanup                      from 'rollup-plugin-cleanup';
import ts                                       from 'typescript';
import { fileURLToPath }                        from 'url';

async function bundle(pkgPath)
{
    const pkgConfigPath = join(pkgPath, 'package.json');
    const require = createRequire(pkgConfigPath);
    const { homepage, name } = require(pkgConfigPath);
    const inputPath = join(pkgPath, '.tmp-out/index.js');
    const inputOptions =
    {
        external: ['tslib'],
        input: inputPath,
        plugins: [rollupPluginCleanup({ comments: /^(?!\/\s*(?:@ts-|eslint-))/ })],
    };
    const outputPath = join(pkgPath, 'lib/index.js');
    const outputOptions =
    {
        banner: `// ${name} – ${homepage}\n`,
        file: outputPath,
        footer: `\n// End of module ${name}`,
        format: 'esm',
    };
    await bundleJS(inputOptions, outputOptions);
}

export async function bundleJS(inputOptions, outputOptions)
{
    const bundle = await rollup(inputOptions);
    const { output: [{ code }] } = await bundle.write(outputOptions);
    return code;
}

export async function cleanPackage(pkgURL, ...paths)
{
    const pkgPath = fileURLToPath(pkgURL);
    const options = { force: true, recursive: true };
    const cleanPath =
    async path =>
    {
        const resolvedPath = resolve(pkgPath, path);
        await rm(resolvedPath, options);
    };
    const promises = paths.map(cleanPath);
    await Promise.all(promises);
}

async function compile(pkgPath, dTsFilter)
{
    const declarationDir = join(pkgPath, 'lib');
    const newOptions =
    {
        declaration:    true,
        declarationDir,
        importHelpers:  true,
        outDir:         join(pkgPath, '.tmp-out'),
        rootDir:        join(pkgPath, 'src'),
        types:          ['node'],
    };
    const writeFile = getWriteFile(ts.sys.writeFile, declarationDir, dTsFilter);
    await compileTS(pkgPath, 'src/**/*.ts', newOptions, writeFile);
}

export async function compileTS(pkgPath, source, newOptions, writeFile)
{
    const { sys } = ts;
    const program =
    await
    (async () =>
    {
        const fileNames = await fastGlob(source, { absolute: true, cwd: pkgPath });
        const tsConfigPath = join(pkgPath, 'tsconfig.json');
        const tsConfig = ts.readConfigFile(tsConfigPath, sys.readFile);
        const { options } = ts.parseJsonConfigFileContent(tsConfig.config, sys, pkgPath);
        Object.assign(options, { module: ts.ModuleKind.ES2020 }, newOptions);
        const program = ts.createProgram(fileNames, options);
        return program;
    }
    )();
    const emitResult = program.emit(undefined, writeFile);
    const diagnostics =
    [
        ...ts.getPreEmitDiagnostics(program).filter(({ code }) => code !== 2343),
        ...emitResult.diagnostics,
    ];
    if (diagnostics.length)
    {
        const reporter = ts.createDiagnosticReporter(sys, true);
        diagnostics.forEach(reporter);
    }
    if (emitResult.emitSkipped)
        throw Error('TypeScript compilation failed');
}

function getWriteFile(sysWriteFile, declarationDir, dTsFilter)
{
    const writeFile =
    dTsFilter === undefined ?
    sysWriteFile :
    (path, data, writeByteOrderMark) =>
    {
        const relativePath = relative(declarationDir, path);
        if
        (
            relativePath.startsWith('..') ||
            isAbsolute(relativePath) ||
            dTsFilter.includes(relativePath)
        )
            sysWriteFile(path, data, writeByteOrderMark);
    };
    return writeFile;
}

export { lint as lintPackage };

export async function makePackage(pkgURL, dTsFilter)
{
    const pkgPath = fileURLToPath(pkgURL);
    await compile(pkgPath, dTsFilter);
    await bundle(pkgPath);
}
