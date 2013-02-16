# webgl-texture3d

Workaround for the lack of `sampler3D` (3D textures) in WebGL -
sourced from [this example](https://code.google.com/p/webglsamples/source/browse/color-adjust/color-adjust.html),
and modified for use with [browserify](http://browserify.org/).

## Installation ##

``` bash
npm install webgl-texture3d
```

## Usage ##

**texture3d(name, resolution)**

Returns a GLSL method string, with the size cached at `resolution` pixels wide/high/deep.

**texture3d.dynamic**

Plain `sampleAs3DTexture` method string.

``` javascript
var texture3d = require('webgl-texture3d')
  , sampleAs3DTexture = texture3d('sampleAs3DTexture', 33)

var vertexShader = [
  'uniform sampler2D colorTable;'
, 'uniform sampler2D source;'
, 'uniform vec2 pixel;'

, sampleAs3DTexture

, 'void main() {'
  , 'vec4 texel = texture2D(source, pixel);'
  , 'gl_FragColor = sampleAs3DTexture(colorTable, texel.rgb);'
, '}'
].join('\n')
```

## License ##

Copyright 2011, Google Inc.
All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:
    * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
    * Neither the name of Google Inc. nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
