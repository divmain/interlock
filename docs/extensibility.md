# Extensibility

Bacon ipsum dolor amet jerky jowl meatloaf ribeye beef. Doner chicken bacon tongue picanha
landjaeger pork chop brisket leberkas fatback ball tip meatball corned beef. Drumstick turkey
salami fatback ham hock venison tenderloin pork chop short ribs t-bone beef ribs hamburger
shankle.

Chuck pastrami bresaola salami, pork flank porchetta ground round filet mignon tongue corned
beef. Pork belly spare ribs kielbasa chicken ribeye turducken, jerky pig doner flank.

Hamburger tail landjaeger ball tip, porchetta fatback drumstick kielbasa shankle frankfurter.

Something about Pluggable.CONTINUE...

## buildOutput

Reduces an array of compiled bundles into a compilation object.  This compilation
object will have three key/value pairs:

- **cache:**    populated from the compilation process
- **bundles:**  a mapping of destination paths to `raw` code
- **opts:**     the original options passed to the compilation


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **bundles** | Array | Compiled bundles, generated by generateBundles. |
| Return value |  | Promise | Compilation object. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/index.js#L88-L100).

## compile

Loads, transforms, and bundles an application using the provided options.
Modules are collected and transformed, bundles are formed from those modules,
and those bundles are finally converted into a format that can be written
to disk or served over HTTP.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Return value |  | Promise | Resolves to an object with three properties: `bundles`, `opts`, and `cache`. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/index.js#L111-L119).

## compileModule

Given an unprocess module that has been loaded from disk, return a promise
that resolves to the same module in a processed/compiled state, and whose
dependencies have also been processed/compiled.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **module** | Object | Seed module. |
| Return value |  | Promise | Resolves to compiled module. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/compile.js#L85-L107).

## compileModuleR

Because the `compileModule` and `generateDependencies` functions interact
recursively, defining a stand-in pluggable for `compileModule` allows for
plugins to utilize `compileModule` from within an overridden `generateDependencies`.

For true behavior, please see documentation for `compileModule`.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Return value |  | Promise | Resolves to compiled module. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/compile.js#L26-L28).

## compileModules

Given one or more module seeds, traverse their dependency graph, collecting any and
all dependency modules, and then parse, transform, and hash those modules.  Return
a promise that resolves to the full set of modules, once they have been correctly
gathered and compiled.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **moduleSeeds** | Array | Module seeds, i.e. modules that have not yet been populated with properties such as ast, `dependencies`, etc. Module objects _should_ have path, rawSource, and namespace values. |
| Return value |  | Promise | Resolves to array of all compiled modules. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/compile.js#L122-L130).

## constructBundle

Given a compiled bundle and moduleHash-to-URL lookup object, output
the same bundle with generated AST.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **bundle** | Object | Fully compiled bundle, ready to be outputed. |
| Parameter | **urls** | Object | moduleHash-to-URL lookup dictionary. |
| Return value |  | Object | Bundle with new `ast` property. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/index.js#L40-L48).

## constructBundleAst

Construct the AST for an output bundle.  A number of optional options-args are
allowed, to give flexibility to the compiler for what sort of bundle should be
constructed.

For example, in the case of a bundle with an entry module, you'll want everything
to be included.  The run-time is needed, because there is no guarantee another
bundle has already loaded the run-time.  The module-hash-to-bundle-URLs object
should be included, as again there is no guarantee another bundle has already
set those values.  The modules of the bundle itself need to be included, etc.

However, you might instead generate a specialized bundle that only contains the
run-time and URLs.  This bundle might be inlined into the page, or guaranteed
to be loaded first, so that redundant copies of the run-time be included in
every other bundle generated.

The output for this function should be a root AST node, ready to be transformed
back into JavaScript code.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **opts** | Object | Options. |
| Parameter | **opts.includeRuntime** | Boolean | Indicates whether Interlock run-time should be emitted. |
| Parameter | **opts.urls** | Object | Optional. If included, map of module hashes to URLs will be emitted. |
| Parameter | **opts.modules** | Array | Optional. If included, the module objects will be transformed into output module AST and emitted. |
| Parameter | **opts.entryModuleId** | String | Optional. If included, a statement will be rendered to invoke the specified module on load. |
| Return value |  | ASTnode | Single program AST node. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/construct/index.js#L165-L170).

## constructBundleBody

Builds body of output bundle, to be inserted into the IIFE.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **opts** | Object | Same options object passed to constructBundleBody. |
| Return value |  | Array | Body of bundle. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/construct/index.js#L121-L133).

## constructCommonModule

Given an array of AST nodes from a module's body along with that module's
dependencies, construct an AST object expression that represents its run-time
equivalent.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **moduleBody** | Array | Array of AST nodes. |
| Parameter | **deps** | Array | Array of modules upon which module is dependent. |
| Return value |  | ASTnode | Object expression AST node. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/construct/index.js#L39-L46).

## constructModuleSet

Given an array of compiled modules, construct the AST for JavaScript that would
register those modules for consumption by the Interlock run-time.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **modules** | Array | Array of compiled modules. |
| Parameter | **globalName** | String | Global variable name of the Interlock run-time. |
| Parameter | **entryModuleId** | String | Module-hash of the entry module. |
| Return value |  | Array | Array of AST nodes to be emitted as JavaScript. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/construct/index.js#L66-L82).

## constructRegisterUrls

Transforms a map of module-hashes-to-URLs to the AST equivalent.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **urls** | Object | Keys are module hashes, values are URL strings. |
| Parameter | **globalName** | String | Global variable name of Interlock run-time. |
| Return value |  | ASTnode | Single AST node. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/construct/index.js#L105-L112).

## constructRuntime

Construct the guts of the Interlock run-time for inclusion in file output.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **globalName** | String | Global variable name of Interlock run-time. |
| Return value |  | Array | Array of AST nodes. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/construct/index.js#L91-L95).

## dedupeExplicit

First, update the bundle's `module` property to refer to the compiled
version of the module.  Then generate a moduleHashes property for each
of the bundles, containing all hashes for all modules in the bundle's
dependency branch.

Then, identify bundles that include the entry module from another bundle.
When found, remove all of the second module's bundles from the first.

This will ensure that for any explicitly-defined bundle, other bundles
will not include its module or module-dependencies.  This avoids copies
of a module from appearing in multiple bundles.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **bundleSeeds** | Array | Early-stage bundle objects without module or moduleHashes properties. |
| Parameter | **modulesByAbsPath** | Object | Map of absolute paths to compiled modules. |
| Return value |  | Array | Bundle objects with explicit intersections removed and new module and moduleHashes properties. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/bundles/dedupe-explicit.js#L53).
The function that it wraps can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/bundles/dedupe-explicit.js#L27-L51).

## dedupeImplicit

Given an array of explicitly defined bundles, generate a new array of bundles
including new implicit bundles.  These implicit bundles will be generated from
the intersections of two (or more) bundles' module hashes.

This ensures that no module is included in more than one bundle.  It further
ensures that any module that is depended upon by more than one bundle will be
split off into its own new bundle.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **explicitBundles** | Array | Bundles with module and moduleHashes properties. |
| Return value |  | Array | Explicit bundles plus new implicit bundles. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/bundles/dedupe-implicit.js#L50-L52).

## emitRawBundles

Given an array of compiled bundles and a moduleHash-to-URL lookup dictionary,
generate a new array of bundles with new `ast` and `raw` properties.

Some compiled bundles (as internally represented) will result in more than
one output file.  The canonical example of this is a JS file and its source-map.
Plugins may also implement mechanisms to output multiple files per bundle.

This one-to-many relationship is defined by the generateRawBundles method, which
may output an array of raw bundles.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **bundlesArr** | Array | Compiled bundles. |
| Parameter | **urls** | Object | moduleHash-to-URL lookup dictionary. |
| Return value |  | Array | Bundles with new `raw` properties. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/index.js#L66-L74).

## generateBundles

Given a set of module seeds - originally generated from the bundle definitions
passed into the Interlock constructor - and the set of fully generated modules,
generate the full set of bundles that should be emitted, populate them with
module objects, hash them, and interpolate any output filenames.

Bundles outputted from this function should be ready to be transformed into
strings using AST->source transformation, and then written to disk.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **moduleSeeds** | Object | Early-stage module objects, indexed by their path relative to the compilation context. |
| Parameter | **moduleMaps** | Object | Maps of fully compiled modules, indexed by both absolute path and hash. |
| Return value |  | Array | Fully compiled bundles. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/bundles/generate.js#L64-L71).

## generateDependencies

Given a module whose dependency references (like require strings) have been
determined, recursively compile all dependencies and return the module with
new dependency properties.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **module** | Object | Module for whom dependencies should be compiled. |
| Return value |  | Object | Module with new dependency properties. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/compile.js#L39-L74).

## generateJsCode

Given an AST and a set of options, generate the corresponding JavaScript
source and optional sourcemap string.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **opts** | Object | The generation options. |
| Parameter | **opts.ast** | AST | The AST to render. |
| Parameter | **opts.sourceMaps** | Boolean | Whether to render a source-map. |
| Parameter | **opts.sourceMapTarget** | String | The output filename. |
| Parameter | **opts.pretty** | Boolean | Whether to output formatted JS. |
| Parameter | **opts.includeComments** | Boolean | Whether to include comments in the output. |
| Parameter | **opts.sources** | Object | A hash of source filenames to source content. |
| Return value |  | Object | An object with `code` and `map` strings, where `map` can be null. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/bundles/generate-raw.js#L22-L44).

## generateModuleId

Given a mostly-compiled module, generate an ID for that module
and resolve the same module with an `id` property.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **module** | Object | Module that needs an ID. |
| Return value |  | Object | Module that now has an `id` property. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/generate-id.js#L13-L21).

## generateModuleMaps

Given a set of fully compiled modules, generate and return two
hashmaps of those modules, indexed by their hash and their
absolute path.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **modules** | Array | Fully compiles modules. |
| Return value |  | Object | Fully compiled modules, indexed by hash and absolute path. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/generate-maps.js#L16-L25).

## generateRawBundles

Given a compiled bundle object, return an array of one or more bundles with
new `raw` property.  This raw property should be generated from the bundle's
AST or equivalent intermediate representation.

This is a one-to-many transformation because it is quite possible for multiple
output files to result from a single bundle object.  The canonical example (and
default behavior of this function, when sourcemaps are enabled) is for one
bundle to result in a `.js` file and a `.map` file.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **bundle** | Object | Bundle object without `raw` property. |
| Return value |  | Array | Array of bundle objects. At minimum, these bundle objects should have a `raw` property - a string representation of the file to be written to disk - and a `dest` property - the relative filepath of the file to be written to disk. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/bundles/generate-raw.js#L64-L92).

## getBundleSeeds

Given the set of early-stage modules (originally generated from the bundle definitions)
and the set of fully compiled modules (indexed by their absolute path), return an array
of early-stage bundles.  These bundles do not yet know about which modules they contain,
but do hold a reference to the root module of their branch of the dependency graph.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **moduleSeeds** | Object | Early-stage modules, indexed by path relative to the compilation context. |
| Parameter | **modulesByPath** | Object | Fully compiled modules, indexed by absolute path. |
| Return value |  | Array | Early-stage bundles with `module` property. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/bundles/get-seeds.js#L20-L31).

## getModuleSeeds

Inspect the compilation options for bundle definitions (provided as
key/value pairs to options.entry and options.split), resolve references,
and return an object of the early-stage modules indexed by their path
relative to the compilation context.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Return value |  | Object | Early-stage modules indexed by relative path. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/get-seeds.js#L16-L23).

## getUrls

Given an array of bundles, generate a lookup dictionary of module hashes
to the destination path of the bundles that contains them.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **bundles** | Array | Compiled bundles. |
| Return value |  | Object | moduleHash-to-URL lookup dictionary. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/index.js#L24-L29).

## hashBundle

Given an otherwise prepared bundle, generate a hash for that bundle and resolve
to that same bundle with a new `hash` property.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **bundle** | Object | Unhashed bundle. |
| Return value |  | Object | Bundle plus new `hash` property, a 40-character SHA1 that uniquely identifies the bundle. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/bundles/hash.js#L47).
The function that it wraps can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/bundles/hash.js#L29-L45).

## hashModule

Given a mostly-compiled module, generate a hash for that module and resolve
to that module with a new `hash` property.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **module** | Object | Module that needs to be hashed hash. |
| Return value |  | Object | Module that now has a hash property. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/hash.js#L36-L48).

## initBundle


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/bundles/init.js#L4-L30).

## interpolateFilename

Given a bundle, determine its ultimate output filepath by replacing
supported placeholders with their dynamic equivalents.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **bundle** | Object | Late-stage bundle object. |
| Return value |  | Object | Bundle with interpolated `dest` property. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/bundles/interpolate-filename.js#L13-L23).

## loadModule

Given a module seed, read the module from disk and determine its type.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **module** | Object | Module seed. |
| Return value |  | Object | Module seed plus `rawSource` and `type` properties. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/load.js#L55-L60).

## parseModule

Parse the source of the provided early-stage module.  Resolves to the same
module object, with additional `ast` and `sourcePath` properties (or equivalent
for non-JavaScript modules).


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **module** | Object | Unparsed module with rawSource property. |
| Return value |  | Object | Parsed module with new `ast` and `sourcePath` properties. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/parse.js#L19-L52).

## partitionBundles

Given a set of module seeds and the set of fully generated modules, generate
a finalized array of bundles.  These bundles will be early-stage and should
not be populated with the actual modules.  Instead, each bundle will be defined
by the module hashes (unique IDs) of the modules that comprise the bundle.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **moduleSeeds** | Object | Early-stage module objects, indexed by their path relative to the compilation context. |
| Parameter | **moduleMaps** | Object | Maps of fully compiled modules, indexed by both absolute path and hash. |
| Return value |  | Array | Early-stage bundles. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/bundles/generate.js#L42-L46).

## populateBundleModules

Define the canonical modules array for a bundle.  This should occur after
bundle module hashes are deduped.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **bundle** | Object | The bundle object, with no modules property. |
| Parameter | **moduleMaps** | Object | Has two properties - byAbsPath and byHash - where each of these map to the compiled module via the respective value. |
| Return value |  | Object | The bundle object, with modules property. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/bundles/generate.js#L23-L27).

## preresolve

Transform the require string before it is resolved to a file on disk.
No transformations occur by default - the output is the same as the input.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **requireStr** | String | Require string or comparable value. |
| Return value |  | String | Transformed require string. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/resolve.js#L13-L15).

## readSource

This function is invoked whenever the compiler attempts to read a source-file
from the disk.  It takes an raw-module object as its only input.  The properties
available on that object are as follows:

- `path` - the absolute path of the file
- `ns` - the namespace of the module (either the default ns, or borrowed from its
containing package)
- `nsRoot` - the absolute path to the root of the namespace
- `nsPath` - the file's path relative to the root of the namespace

The function should output an object with the same properties, plus one additional
property: `rawSource`.  This property should be the string-value of the module
source.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **module** | Object | Module object. |
| Return value |  | Object | Module object + `rawSource`. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/load.js#L30-L33).

## resolveModule

Given a require string and some context, resolve that require string
to a file on disk, returning a module seed.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **requireStr** | String | Require string or comparable value. |
| Parameter | **contextPath** | String | Absolute path from which to resolve any relative paths. |
| Parameter | **ns** | String | Namespace to set on module seed if the resolved module is of the same namespace as its context. |
| Parameter | **nsRoot** | String | Absolute path of default namespace. |
| Parameter | **extensions** | Array | Array of file extension strings, including the leading dot. |
| Return value |  | Object | Module seed. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/resolve.js#L53).
The function that it wraps can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/resolve.js#L32-L51).

## setModuleType

Given the early-stage module (module seed + rawSource property), determine and set
its type.  This value defaults to "javascript" and is used to determine whether
default behaviors for parsing and processing modules should be used on the module.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **module** | Object | Early-stage module. |
| Return value |  | Object | Module with new `type` property. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/load.js#L44-L46).

## transformModule

Transforms the module's AST, returning a module object with transformed
`ast` property as well as a new `synchronousRequires` property.  If the
module is not of type "javascript", transformations to type-specific
intermediate representation should occur at this step.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **module** | Object | Module object, with `ast` property. |
| Return value |  | Object | Module object with transformed `ast` property and new `synchronousRequires` property. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/transform.js#L19-L58).

## updateBundleHash

Calculate the bundle's hash by invoking `update` with data from the bundle.
`update` should be called with string data only.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **update** | Function | Updates the ongoing computation of bundle hash. |
| Parameter | **bundle** | Object | The bundle object. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/bundles/hash.js#L14-L18).

## updateModuleHash

Use data from the provided module to generate a hash, utilizing the provided
update function.  Only string values should be passed to the update function.
The resulting hash should be deterministic for the same inputs in the same order.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **module** | Object | Module that needs a hash property. |
| Parameter | **update** | Function | Function to be invoked with data that uniquely identifies the module (or, more precisely, the run-time behavior of the module). |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/hash.js#L18-L26).

## updateReferences

Given a module whose dependencies have been identified and compiled,
replace all original references with run-time references. In the case
of JavaScript, this will mean updating references like `path/to/dep`
or `./sibling-dep` with each dependency's module ID.


|     | Name | Type | Description |
| --- | ---- | ---- | ----------- |
| Parameter | **module** | Object | Module with AST containing original require expressions. |
| Return value |  | Object | Module with AST containing require expressions whose arguments have been replaced with corresponding dependency module hashes. |


This Pluggable's definition can be found [here](http://github.com/interlockjs/interlock/tree/master/src/compile/modules/update-references.js#L19-L33).

